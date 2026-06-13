<script lang="ts">
	import { FILMS } from '$lib/feast-of-the-rings/films';
	import type { FilmId } from '$lib/feast-of-the-rings/types';

	interface Props {
		selectedFilmIds: FilmId[];
		onToggleFilm: (filmId: FilmId) => void;
		onSelectTrilogy: () => void;
	}

	let { selectedFilmIds, onToggleFilm, onSelectTrilogy }: Props = $props();

	const allSelected = $derived(selectedFilmIds.length === FILMS.length);
</script>

<div class="flex flex-wrap items-center gap-2">
	<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Films</span>

	{#each FILMS as film (film.id)}
		<button
			type="button"
			class="rounded-full px-3 py-1 text-sm transition-colors
				{selectedFilmIds.includes(film.id)
				? 'bg-amber-600 text-white'
				: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}"
			aria-pressed={selectedFilmIds.includes(film.id)}
			disabled={!film.curated && !selectedFilmIds.includes(film.id)}
			title={film.curated ? undefined : 'Not yet curated'}
			onclick={() => onToggleFilm(film.id)}
		>
			{film.shortTitle}
			{#if !film.curated}
				<span class="ml-1 text-xs opacity-70">(soon)</span>
			{/if}
		</button>
	{/each}

	<button
		type="button"
		class="rounded-full border border-amber-600 px-3 py-1 text-sm text-amber-700 transition-colors hover:bg-amber-50 dark:border-amber-400 dark:text-amber-300 dark:hover:bg-amber-900/20"
		aria-pressed={allSelected}
		onclick={onSelectTrilogy}
	>
		Trilogy
	</button>
</div>
