<script lang="ts">
	import { CardColor, getCardClasses } from '$lib';
	import { FILMS } from '$lib/feast-of-the-rings/films';
	import { dishCountForFilm } from '$lib/feast-of-the-rings/dishes';
</script>

<svelte:head>
	<title>Feast of the Rings | Marie Blichfeldt Mo</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
			Feast of the Rings
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
			Eat what they eat, when they eat it. Plan your dishes, set your menu, and sync with the
			opening narration.
		</p>
	</div>

	<div class="space-y-4">
		{#each FILMS as film (film.id)}
			{#if film.curated}
				<a href="/feast-of-the-rings/watch/{film.slug}" class="group block">
					<div
						class="flex items-center gap-4 p-6 {getCardClasses({
							color: CardColor.RED,
							variant: 'outline',
							rounded: 'lg'
						})} hover:-translate-y-1"
					>
						<div class="min-w-0 flex-1">
							<h2 class="text-xl font-semibold">{film.title}</h2>
							<p class="text-gray-700 dark:text-gray-300">
								{dishCountForFilm(film.id, 'extended')} dishes curated
							</p>
						</div>
						<span
							class="material-symbols-outlined text-gray-400 transition-all group-hover:translate-x-1"
						>
							arrow_forward
						</span>
					</div>
				</a>
			{:else}
				<div
					class="flex items-center gap-4 rounded-lg border border-dashed border-gray-300 p-6 dark:border-gray-600"
				>
					<div class="min-w-0 flex-1">
						<h2 class="text-xl font-semibold text-gray-500 dark:text-gray-400">{film.title}</h2>
						<p class="text-sm text-gray-500 dark:text-gray-500">In progress</p>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
