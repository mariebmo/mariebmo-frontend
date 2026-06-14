<script lang="ts">
	import { formatIngredientAmount } from '$lib/feast-of-the-rings/shopping-list';
	import type { Ingredient } from '$lib/feast-of-the-rings/types';

	interface Props {
		ingredients: Ingredient[];
	}

	let { ingredients }: Props = $props();
</script>

{#if ingredients.length > 0}
	<ul class="divide-y divide-gray-100 dark:divide-gray-700/80" role="list">
		{#each ingredients as ingredient (ingredient.name + ingredient.unit)}
			<li class="flex justify-between gap-4 py-1.5 text-sm text-gray-700 dark:text-gray-300">
				<span>{ingredient.name}</span>
				<span class="font-mono whitespace-nowrap text-gray-900 dark:text-white">
					{formatIngredientAmount(ingredient.amount)}
					{ingredient.unit}
				</span>
			</li>
		{/each}
	</ul>
{/if}
