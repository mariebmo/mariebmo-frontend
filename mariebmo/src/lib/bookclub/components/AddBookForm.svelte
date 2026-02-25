<script lang="ts">
	interface Props {
		fetchUrl: string;
		title: string;
		author: string;
		coverUrl: string;
		pageCount: number | '';
		isCurrent: boolean;
		fetching: boolean;
		submitting: boolean;
		error: string | null;
		onFetchUrlChange: (v: string) => void;
		onTitleChange: (v: string) => void;
		onAuthorChange: (v: string) => void;
		onCoverUrlChange: (v: string) => void;
		onPageCountChange: (v: number | '') => void;
		onIsCurrentChange: (v: boolean) => void;
		onFetch: () => void;
		onSubmit: (e: SubmitEvent) => void;
	}
	let {
		fetchUrl,
		title,
		author,
		coverUrl,
		pageCount,
		isCurrent,
		fetching,
		submitting,
		error,
		onFetchUrlChange,
		onTitleChange,
		onAuthorChange,
		onCoverUrlChange,
		onPageCountChange,
		onIsCurrentChange,
		onFetch,
		onSubmit
	}: Props = $props();
</script>

<section
	class="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
>
	<h2 class="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-100">Add book</h2>
	<p class="mb-2 text-sm text-slate-600 dark:text-slate-400">
		Paste the book page URL or ISBN. If you paste a whole line (e.g. title + URL), the URL is
		picked out automatically.
	</p>
	<div class="mb-3 flex gap-2">
		<input
			type="text"
			value={fetchUrl}
			oninput={(e) => onFetchUrlChange(e.currentTarget.value)}
			placeholder="e.g. https://www.goodreads.com/book/show/12345 or 9780141439518"
			class="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
			aria-label="Book page URL or ISBN to fetch book info"
		/>
		<button
			type="button"
			onclick={onFetch}
			disabled={fetching || !fetchUrl.trim()}
			class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
		>
			{fetching ? 'Fetching...' : 'Fetch'}
		</button>
	</div>
	{#if error}
		<p class="mb-3 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
	{/if}
	<form onsubmit={onSubmit} class="space-y-3">
		<div class="grid gap-3 sm:grid-cols-2">
			<div>
				<label for="add-title" class="block text-sm font-medium text-slate-700 dark:text-slate-300"
					>Title *</label
				>
				<input
					id="add-title"
					type="text"
					value={title}
					oninput={(e) => onTitleChange(e.currentTarget.value)}
					required
					maxlength={200}
					class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
				/>
			</div>
			<div>
				<label for="add-author" class="block text-sm font-medium text-slate-700 dark:text-slate-300"
					>Author *</label
				>
				<input
					id="add-author"
					type="text"
					value={author}
					oninput={(e) => onAuthorChange(e.currentTarget.value)}
					required
					maxlength={200}
					class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
				/>
			</div>
		</div>
		<div class="flex flex-wrap gap-4">
			<div>
				<label for="add-cover" class="block text-sm font-medium text-slate-700 dark:text-slate-300"
					>Cover URL</label
				>
				<input
					id="add-cover"
					type="url"
					value={coverUrl}
					oninput={(e) => onCoverUrlChange(e.currentTarget.value)}
					class="mt-1 w-64 rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
				/>
			</div>
			<div>
				<label for="add-pages" class="block text-sm font-medium text-slate-700 dark:text-slate-300"
					>Page count</label
				>
				<input
					id="add-pages"
					type="number"
					min="0"
					value={pageCount}
					oninput={(e) => {
						const v = e.currentTarget.value;
						onPageCountChange(v === '' ? '' : Number(v));
					}}
					class="mt-1 w-24 rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
				/>
			</div>
			<div class="flex items-center gap-2 pt-6">
				<input
					id="add-current"
					type="checkbox"
					checked={isCurrent}
					onchange={(e) => onIsCurrentChange(e.currentTarget.checked)}
					class="h-4 w-4 rounded border-slate-300 text-slate-600 dark:border-slate-600 dark:bg-slate-700"
				/>
				<label for="add-current" class="text-sm text-slate-700 dark:text-slate-300"
					>Set as current book</label
				>
			</div>
		</div>
		<button
			type="submit"
			disabled={submitting || !title.trim() || !author.trim()}
			class="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500"
		>
			{submitting ? 'Adding...' : 'Add book'}
		</button>
	</form>
</section>
