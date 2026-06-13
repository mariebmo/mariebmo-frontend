<script lang="ts">
	import { feastTheme } from '$lib/feast-of-the-rings/theme';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { getDishTimestamp } from '$lib/feast-of-the-rings/dishes';
	import { getFilmRuntime } from '$lib/feast-of-the-rings/films';
	import {
		getPositionPercent,
		getSecondsFromTrackClientX
	} from '$lib/feast-of-the-rings/timeline-utils';
	import { formatTimestamp } from '$lib/feast-of-the-rings/time';
	import TimelineDishRow from './TimelineDishRow.svelte';
	import type { Dish, Edition, FilmId } from '$lib/feast-of-the-rings/types';

	interface Props {
		dishes: Dish[];
		edition: Edition;
		filmId: FilmId;
		selectedDishIds: string[];
		showCheckboxes?: boolean;
		highlightSelected?: boolean;
		currentElapsedSeconds?: number | null;
		onToggleDish?: (dishId: string) => void;
		onScrubStart?: () => void;
		onScrub?: (seconds: number) => void;
		onScrubEnd?: () => void;
		onDishClick?: (dishId: string) => void;
	}

	let {
		dishes,
		edition,
		filmId,
		selectedDishIds,
		showCheckboxes = true,
		highlightSelected = false,
		currentElapsedSeconds = null,
		onToggleDish,
		onScrubStart,
		onScrub,
		onScrubEnd,
		onDishClick
	}: Props = $props();

	let isExpanded = $state(false);
	let trackRef = $state<HTMLDivElement | null>(null);
	let trackBarRef = $state<HTMLDivElement | null>(null);
	let isScrubbing = $state(false);

	const isScrubbable = $derived(onScrub !== undefined);

	const runtimeSeconds = $derived(getFilmRuntime(filmId, edition));

	const playheadPercent = $derived(
		currentElapsedSeconds !== null
			? getPositionPercent(currentElapsedSeconds, runtimeSeconds)
			: null
	);

	const nextDishId = $derived.by(() => {
		if (currentElapsedSeconds === null) return null;
		const next = dishes.find((dish) => {
			const ts = getDishTimestamp(dish, edition);
			return ts !== null && ts > currentElapsedSeconds;
		});
		return next?.id ?? null;
	});

	const tickLabels = $derived.by(() => {
		const interval = runtimeSeconds > 7200 ? 1800 : 900;
		const labels: { seconds: number; percent: number }[] = [];

		for (let seconds = 0; seconds <= runtimeSeconds; seconds += interval) {
			labels.push({
				seconds,
				percent: getPositionPercent(seconds, runtimeSeconds)
			});
		}

		return labels;
	});

	function scrollToDishOnPage(dishId: string) {
		isExpanded = true;
		onDishClick?.(dishId);

		queueMicrotask(() => {
			const browseEl = document.getElementById(`feast-dish-${dishId}`);
			const rowEl = document.getElementById(`feast-dish-row-${dishId}`);
			(browseEl ?? rowEl)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}

	function scrollToDish(dishId: string) {
		if (!trackRef) return;
		const dish = dishes.find((entry) => entry.id === dishId);
		if (!dish) return;
		const ts = getDishTimestamp(dish, edition);
		if (ts === null) return;

		const percent = getPositionPercent(ts, runtimeSeconds);
		const scrollLeft = (percent / 100) * trackRef.scrollWidth - trackRef.clientWidth / 2;
		trackRef.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
	}

	function scrubToClientX(clientX: number) {
		if (!trackBarRef || !onScrub) return;
		const seconds = getSecondsFromTrackClientX(clientX, trackBarRef, runtimeSeconds);
		onScrub(seconds);
	}

	function handleScrubPointerDown(event: PointerEvent) {
		if (!isScrubbable || !trackBarRef) return;
		event.preventDefault();
		isScrubbing = true;
		trackBarRef.setPointerCapture(event.pointerId);
		onScrubStart?.();
		scrubToClientX(event.clientX);
	}

	function handleScrubPointerMove(event: PointerEvent) {
		if (!isScrubbing) return;
		scrubToClientX(event.clientX);
	}

	function handleScrubPointerUp(event: PointerEvent) {
		if (!isScrubbing) return;
		isScrubbing = false;
		if (trackBarRef?.hasPointerCapture(event.pointerId)) {
			trackBarRef.releasePointerCapture(event.pointerId);
		}
		onScrubEnd?.();
	}

	function handleScrubKeyDown(event: KeyboardEvent) {
		if (!isScrubbable || !onScrub || currentElapsedSeconds === null) return;

		const step = event.shiftKey ? 60 : 10;
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			onScrub(Math.max(0, currentElapsedSeconds - step));
		} else if (event.key === 'ArrowRight') {
			event.preventDefault();
			onScrub(Math.min(runtimeSeconds, currentElapsedSeconds + step));
		}
	}

	$effect(() => {
		if (nextDishId && !isScrubbing) {
			scrollToDish(nextDishId);
		}
	});
</script>

{#if dishes.length === 0}
	<div
		class="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-600"
	>
		<p class="text-gray-600 dark:text-gray-400">No dishes on the timeline.</p>
	</div>
{:else}
	<div
		bind:this={trackRef}
		class="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
		role="region"
		aria-label="Feast timeline"
	>
		<div class="relative min-w-[960px] px-6 pt-8 pb-4">
			<!-- Time axis (aligned to track column) -->
			<div class="mb-3 grid grid-cols-[minmax(7rem,9rem)_1fr] gap-3">
				<div></div>
				<div class="relative h-4">
					{#each tickLabels as tick (tick.seconds)}
						<span
							class="absolute -translate-x-1/2 font-mono text-[10px] text-gray-400 dark:text-gray-500"
							style="left: {tick.percent}%;"
						>
							{formatTimestamp(tick.seconds)}
						</span>
					{/each}
				</div>
			</div>

			<!-- Main track (track column aligns with dish rows below) -->
			<div class="grid grid-cols-[minmax(7rem,9rem)_1fr] items-center gap-3">
				<div></div>
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<div
					bind:this={trackBarRef}
					class="relative h-8 touch-none
						{isScrubbable ? 'cursor-grab active:cursor-grabbing' : ''}"
					role={isScrubbable ? 'slider' : undefined}
					tabindex={isScrubbable ? 0 : undefined}
					aria-label={isScrubbable ? 'Scrub film timeline' : undefined}
					aria-valuemin={isScrubbable ? 0 : undefined}
					aria-valuemax={isScrubbable ? runtimeSeconds : undefined}
					aria-valuenow={isScrubbable && currentElapsedSeconds !== null
						? Math.round(currentElapsedSeconds)
						: undefined}
					aria-valuetext={isScrubbable && currentElapsedSeconds !== null
						? formatTimestamp(currentElapsedSeconds)
						: undefined}
					onpointerdown={isScrubbable ? handleScrubPointerDown : undefined}
					onpointermove={isScrubbable ? handleScrubPointerMove : undefined}
					onpointerup={isScrubbable ? handleScrubPointerUp : undefined}
					onpointercancel={isScrubbable ? handleScrubPointerUp : undefined}
					onkeydown={isScrubbable ? handleScrubKeyDown : undefined}
				>
					{#each tickLabels as tick (tick.seconds)}
						<div
							class="pointer-events-none absolute top-0 bottom-0 w-px bg-gray-100 dark:bg-gray-700/60"
							style="left: {tick.percent}%;"
						></div>
					{/each}

					<div
						class="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full {feastTheme.timeline.track}"
					></div>

					{#if playheadPercent !== null}
						<div
							class="pointer-events-none absolute top-0 bottom-0 z-20 w-0.5 -translate-x-1/2 bg-red-500"
							style="left: {playheadPercent}%;"
							role="presentation"
						>
							<div
								class="absolute -top-0.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800
									{isScrubbing ? 'scale-125' : ''}"
							></div>
						</div>
					{/if}

					{#each dishes as dish (dish.id)}
						{@const eatAt = getDishTimestamp(dish, edition)}
						{#if eatAt !== null}
							{@const percent = getPositionPercent(eatAt, runtimeSeconds)}
							{@const isNext = dish.id === nextDishId}
							{@const isPast =
								currentElapsedSeconds !== null && eatAt <= currentElapsedSeconds}
							{@const isSelected = selectedDishIds.includes(dish.id)}
							{@const isGhost = highlightSelected && !isSelected}

							<div
								class="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
								style="left: {percent}%;"
							>
								<Tooltip
									label={dish.name}
									description="Eat {formatTimestamp(eatAt)}"
									placement="top"
									class="cursor-pointer"
									onclick={() => scrollToDishOnPage(dish.id)}
								>
									<span
										class="block rounded-full ring-2 ring-white dark:ring-gray-800
											{isGhost
											? `h-2 w-2 opacity-50 ${feastTheme.timeline.markerGhost}`
											: `h-3.5 w-3.5 ${feastTheme.timeline.marker}`}
											{isNext ? `scale-125 ring-4 ${feastTheme.timeline.markerRing}` : ''}
											{highlightSelected && isSelected ? `scale-110 ${feastTheme.timeline.markerRing}` : ''}
											{isPast && !isGhost ? 'opacity-40' : ''}"
									></span>
								</Tooltip>
							</div>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Expand toggle -->
			<div class="flex justify-end border-b border-gray-100 pb-2 dark:border-gray-700/60">
				<button
					type="button"
					class="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
					aria-expanded={isExpanded}
					onclick={() => (isExpanded = !isExpanded)}
				>
					{isExpanded ? 'Hide' : 'Show'} dish timelines
					<span
						class="material-symbols-outlined text-base transition-transform
							{isExpanded ? 'rotate-180' : ''}"
						aria-hidden="true"
					>
						expand_more
					</span>
				</button>
			</div>

			<!-- Expanded dish rows -->
			{#if isExpanded}
				<div class="space-y-0.5 pt-3">
					{#each dishes as dish (dish.id)}
						{@const eatAt = getDishTimestamp(dish, edition)}
						{#if eatAt !== null}
							{@const isSelected = selectedDishIds.includes(dish.id)}
							<TimelineDishRow
								{dish}
								{edition}
								{runtimeSeconds}
								isNext={dish.id === nextDishId}
								isPast={currentElapsedSeconds !== null && eatAt <= currentElapsedSeconds}
								isDimmed={highlightSelected && !isSelected}
								showCheckbox={showCheckboxes}
								selected={isSelected}
								onToggle={onToggleDish ? () => onToggleDish(dish.id) : undefined}
							/>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
