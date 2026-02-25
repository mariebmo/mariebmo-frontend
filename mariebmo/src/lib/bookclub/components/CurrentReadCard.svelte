<script lang="ts">
	import type { CurrentBookEntry } from '$lib/bookclub/types';

	interface Props {
		entry: CurrentBookEntry;
		basePath: string;
		onAddNote: (entry: CurrentBookEntry) => void;
	}
	let { entry, basePath, onAddNote }: Props = $props();
</script>

<li
	role="listitem"
	class="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-row"
>
	<button
		type="button"
		onclick={() => onAddNote(entry)}
		onkeydown={(e) => e.key === 'Enter' && onAddNote(entry)}
		class="shrink-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
		aria-label="Add a note for {entry.book.title}"
		tabindex="0"
	>
		{#if entry.book.coverImage}
			<img
				src={entry.book.coverImage}
				alt=""
				class="h-40 w-28 object-cover sm:h-36 sm:w-24"
				width="112"
				height="160"
			/>
		{:else}
			<div
				class="flex h-40 w-28 flex-col items-center justify-center bg-slate-200 px-2 text-center dark:bg-slate-700 sm:h-36 sm:w-24"
				aria-hidden="true"
			>
				<span class="line-clamp-3 text-xs font-medium text-slate-700 dark:text-slate-200">
					{entry.book.title}
				</span>
				<span class="mt-0.5 line-clamp-2 text-[10px] text-slate-500 dark:text-slate-400">
					{entry.book.author}
				</span>
			</div>
		{/if}
	</button>
	<div class="flex min-w-0 flex-1 flex-col justify-between p-4">
		<div>
			<h3 class="text-lg font-semibold text-slate-900 dark:text-white">{entry.book.title}</h3>
			<p class="text-sm text-slate-600 dark:text-slate-400">{entry.book.author}</p>
			<span
				class="mt-2 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
			>
				{entry.clubName}
			</span>
		</div>
		{#if entry.progressPercent != null}
			<div class="mt-3">
				<div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
					<span>Reading progress</span>
					<span>{entry.progressPercent}%</span>
				</div>
				<div
					class="mt-1 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600"
					role="progressbar"
					aria-valuenow={entry.progressPercent}
					aria-valuemin={0}
					aria-valuemax={100}
				>
					<div
						class="h-full rounded-full bg-amber-500 transition-all"
						style="width: {entry.progressPercent}%"
					></div>
				</div>
			</div>
		{:else if entry.dueDate}
			<p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
				Due {new Date(entry.dueDate).toLocaleDateString(undefined, { dateStyle: 'short' })}
			</p>
		{/if}
		<div class="mt-3 flex flex-wrap items-center gap-3">
			<a
				href="{basePath}/{entry.clubId}/books/{entry.book.id}"
				class="text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
			>
				Continue reading →
			</a>
			<button
				type="button"
				onclick={() => onAddNote(entry)}
				class="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
			>
				Add note
			</button>
		</div>
	</div>
</li>
