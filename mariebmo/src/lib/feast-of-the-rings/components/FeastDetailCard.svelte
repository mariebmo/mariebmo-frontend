<script lang="ts">
	import { feastTheme } from '$lib/feast-of-the-rings/theme';
	import { getDishTimestamp } from '$lib/feast-of-the-rings/dishes';
	import { scaleIngredients } from '$lib/feast-of-the-rings/shopping-list';
	import {
		getAllSuggestions,
		getSelectedSuggestion,
		getSuggestionBaseServings
	} from '$lib/feast-of-the-rings/suggestions';
	import { formatTimestamp } from '$lib/feast-of-the-rings/time';
	import { getPrepStartSeconds } from '$lib/feast-of-the-rings/timeline-utils';
	import DishKindBadges from './DishKindBadges.svelte';
	import DishSceneImage from './DishSceneImage.svelte';
	import IngredientList from './IngredientList.svelte';
	import type { DietaryTag, Dish, Edition } from '$lib/feast-of-the-rings/types';

	const DIETARY_LABELS: Record<DietaryTag, string> = {
		vegetarian: 'Vegetarian',
		vegan: 'Vegan'
	};

	interface Props {
		dish: Dish;
		edition: Edition;
		headcount: number;
		selectedSuggestionId: string | undefined;
		onSelectSuggestion?: (suggestionId: string) => void;
	}

	let { dish, edition, headcount, selectedSuggestionId, onSelectSuggestion }: Props = $props();

	const suggestions = $derived(getAllSuggestions(dish));
	const selectedSuggestion = $derived(getSelectedSuggestion(dish, selectedSuggestionId));
	const showSuggestionPicker = $derived(suggestions.length > 1);
	const eatAt = $derived(getDishTimestamp(dish, edition));
	const prepStart = $derived(getPrepStartSeconds(dish, edition));
	const hasPrep = $derived(
		eatAt !== null && dish.prepLeadTimeSeconds > 0 && prepStart !== null && prepStart < eatAt
	);

	function scaledIngredientsForSuggestion(suggestion: (typeof suggestions)[number]) {
		const baseServings = getSuggestionBaseServings(dish, suggestion);
		return scaleIngredients(suggestion.ingredients, headcount, baseServings);
	}

	const selectedIngredients = $derived(scaledIngredientsForSuggestion(selectedSuggestion));
</script>

<article
	class="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
	aria-labelledby="feast-detail-{dish.id}-title"
>
	<div class="mb-4 flex flex-col gap-4 sm:flex-row">
		<div class="h-24 w-full shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40">
			<DishSceneImage {dish} variant="list" />
		</div>
		<div class="min-w-0 flex-1">
			<div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
				<h3
					id="feast-detail-{dish.id}-title"
					class="text-lg font-semibold text-gray-900 dark:text-white"
				>
					{dish.name}
				</h3>
				{#if eatAt !== null}
					<time datetime={formatTimestamp(eatAt)} class="text-sm {feastTheme.timeline.timeText}">
						{formatTimestamp(eatAt)}
					</time>
				{/if}
			</div>
			<p class="text-sm text-gray-600 dark:text-gray-400">{dish.scene}</p>
			<div class="mt-2 flex flex-wrap items-center gap-2">
				<DishKindBadges kinds={dish.kinds} />
				{#if hasPrep && prepStart !== null}
					<span class="text-xs text-teal-700 dark:text-teal-300">
						Start prep by {formatTimestamp(prepStart)}
					</span>
				{/if}
			</div>
		</div>
	</div>

	{#if showSuggestionPicker}
		<fieldset>
			<legend class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
				How do you want to serve this?
			</legend>
			<div class="space-y-2" role="radiogroup" aria-label="Serving options for {dish.name}">
				{#each suggestions as suggestion (suggestion.id)}
					{@const scaledIngredients = scaledIngredientsForSuggestion(suggestion)}
					<label
						class="flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors
							{selectedSuggestion.id === suggestion.id
							? feastTheme.menuSelected
							: 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'}"
					>
						<input
							type="radio"
							name="suggestion-{dish.id}"
							value={suggestion.id}
							checked={selectedSuggestion.id === suggestion.id}
							class="mt-1 shrink-0"
							onchange={() => onSelectSuggestion?.(suggestion.id)}
						/>
						<span class="min-w-0 flex-1">
							<span class="block text-sm font-medium text-gray-900 dark:text-white">
								{suggestion.name}
							</span>
							{#if suggestion.description}
								<span class="mt-0.5 block text-sm text-gray-600 dark:text-gray-400">
									{suggestion.description}
								</span>
							{/if}
							{#if suggestion.dietary?.length}
								<span class="mt-1 flex flex-wrap gap-1">
									{#each suggestion.dietary as tag (tag)}
										<span
											class="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-900 dark:bg-teal-950/50 dark:text-teal-200"
										>
											{DIETARY_LABELS[tag]}
										</span>
									{/each}
								</span>
							{/if}
							<div class="mt-2">
								<IngredientList ingredients={scaledIngredients} />
							</div>
						</span>
					</label>
				{/each}
			</div>
		</fieldset>
	{:else}
		<div>
			<h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">What you'll need</h4>
			<IngredientList ingredients={selectedIngredients} />
		</div>
	{/if}
</article>
