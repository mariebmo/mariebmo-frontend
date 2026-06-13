<script lang="ts">
	import { feastTheme } from '$lib/feast-of-the-rings/theme';
	import { getDishTimestamp } from '$lib/feast-of-the-rings/dishes';
	import { getPrepStartSeconds, getPositionPercent } from '$lib/feast-of-the-rings/timeline-utils';
	import { formatTimestamp } from '$lib/feast-of-the-rings/time';
	import type { Dish, Edition } from '$lib/feast-of-the-rings/types';

	interface Props {
		dish: Dish;
		edition: Edition;
		runtimeSeconds: number;
		isNext?: boolean;
		isPast?: boolean;
		isDimmed?: boolean;
		showCheckbox?: boolean;
		selected?: boolean;
		onToggle?: () => void;
	}

	let {
		dish,
		edition,
		runtimeSeconds,
		isNext = false,
		isPast = false,
		isDimmed = false,
		showCheckbox = false,
		selected = false,
		onToggle
	}: Props = $props();

	const eatAt = $derived(getDishTimestamp(dish, edition));
	const prepStart = $derived(getPrepStartSeconds(dish, edition));
	const hasPrepWindow = $derived(
		eatAt !== null && dish.prepLeadTimeSeconds > 0 && prepStart !== null && prepStart < eatAt
	);

	const prepLeftPercent = $derived(
		hasPrepWindow && prepStart !== null ? getPositionPercent(prepStart, runtimeSeconds) : 0
	);

	const eatPercent = $derived(eatAt !== null ? getPositionPercent(eatAt, runtimeSeconds) : 0);

	const prepWidthPercent = $derived(
		hasPrepWindow ? eatPercent - prepLeftPercent : 0
	);
</script>

<div
	id="feast-dish-row-{dish.id}"
	class="scroll-mt-24 grid grid-cols-[minmax(7rem,9rem)_1fr] items-center gap-3 py-1.5
		{isPast ? 'opacity-50' : ''}
		{isDimmed ? 'opacity-40' : ''}
		{isNext ? `rounded-lg px-2 ${feastTheme.timeline.nextRow}` : ''}"
>
	<div class="flex min-w-0 items-center gap-2">
		{#if showCheckbox && onToggle}
			<input
				type="checkbox"
				checked={selected}
				onchange={onToggle}
				class="h-3.5 w-3.5 shrink-0 rounded border-gray-300 {feastTheme.watch.checkbox}"
				aria-label="Include {dish.name} in plan"
			/>
		{/if}
		<span
			class="truncate text-sm font-medium text-gray-800 dark:text-gray-200
				{isNext ? feastTheme.timeline.nextText : ''}"
			title={dish.name}
		>
			{dish.name}
		</span>
	</div>

	{#if eatAt !== null}
		<div class="relative h-3 rounded-full bg-gray-100 dark:bg-gray-900/60">
			{#if hasPrepWindow}
				<div
					class="absolute inset-y-0 rounded-full {feastTheme.timeline.prepBar}"
					style="left: {prepLeftPercent}%; width: {prepWidthPercent}%;"
				></div>
				<div
					class="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full {feastTheme.timeline.prepDot} ring-1 ring-white dark:ring-gray-800"
					style="left: {prepLeftPercent}%;"
					title="Prep {formatTimestamp(prepStart!)}"
				></div>
			{/if}

			<div
				class="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full {feastTheme.timeline.marker} ring-1 ring-white dark:ring-gray-800"
				style="left: {eatPercent}%;"
				title="Eat {formatTimestamp(eatAt)}"
			></div>
		</div>
	{/if}
</div>
