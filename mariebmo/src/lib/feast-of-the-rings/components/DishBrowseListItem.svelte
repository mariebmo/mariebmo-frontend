<script lang="ts">
	import { feastTheme } from '$lib/feast-of-the-rings/theme';
	import { getDishTimestamp } from '$lib/feast-of-the-rings/dishes';
	import { getPrepStartSeconds } from '$lib/feast-of-the-rings/timeline-utils';
	import { getTierClasses, SCENE_ROLE_LABELS, TIER_LABELS } from '$lib/feast-of-the-rings/labels';
	import { formatTimestamp } from '$lib/feast-of-the-rings/time';
	import DishKindBadges from './DishKindBadges.svelte';
	import DishSceneImage from './DishSceneImage.svelte';
	import type { Dish, Edition } from '$lib/feast-of-the-rings/types';

	interface Props {
		dish: Dish;
		edition: Edition;
		selected: boolean;
		onToggle?: () => void;
	}

	let { dish, edition, selected, onToggle }: Props = $props();

	const eatAt = $derived(getDishTimestamp(dish, edition));
	const prepStart = $derived(getPrepStartSeconds(dish, edition));
	const hasPrep = $derived(
		eatAt !== null && dish.prepLeadTimeSeconds > 0 && prepStart !== null && prepStart < eatAt
	);
</script>

<article
	id="feast-dish-{dish.id}"
	class="scroll-mt-24 flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-3 dark:border-gray-700 dark:bg-gray-800
		{selected ? feastTheme.selectedRing : ''}"
>
	{#if onToggle}
		<input
			type="checkbox"
			checked={selected}
			onchange={onToggle}
			class="h-4 w-4 shrink-0 rounded border-gray-300 {feastTheme.watch.checkbox}"
			aria-label="Include {dish.name} in plan"
		/>
	{/if}

	<DishSceneImage {dish} variant="list" />

	<div class="min-w-0 flex-1">
		<div class="mb-1 flex flex-wrap items-center gap-1.5">
			<DishKindBadges kinds={dish.kinds} />
			<span class="rounded-full px-2 py-0.5 text-xs font-medium {getTierClasses(dish.tier)}">
				{TIER_LABELS[dish.tier]}
			</span>
			<span class="text-xs text-gray-500 dark:text-gray-400">
				{SCENE_ROLE_LABELS[dish.sceneRole]}
			</span>
		</div>
		<h3 class="font-medium text-gray-900 dark:text-white">{dish.name}</h3>
		<p class="truncate text-sm text-gray-600 dark:text-gray-400">{dish.scene}</p>
	</div>

	{#if eatAt !== null}
		<div class="hidden shrink-0 text-right text-xs sm:block">
			{#if hasPrep && prepStart !== null}
				<p class="font-mono text-teal-700 dark:text-teal-400">
					Prep {formatTimestamp(prepStart)}
				</p>
				<p class="font-mono {feastTheme.timeline.timeText}">
					Eat {formatTimestamp(eatAt)}
				</p>
			{:else}
				<p class="font-mono {feastTheme.timeline.timeText}">
					{formatTimestamp(eatAt)}
				</p>
			{/if}
		</div>
	{/if}
</article>
