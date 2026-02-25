<script lang="ts">
	import type { BookDto, PastBookWithMyRatingDto } from '$lib/bookclub/types';

	/** API may return PascalCase (Book) from C#. Normalize to book. */
	function getBook(entry: PastBookWithMyRatingDto | { Book?: BookDto }): BookDto | undefined {
		return (entry as PastBookWithMyRatingDto).book ?? (entry as { Book?: BookDto }).Book;
	}

	interface Props {
		pastBooks: PastBookWithMyRatingDto[];
		basePath: string;
		clubId: string;
	}
	let { pastBooks, basePath, clubId }: Props = $props();

	const entriesWithBook = $derived(
		pastBooks
			.slice(0, 5)
			.map((entry, i) => ({ entry, book: getBook(entry), i }))
			.filter(
				(x): x is { entry: PastBookWithMyRatingDto; book: BookDto; i: number } => x.book != null
			)
	);
</script>

<section
	class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-800"
	aria-labelledby="upcoming-books-heading"
>
	<h2 id="upcoming-books-heading" class="mb-4 text-lg font-bold text-slate-900 dark:text-white">
		Past Books
	</h2>
	{#if entriesWithBook.length > 0}
		<ul class="space-y-3" role="list">
			{#each entriesWithBook as { book } (book.id)}
				<li>
					<a
						href="{basePath}/{clubId}/books/{book.id}"
						class="flex gap-3 rounded-lg p-1 transition hover:bg-slate-50 dark:hover:bg-slate-700/50"
						tabindex="0"
						aria-label="View {book.title} by {book.author}"
					>
						{#if book.coverImage}
							<img
								src={book.coverImage}
								alt=""
								class="h-14 w-10 shrink-0 rounded object-cover shadow"
								width="40"
								height="56"
							/>
						{:else}
							<div
								class="flex h-14 w-10 shrink-0 items-center justify-center rounded bg-slate-200 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400"
								aria-hidden="true"
							>
								—
							</div>
						{/if}
						<div class="min-w-0 flex-1">
							<p class="truncate text-sm font-medium text-slate-900 dark:text-white">
								{book.title}
							</p>
							<p class="truncate text-xs text-slate-500 dark:text-slate-400">{book.author}</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>
		{#if pastBooks.length > 5}
			<p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
				{pastBooks.length - 5} more below
			</p>
		{/if}
	{:else}
		<p class="text-sm text-slate-500 dark:text-slate-400">No past books yet.</p>
	{/if}
</section>
