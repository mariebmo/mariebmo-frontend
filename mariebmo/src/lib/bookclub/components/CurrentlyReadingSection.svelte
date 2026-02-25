<script lang="ts">
	import type { BookDto, BookClubDto } from '$lib/bookclub/types';
	import { JoinStatus } from '$lib/bookclub/types';

	interface Props {
		currentBook: BookDto | null;
		club: BookClubDto | null;
		themeTags: string[];
		basePath: string;
		clubId: string;
		myJoinStatus: string;
		submitting: boolean;
		effectiveIsAdmin: boolean;
		onSetParticipation: (joinStatus: string) => void;
		onShowAddBook: () => void;
	}
	let {
		currentBook,
		club,
		themeTags,
		basePath,
		clubId,
		myJoinStatus,
		submitting,
		effectiveIsAdmin,
		onSetParticipation,
		onShowAddBook
	}: Props = $props();
</script>

{#if currentBook}
	<section
		class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800"
		aria-labelledby="currently-reading-heading"
	>
		<h2
			id="currently-reading-heading"
			class="mb-4 text-lg font-bold text-slate-900 dark:text-white"
		>
			Currently Reading
		</h2>
		<div class="flex flex-col gap-6 sm:flex-row">
			{#if currentBook.coverImage}
				<a
					href="{basePath}/{clubId}/books/{currentBook.id}"
					class="block shrink-0 overflow-hidden rounded-xl shadow-md transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
					aria-label="View {currentBook.title} details"
				>
					<img
						src={currentBook.coverImage}
						alt=""
						class="h-48 w-32 object-cover sm:h-56 sm:w-40"
						width="160"
						height="224"
					/>
				</a>
			{/if}
			<div class="min-w-0 flex-1">
				<h3 class="text-xl font-bold text-slate-900 dark:text-white">
					{currentBook.title}
				</h3>
				<p class="mt-0.5 text-slate-600 dark:text-slate-400">{currentBook.author}</p>
				{#if club?.theme}
					<p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{club.theme}</p>
				{/if}
				{#if themeTags.length > 0}
					<div class="mt-3 flex flex-wrap gap-2">
						{#each themeTags.slice(0, 4) as tag}
							<span
								class="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
							>
								{tag}
							</span>
						{/each}
					</div>
				{/if}
				<div class="mt-4 flex flex-wrap items-center gap-3">
					<a
						href="{basePath}/{clubId}/books/{currentBook.id}"
						class="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
						tabindex="0"
						aria-label="View book details for {currentBook.title}"
					>
						View Book Details
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
					</a>
					<div class="flex gap-2">
						<button
							type="button"
							disabled={submitting || myJoinStatus === JoinStatus.Joined}
							onclick={() => onSetParticipation(JoinStatus.Joined)}
							class="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50 dark:bg-amber-600 dark:hover:bg-amber-700"
							aria-label="Join this read"
						>
							Join
						</button>
						<button
							type="button"
							disabled={submitting || myJoinStatus === JoinStatus.Skipping}
							onclick={() => onSetParticipation(JoinStatus.Skipping)}
							class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
							aria-label="Skip this read"
						>
							Skip
						</button>
					</div>
				</div>
				{#if myJoinStatus !== JoinStatus.NotSet}
					<p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
						{myJoinStatus === JoinStatus.Joined ? "You're in" : 'Skipping'}
					</p>
				{/if}
			</div>
		</div>
	</section>
{:else}
	<section
		class="rounded-2xl border border-slate-200/80 border-dashed bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800"
		aria-labelledby="currently-reading-heading"
	>
		<h2
			id="currently-reading-heading"
			class="mb-2 text-lg font-bold text-slate-900 dark:text-white"
		>
			Currently Reading
		</h2>
		<p class="text-sm text-slate-500 dark:text-slate-400">No book selected yet.</p>
		{#if effectiveIsAdmin}
			<button
				type="button"
				onclick={onShowAddBook}
				class="mt-3 text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400"
			>
				Add book
			</button>
		{/if}
	</section>
{/if}
