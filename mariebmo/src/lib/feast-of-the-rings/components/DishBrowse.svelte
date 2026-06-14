<script lang="ts">
	import DishBrowseCard from './DishBrowseCard.svelte';
	import DishBrowseListItem from './DishBrowseListItem.svelte';
	import type { Dish, Edition, KindFilter, DishViewMode } from '$lib/feast-of-the-rings/types';

	interface Props {
		dishes: Dish[];
		edition: Edition;
		selectedDishIds: string[];
		kindFilter: KindFilter;
		viewMode: DishViewMode;
		onToggleDish?: (dishId: string) => void;
	}

	let { dishes, edition, selectedDishIds, kindFilter, viewMode, onToggleDish }: Props = $props();

	const filteredDishes = $derived.by(() => {
		if (kindFilter === 'all') return dishes;
		return dishes.filter((dish) => dish.kinds.includes(kindFilter));
	});
</script>

{#if filteredDishes.length === 0}
	<div class="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
		<p class="text-gray-600 dark:text-gray-400">No dishes to show.</p>
	</div>
{:else if viewMode === 'cards'}
	<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
		{#each filteredDishes as dish (dish.id)}
			<li class="min-h-0">
				<DishBrowseCard
					{dish}
					{edition}
					selected={selectedDishIds.includes(dish.id)}
					onToggle={onToggleDish ? () => onToggleDish(dish.id) : undefined}
				/>
			</li>
		{/each}
	</ul>
{:else}
	<ul class="space-y-2" role="list">
		{#each filteredDishes as dish (dish.id)}
			<li>
				<DishBrowseListItem
					{dish}
					{edition}
					selected={selectedDishIds.includes(dish.id)}
					onToggle={onToggleDish ? () => onToggleDish(dish.id) : undefined}
				/>
			</li>
		{/each}
	</ul>
{/if}
