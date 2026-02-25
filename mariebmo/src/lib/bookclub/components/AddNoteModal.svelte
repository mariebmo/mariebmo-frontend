<script lang="ts">
	import type { CurrentBookEntry } from '$lib/bookclub/types';

	interface Props {
		entry: CurrentBookEntry | null;
		content: string;
		page: number | '';
		isPrivate: boolean;
		submitting: boolean;
		error: string | null;
		onContentChange: (v: string) => void;
		onPageChange: (v: number | '') => void;
		onPrivateChange: (v: boolean) => void;
		onSubmit: (e: SubmitEvent) => void;
		onClose: () => void;
	}
	let {
		entry,
		content,
		page,
		isPrivate,
		submitting,
		error,
		onContentChange,
		onPageChange,
		onPrivateChange,
		onSubmit,
		onClose
	}: Props = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onClose();
	}
</script>

{#if entry}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
		role="dialog"
		aria-modal="true"
		aria-labelledby="add-note-title"
		aria-describedby="add-note-desc"
		onclick={onClose}
		onkeydown={handleKeydown}
		tabindex="-1"
	>
		<div
			class="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
			role="presentation"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<div class="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
				<h3 id="add-note-title" class="text-lg font-semibold text-slate-900 dark:text-white">
					Add note
				</h3>
				<p id="add-note-desc" class="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
					{entry.book.title} · {entry.clubName}
				</p>
			</div>
			<form onsubmit={onSubmit} class="p-4">
				{#if error}
					<p class="mb-3 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
				{/if}
				<div class="space-y-3">
					<div>
						<label
							for="quick-note-content"
							class="block text-sm font-medium text-slate-700 dark:text-slate-300"
						>
							Note *
						</label>
						<textarea
							id="quick-note-content"
							value={content}
							oninput={(e) => onContentChange(e.currentTarget.value)}
							rows={3}
							required
							class="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500"
							aria-required="true"
						></textarea>
					</div>
					<div>
						<label
							for="quick-note-page"
							class="block text-sm font-medium text-slate-700 dark:text-slate-300"
						>
							Page (optional)
						</label>
						<input
							id="quick-note-page"
							type="number"
							min="1"
							value={page}
							oninput={(e) => {
								const v = e.currentTarget.value;
								onPageChange(v === '' ? '' : Number(v));
							}}
							class="w-full max-w-24 rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
						/>
					</div>
					<div class="flex items-center gap-2">
						<input
							id="quick-note-private"
							type="checkbox"
							checked={isPrivate}
							onchange={(e) => onPrivateChange(e.currentTarget.checked)}
							class="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-700"
						/>
						<label for="quick-note-private" class="text-sm text-slate-700 dark:text-slate-300">
							Private note
						</label>
					</div>
				</div>
				<div class="mt-4 flex gap-2">
					<button
						type="submit"
						disabled={submitting || !content.trim()}
						class="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500"
					>
						{submitting ? 'Saving…' : 'Save note'}
					</button>
					<button
						type="button"
						onclick={onClose}
						class="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
						aria-label="Cancel"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
