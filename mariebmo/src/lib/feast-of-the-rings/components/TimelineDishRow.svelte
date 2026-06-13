<script lang="ts">
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
	class="grid grid-cols-[minmax(7rem,9rem)_1fr] items-center gap-3 py-1.5
		{isPast ? 'opacity-50' : ''}
		{isNext ? 'rounded-lg bg-amber-50/80 px-2 dark:bg-amber-900/20' : ''}"
>
	<div class="flex min-w-0 items-center gap-2">
		{#if showCheckbox && onToggle}
			<input
				type="checkbox"
				checked={selected}
				onchange={onToggle}
				class="h-3.5 w-3.5 shrink-0 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
				aria-label="Include {dish.name} in plan"
			/>
		{/if}
		<span
			class="truncate text-sm font-medium text-gray-800 dark:text-gray-200
				{isNext ? 'text-amber-700 dark:text-amber-300' : ''}"
			title={dish.name}
		>
			{dish.name}
		</span>
	</div>

	{#if eatAt !== null}
		<div class="relative h-3 rounded-full bg-gray-100 dark:bg-gray-900/60">
			{#if hasPrepWindow}
				<div
					class="absolute inset-y-0 rounded-full bg-emerald-400/90 dark:bg-emerald-600/90"
					style="left: {prepLeftPercent}%; width: {prepWidthPercent}%;"
				></div>
				<div
					class="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600 ring-1 ring-white dark:ring-gray-800"
					style="left: {prepLeftPercent}%;"
					title="Prep {formatTimestamp(prepStart!)}"
				></div>
			{/if}

			<div
				class="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500 ring-1 ring-white dark:ring-gray-800"
				style="left: {eatPercent}%;"
				title="Eat {formatTimestamp(eatAt)}"
			></div>
		</div>
	{/if}
</div>
