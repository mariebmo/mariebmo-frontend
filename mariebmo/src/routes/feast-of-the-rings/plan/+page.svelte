<script lang="ts">
	import EditionToggle from '$lib/feast-of-the-rings/components/EditionToggle.svelte';
	import PlanFilmScope from '$lib/feast-of-the-rings/components/PlanFilmScope.svelte';
	import ShoppingList from '$lib/feast-of-the-rings/components/ShoppingList.svelte';
	import TierFilter from '$lib/feast-of-the-rings/components/TierFilter.svelte';
	import Timeline from '$lib/feast-of-the-rings/components/Timeline.svelte';
	import { getFilmById } from '$lib/feast-of-the-rings/films';
	import { feastPlan } from '$lib/feast-of-the-rings/plan-store.svelte';
</script>

<svelte:head>
	<title>Plan | Feast of the Rings</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-8">
		<h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Plan your feast</h1>
		<p class="text-gray-600 dark:text-gray-400">
			Choose films and dishes. Iconic dishes are pre-selected. One shopping list for everything.
		</p>
	</div>

	<div class="mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
		<PlanFilmScope
			selectedFilmIds={feastPlan.plan.selectedFilmIds}
			onToggleFilm={(id) => feastPlan.toggleFilm(id)}
			onSelectTrilogy={() => feastPlan.selectTrilogy()}
		/>
		<EditionToggle
			edition={feastPlan.plan.edition}
			onchange={(edition) => feastPlan.setEdition(edition)}
		/>
		<TierFilter
			tierFilter={feastPlan.plan.tierFilter}
			onchange={(filter) => feastPlan.setTierFilter(filter)}
		/>
	</div>

	<label class="mb-8 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
		<span class="font-medium">Headcount</span>
		<input
			type="number"
			min="1"
			value={feastPlan.plan.headcount}
			onchange={(event) => {
				const target = event.currentTarget;
				feastPlan.setHeadcount(Number.parseInt(target.value, 10) || 1);
			}}
			class="w-20 rounded-lg border border-gray-300 px-3 py-1.5 dark:border-gray-600 dark:bg-gray-800"
			aria-label="Number of people eating"
		/>
	</label>

	<div class="mb-8">
		<ShoppingList dishIds={feastPlan.plan.selectedDishIds} headcount={feastPlan.plan.headcount} />
	</div>

	{#each feastPlan.plan.selectedFilmIds as filmId (filmId)}
		{@const film = getFilmById(filmId)}
		{#if film}
			<section class="mb-10">
				<h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{film.title}</h2>
				{#if film.curated}
					{@const allVisible = feastPlan.getVisibleDishesForFilm(filmId)}
					{@const planned = feastPlan.getPlannedDishesForFilm(filmId)}
					<Timeline
						dishes={planned}
						edition={feastPlan.plan.edition}
						{filmId}
						pickerDishes={allVisible.filter(
							(dish) => !feastPlan.plan.selectedDishIds.includes(dish.id)
						)}
						selectedDishIds={feastPlan.plan.selectedDishIds}
						onToggleDish={(id) => feastPlan.toggleDish(id)}
					/>
				{:else}
					<p class="text-sm text-gray-500 dark:text-gray-400">Dishes for this film are coming soon.</p>
				{/if}
			</section>
		{/if}
	{/each}

	{#if feastPlan.plan.selectedFilmIds.length === 0}
		<p class="text-gray-600 dark:text-gray-400">Select at least one film to start planning.</p>
	{/if}
</div>
