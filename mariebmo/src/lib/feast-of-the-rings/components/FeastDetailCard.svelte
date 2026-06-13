<script lang="ts">
	import { feastTheme } from '$lib/feast-of-the-rings/theme';
	import DishKindBadges from './DishKindBadges.svelte';
	import DishSceneImage from './DishSceneImage.svelte';
	import {
		formatSuggestionFoodItems,
		getAllSuggestions,
		getSelectedSuggestion
	} from '$lib/feast-of-the-rings/suggestions';
	import type { DietaryTag, Dish } from '$lib/feast-of-the-rings/types';

	const DIETARY_LABELS: Record<DietaryTag, string> = {
		vegetarian: 'Vegetarian',
		vegan: 'Vegan'
	};

	interface Props {
		dish: Dish;
		selectedSuggestionId: string | undefined;
		onSelectSuggestion?: (suggestionId: string) => void;
	}

	let { dish, selectedSuggestionId, onSelectSuggestion }: Props = $props();

	const suggestions = $derived(getAllSuggestions(dish));
	const selectedSuggestion = $derived(getSelectedSuggestion(dish, selectedSuggestionId));
	const foodItems = $derived(formatSuggestionFoodItems(selectedSuggestion));
	const showSuggestionPicker = $derived(suggestions.length > 1);
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
			<h3 id="feast-detail-{dish.id}-title" class="text-lg font-semibold text-gray-900 dark:text-white">
				{dish.name}
			</h3>
			<p class="text-sm text-gray-600 dark:text-gray-400">{dish.scene}</p>
			<div class="mt-2">
				<DishKindBadges kinds={dish.kinds} />
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
							{#if suggestion.ingredients.length > 0}
								<span class="mt-1 block text-sm text-gray-500 dark:text-gray-400">
									{formatSuggestionFoodItems(suggestion)}
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
						</span>
					</label>
				{/each}
			</div>
		</fieldset>
	{:else if foodItems}
		<p class="text-sm text-gray-600 dark:text-gray-400">{foodItems}</p>
	{/if}
</article>
