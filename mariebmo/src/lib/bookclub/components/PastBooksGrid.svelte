<script lang="ts">
	import type { BookDto, PastBookWithMyRatingDto } from '$lib/bookclub/types';

	/** API may return PascalCase (Book, MyRating) from C#. Normalize to book / myRating. */
	function getBook(entry: PastBookWithMyRatingDto | { Book?: BookDto }): BookDto | undefined {
		return (entry as PastBookWithMyRatingDto).book ?? (entry as { Book?: BookDto }).Book;
	}
	function getMyRating(
		entry: PastBookWithMyRatingDto | { MyRating?: number | null }
	): number | null {
		const dto = entry as PastBookWithMyRatingDto;
		const pascal = entry as { MyRating?: number | null };
		if (dto.myRating != null) return dto.myRating;
		if (pascal.MyRating != null) return pascal.MyRating;
		return null;
	}

	interface Props {
		pastBooks: PastBookWithMyRatingDto[];
		basePath: string;
		clubId: string;
	}
	let { pastBooks, basePath, clubId }: Props = $props();

	const entriesWithBook = $derived(
		pastBooks
			.map((entry) => ({ book: getBook(entry), myRating: getMyRating(entry) }))
			.filter((x): x is { book: BookDto; myRating: number | null } => x.book != null)
	);
</script>

<section
	class="mt-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800"
	aria-labelledby="past-books-heading"
>
	<h2 id="past-books-heading" class="mb-4 text-lg font-bold text-slate-900 dark:text-white">
		Past books
	</h2>
	<ul class="flex flex-wrap gap-4" role="list">
		{#each entriesWithBook as { book, myRating } (book.id)}
			<li class="flex shrink-0 flex-col">
				<a
					href="{basePath}/{clubId}/books/{book.id}"
					class="group flex flex-col rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
				>
					{#if book.coverImage}
						<img
							src={book.coverImage}
							alt=""
							class="h-36 w-24 shrink-0 rounded-lg object-cover shadow"
							width="96"
							height="144"
						/>
					{:else}
						<div
							class="flex h-36 w-24 shrink-0 flex-col items-center justify-center rounded-lg bg-slate-200 px-1.5 text-center dark:bg-slate-700"
							aria-hidden="true"
						>
							<span class="line-clamp-3 text-xs font-medium text-slate-700 dark:text-slate-200"
								>{book.title}</span
							>
							<span class="mt-0.5 line-clamp-2 text-[10px] text-slate-500 dark:text-slate-400"
								>{book.author}</span
							>
						</div>
					{/if}
					<span
						class="mt-2 max-w-[6rem] truncate text-xs text-slate-600 dark:text-slate-300"
						title={book.title}>{book.title}</span
					>
					{#if myRating != null}
						<p class="mt-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
							Your rating ★ {Number(myRating).toFixed(1)}
						</p>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</section>
