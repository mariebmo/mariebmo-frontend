<script lang="ts">
	import CurrentReadCard from './CurrentReadCard.svelte';
	import type { CurrentBookEntry } from '$lib/bookclub/types';

	interface Props {
		entries: CurrentBookEntry[];
		loading: boolean;
		basePath: string;
		onAddNote: (entry: CurrentBookEntry) => void;
	}
	let { entries, loading, basePath, onAddNote }: Props = $props();
</script>

<section class="mb-10" aria-labelledby="current-reads-heading">
	<h2
		id="current-reads-heading"
		class="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
	>
		Your current reads
	</h2>
	{#if loading}
		<p class="text-sm text-slate-500 dark:text-slate-400">Loading your books…</p>
	{:else}
		<ul class="space-y-4" role="list">
			{#each entries as entry (entry.clubId + entry.book.id)}
				<CurrentReadCard {entry} {basePath} {onAddNote} />
			{/each}
		</ul>
	{/if}
</section>
