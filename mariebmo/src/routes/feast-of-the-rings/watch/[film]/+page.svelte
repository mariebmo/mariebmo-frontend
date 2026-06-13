<script lang="ts">
	import { onDestroy } from 'svelte';
	import EditionToggle from '$lib/feast-of-the-rings/components/EditionToggle.svelte';
	import SyncControls from '$lib/feast-of-the-rings/components/SyncControls.svelte';
	import Timeline from '$lib/feast-of-the-rings/components/Timeline.svelte';
	import { feastPlan } from '$lib/feast-of-the-rings/plan-store.svelte';
	import { getFilmRuntime } from '$lib/feast-of-the-rings/films';
	import { clampTimestamp } from '$lib/feast-of-the-rings/time';
	import { getSyncStatus } from '$lib/feast-of-the-rings/sync-utils';
	import type { WatchEmptyScope } from '$lib/feast-of-the-rings/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let isWatchMode = $state(false);
	let watchEmptyScope = $state<WatchEmptyScope>('all');
	let isPlaying = $state(false);
	let elapsedSeconds = $state(0);
	let offsetSeconds = $state(0);
	let startedAt = $state<number | null>(null);

	let intervalId: ReturnType<typeof setInterval> | null = null;
	let wasPlayingBeforeScrub = false;

	const filmId = $derived(data.film.id);
	const edition = $derived(feastPlan.plan.edition);
	const filmRuntimeSeconds = $derived(getFilmRuntime(filmId, edition));

	const allDishes = $derived(feastPlan.getVisibleDishesForFilm(filmId));
	const plannedDishes = $derived(feastPlan.getPlannedDishesForFilm(filmId));

	const timelineDishes = $derived.by(() => {
		if (plannedDishes.length > 0) return plannedDishes;

		if (watchEmptyScope === 'none') return [];
		return allDishes;
	});

	const pickerDishes = $derived(
		allDishes.filter((dish) => !feastPlan.plan.selectedDishIds.includes(dish.id))
	);

	const syncStatus = $derived(
		isWatchMode ? getSyncStatus(timelineDishes, edition, elapsedSeconds) : null
	);

	function tickElapsed() {
		if (startedAt === null) return;
		elapsedSeconds = Math.max(0, (Date.now() - startedAt) / 1000 + offsetSeconds);
	}

	function startInterval() {
		stopInterval();
		intervalId = setInterval(tickElapsed, 250);
	}

	function stopInterval() {
		if (intervalId !== null) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	function handlePlay() {
		startedAt = Date.now();
		isPlaying = true;
		tickElapsed();
		startInterval();
	}

	function handlePause() {
		if (startedAt !== null) {
			offsetSeconds = elapsedSeconds;
		}
		startedAt = null;
		isPlaying = false;
		stopInterval();
	}

	function handleNudge(deltaSeconds: number) {
		offsetSeconds += deltaSeconds;
		if (isPlaying && startedAt !== null) {
			tickElapsed();
		} else {
			elapsedSeconds = Math.max(0, elapsedSeconds + deltaSeconds);
			offsetSeconds = elapsedSeconds;
		}
	}

	function handleReset() {
		handlePause();
		elapsedSeconds = 0;
		offsetSeconds = 0;
	}

	function handleSeek(seconds: number) {
		const clamped = clampTimestamp(seconds, filmRuntimeSeconds);
		elapsedSeconds = clamped;
		offsetSeconds = clamped;
		if (isPlaying && startedAt !== null) {
			startedAt = Date.now();
		}
	}

	function handleScrubStart() {
		wasPlayingBeforeScrub = isPlaying;
		if (isPlaying) {
			handlePause();
		}
	}

	function handleScrub(seconds: number) {
		handleSeek(seconds);
	}

	function handleScrubEnd() {
		if (wasPlayingBeforeScrub) {
			handlePlay();
		}
	}

	function handleWatchModeToggle() {
		isWatchMode = !isWatchMode;
		if (!isWatchMode) {
			handleReset();
		}
	}

	onDestroy(() => {
		stopInterval();
	});
</script>

<svelte:head>
	<title>{data.film.shortTitle} | Feast of the Rings</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white">{data.film.title}</h1>
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Timestamps from opening narration — press Play when you hear "The world is changed…"
			</p>
		</div>
		<div class="flex flex-wrap items-center gap-3">
			<EditionToggle
				edition={feastPlan.plan.edition}
				onchange={(value) => feastPlan.setEdition(value)}
			/>
			<a
				href="/feast-of-the-rings/plan"
				class="text-sm font-medium text-amber-700 hover:text-amber-800 dark:text-amber-400"
			>
				Edit plan
			</a>
		</div>
	</div>

	<div class="mb-6 flex items-center gap-2">
		<button
			type="button"
			class="rounded-lg px-4 py-2 text-sm font-medium transition-colors
				{!isWatchMode
				? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
				: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}"
			aria-pressed={!isWatchMode}
			onclick={() => {
				if (isWatchMode) handleWatchModeToggle();
			}}
		>
			Browse
		</button>
		<button
			type="button"
			class="rounded-lg px-4 py-2 text-sm font-medium transition-colors
				{isWatchMode
				? 'bg-amber-600 text-white'
				: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}"
			aria-pressed={isWatchMode}
			onclick={() => {
				if (!isWatchMode) handleWatchModeToggle();
			}}
		>
			Watch
		</button>
	</div>

	{#if !plannedDishes.length}
		<div
			class="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20"
		>
			<p class="mb-3 text-sm text-amber-900 dark:text-amber-100">
				No dishes selected for this film. Show the full timeline or keep it empty?
			</p>
			<div class="flex gap-2">
				<button
					type="button"
					class="rounded-lg px-3 py-1.5 text-sm font-medium
						{watchEmptyScope === 'all'
						? 'bg-amber-600 text-white'
						: 'bg-white text-amber-800 dark:bg-gray-800 dark:text-amber-200'}"
					aria-pressed={watchEmptyScope === 'all'}
					onclick={() => (watchEmptyScope = 'all')}
				>
					All dishes
				</button>
				<button
					type="button"
					class="rounded-lg px-3 py-1.5 text-sm font-medium
						{watchEmptyScope === 'none'
						? 'bg-amber-600 text-white'
						: 'bg-white text-amber-800 dark:bg-gray-800 dark:text-amber-200'}"
					aria-pressed={watchEmptyScope === 'none'}
					onclick={() => (watchEmptyScope = 'none')}
				>
					None
				</button>
			</div>
		</div>
	{/if}

	{#if isWatchMode}
		<div class="mb-6">
			<SyncControls
				{isPlaying}
				{elapsedSeconds}
				maxSeconds={filmRuntimeSeconds}
				nextDishName={syncStatus?.nextDish?.name ?? null}
				secondsUntilNext={syncStatus?.secondsUntilNext ?? null}
				prepDishName={syncStatus?.prepDish?.name ?? null}
				onPlay={handlePlay}
				onPause={handlePause}
				onNudge={handleNudge}
				onReset={handleReset}
				onSeek={handleSeek}
			/>
		</div>
	{/if}

	<Timeline
		dishes={timelineDishes}
		{edition}
		{filmId}
		{pickerDishes}
		selectedDishIds={feastPlan.plan.selectedDishIds}
		showCheckboxes={true}
		currentElapsedSeconds={isWatchMode ? elapsedSeconds : null}
		onToggleDish={(id) => feastPlan.toggleDish(id)}
		onScrubStart={isWatchMode ? handleScrubStart : undefined}
		onScrub={isWatchMode ? handleScrub : undefined}
		onScrubEnd={isWatchMode ? handleScrubEnd : undefined}
	/>
</div>
