<script lang="ts">
	import { feastTheme } from '$lib/feast-of-the-rings/theme';
	import { getDishTimestamp } from '$lib/feast-of-the-rings/dishes';
	import { getPrepStartSeconds } from '$lib/feast-of-the-rings/timeline-utils';
	import {
		getSceneRoleSizeClasses,
		getTierClasses,
		SCENE_ROLE_LABELS,
		TIER_LABELS
	} from '$lib/feast-of-the-rings/labels';
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
	class="scroll-mt-24 flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800
		{selected ? feastTheme.selectedRing : ''}"
>
	<DishSceneImage {dish} variant="card" />

	<div class="flex flex-1 flex-col p-4">
		<div class="mb-3 flex items-start gap-2">
			{#if onToggle}
				<input
					type="checkbox"
					checked={selected}
					onchange={onToggle}
					class="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 {feastTheme.watch.checkbox}"
					aria-label="Include {dish.name} in plan"
				/>
			{/if}
			<div class="min-w-0 flex-1">
				<div class="mb-2 flex flex-wrap items-center gap-1.5">
					<DishKindBadges kinds={dish.kinds} />
					<span class="rounded-full px-2 py-0.5 text-xs font-medium {getTierClasses(dish.tier)}">
						{TIER_LABELS[dish.tier]}
					</span>
					<span class="text-xs text-gray-500 dark:text-gray-400">
						{SCENE_ROLE_LABELS[dish.sceneRole]}
					</span>
				</div>
				<h3 class="{getSceneRoleSizeClasses(dish.sceneRole)} text-gray-900 dark:text-white">
					{dish.name}
				</h3>
				<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{dish.scene}</p>
			</div>
		</div>

		{#if eatAt !== null}
			<div class="mt-auto space-y-2 border-t border-gray-100 pt-3 dark:border-gray-700">
				{#if hasPrep && prepStart !== null}
					<div class="flex flex-wrap items-center gap-2 text-xs">
						<span
							class="rounded {feastTheme.timeline.prepBadge} px-2 py-1 font-mono"
						>
							Prep {formatTimestamp(prepStart)}
						</span>
						<span class="text-gray-400" aria-hidden="true">→</span>
						<span
							class="rounded {feastTheme.timeline.eatBadge} px-2 py-1 font-mono"
						>
							Eat {formatTimestamp(eatAt)}
						</span>
					</div>
				{:else}
					<span
						class="inline-block rounded {feastTheme.timeline.eatBadge} px-2 py-1 font-mono text-xs"
					>
						Eat {formatTimestamp(eatAt)}
					</span>
				{/if}
			</div>
		{/if}
	</div>
</article>
