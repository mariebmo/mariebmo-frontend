<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import { BOOKCLUB_BASE_PATH } from '$lib/bookclub/config';
	import { bookclubApi } from '$lib/bookclub/api';
	import type { BookDetailResponse, NoteDto, BookClubDetailResponse } from '$lib/bookclub/types';
	import { ReadingFormat, JoinStatus } from '$lib/bookclub/types';
	import { viewAsRole } from '$lib/bookclub/viewAsRole';

	const clubId = $derived($page.params.clubId as string);
	const bookId = $derived($page.params.bookId as string);
	const base = $derived(BOOKCLUB_BASE_PATH || '/');

	let data = $state<BookDetailResponse | null>(null);
	let clubData = $state<BookClubDetailResponse | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	let noteContent = $state('');
	let notePage = $state<number | ''>('');
	let notePrivate = $state(true);
	let noteSubmitting = $state(false);
	let editingNoteId = $state<string | null>(null);
	let editingNoteContent = $state('');
	let editingNotePage = $state<number | ''>('');
	let editingNoteChapter = $state<number | ''>('');
	let editingNotePrivate = $state(false);

	let progressPage = $state<number | ''>('');
	let progressChapter = $state<number | ''>('');
	let progressJoinStatus = $state<string>(JoinStatus.NotSet);
	let progressFormats = $state(0);
	let progressLanguage = $state('');
	let progressSubmitting = $state(false);

	let ratingScore = $state(5);
	let ratingThought = $state('');
	let ratingSubmitting = $state(false);

	let meetupDate = $state('');
	let meetupSubmitting = $state(false);
	let meetupScheduledAt = $state('');
	let meetupLocation = $state('');
	let meetupLink = $state('');
	let meetupNotes = $state('');
	let meetupAdminSubmitting = $state(false);
	let showMeetupAdmin = $state(false);

	let dnfSubmitting = $state(false);

	const club = $derived(clubData?.club ?? null);
	const book = $derived(data?.book ?? null);
	const discussionPoints = $derived(data?.discussionPoints ?? []);
	const isFinished = $derived(
		progressJoinStatus === JoinStatus.Finished ||
			!!data?.ratings?.find((r) => r.userId === auth.user?.id)
	);
	const progressPercent = $derived(
		book?.pageCount != null && progressPage !== '' && Number(progressPage) >= 0
			? Math.min(100, Math.round((Number(progressPage) / book.pageCount) * 100))
			: 0
	);
	const publishedYear = $derived(book?.startDate ? new Date(book.startDate).getFullYear() : null);
	const isAdmin = $derived(!!club && auth.user?.id === club.adminId);
	let viewAsRoleValue = $state<'admin' | 'member'>('admin');
	$effect(() => {
		const unsub = viewAsRole.subscribe((v) => {
			viewAsRoleValue = v;
		});
		return unsub;
	});
	const effectiveIsAdmin = $derived(isAdmin && viewAsRoleValue !== 'member');
	const allowComments = $derived(club?.allowComments ?? true);
	const allowRatings = $derived(club?.allowRatings ?? true);
	const allowDnfVote = $derived(club?.allowDnfVote ?? true);
	const allowMeetupVote = $derived(club?.allowMeetupVote ?? true);
	const allowMeetupDetails = $derived(club?.allowMeetupDetails ?? true);

	onMount(async () => {
		if (!auth.isAuthenticated) {
			goto(`${base}`);
			return;
		}
		try {
			const [bookRes, clubRes] = await Promise.all([
				bookclubApi.getBookDetail(clubId, bookId),
				bookclubApi.getClubDetail(clubId)
			]);
			data = bookRes;
			clubData = clubRes;
			if (bookRes.myProgress) {
				progressPage = bookRes.myProgress.currentPage ?? '';
				progressChapter = bookRes.myProgress.currentChapterNumber ?? '';
				progressJoinStatus = bookRes.myProgress.joinStatus.toLowerCase();
				progressFormats = bookRes.myProgress.readingFormats;
				progressLanguage = bookRes.myProgress.readingLanguage ?? '';
			}
			const myRating = bookRes.ratings.find((r) => r.userId === auth.user?.id);
			if (myRating) {
				ratingScore = myRating.score;
				ratingThought = myRating.finishingThought ?? '';
			}
			if (bookRes.book.meetup) {
				meetupScheduledAt = bookRes.book.meetup.scheduledAt
					? new Date(bookRes.book.meetup.scheduledAt).toISOString().slice(0, 16)
					: '';
				meetupLocation = bookRes.book.meetup.location ?? '';
				meetupLink = bookRes.book.meetup.link ?? '';
				meetupNotes = bookRes.book.meetup.notes ?? '';
			}
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load book';
		} finally {
			loading = false;
		}
	});

	const myRating = $derived(data?.ratings?.find((r) => r.userId === auth.user?.id) ?? null);
	const canEditNote = (note: NoteDto) => note.userId === auth.user?.id;

	async function submitNote(event: SubmitEvent) {
		event.preventDefault();
		if (!noteContent.trim()) return;
		noteSubmitting = true;
		try {
			await bookclubApi.createNote(clubId, bookId, {
				content: noteContent.trim(),
				pageNumber: notePage === '' ? undefined : Number(notePage),
				isPrivate: notePrivate
			});
			const updated = await bookclubApi.getBookDetail(clubId, bookId);
			data = updated;
			noteContent = '';
			notePage = '';
		} catch (e) {
			// could set error state
		} finally {
			noteSubmitting = false;
		}
	}

	async function submitProgress(event: SubmitEvent) {
		event.preventDefault();
		progressSubmitting = true;
		try {
			await bookclubApi.setMyProgress(clubId, bookId, {
				currentPage: progressPage === '' ? undefined : Number(progressPage),
				currentChapterNumber: progressChapter === '' ? undefined : Number(progressChapter),
				joinStatus: progressJoinStatus,
				readingFormats: progressFormats || undefined,
				readingLanguage: progressLanguage.trim() || undefined
			});
			const updated = await bookclubApi.getBookDetail(clubId, bookId);
			data = updated;
		} finally {
			progressSubmitting = false;
		}
	}

	function toggleFormat(flag: number) {
		progressFormats = progressFormats & flag ? progressFormats & ~flag : progressFormats | flag;
	}

	async function submitRating(event: SubmitEvent) {
		event.preventDefault();
		ratingSubmitting = true;
		try {
			await bookclubApi.setBookRating(clubId, bookId, {
				score: ratingScore,
				finishingThought: ratingThought.trim() || undefined
			});
			const updated = await bookclubApi.getBookDetail(clubId, bookId);
			data = updated;
		} finally {
			ratingSubmitting = false;
		}
	}

	async function submitMeetupVote(event: SubmitEvent) {
		event.preventDefault();
		if (!meetupDate) return;
		meetupSubmitting = true;
		try {
			await bookclubApi.setMeetupDateVote(clubId, bookId, {
				preferredDate: new Date(meetupDate).toISOString()
			});
			const updated = await bookclubApi.getClubDetail(clubId);
			const newBook = updated.currentBook;
			if (data && newBook && newBook.id === bookId) {
				data = { ...data, book: newBook };
			}
		} finally {
			meetupSubmitting = false;
		}
	}

	async function toggleDnf() {
		if (!data) return;
		dnfSubmitting = true;
		try {
			try {
				await bookclubApi.addDnfVote(clubId, bookId);
			} catch {
				await bookclubApi.removeDnfVote(clubId, bookId);
			}
			const updated = await bookclubApi.getBookDetail(clubId, bookId);
			data = updated;
		} finally {
			dnfSubmitting = false;
		}
	}

	function startEditNote(note: NoteDto) {
		editingNoteId = note.id;
		editingNoteContent = note.content;
		editingNotePage = note.pageNumber ?? '';
		editingNoteChapter = note.chapterNumber ?? '';
		editingNotePrivate = note.isPrivate;
	}

	function cancelEditNote() {
		editingNoteId = null;
	}

	async function submitEditNote(event: SubmitEvent) {
		event.preventDefault();
		if (!editingNoteId) return;
		try {
			await bookclubApi.updateNote(clubId, bookId, editingNoteId, {
				content: editingNoteContent.trim(),
				pageNumber: editingNotePage === '' ? undefined : Number(editingNotePage),
				chapterNumber: editingNoteChapter === '' ? undefined : Number(editingNoteChapter),
				isPrivate: editingNotePrivate
			});
			const updated = await bookclubApi.getBookDetail(clubId, bookId);
			data = updated;
			editingNoteId = null;
		} catch {
			// could show error
		}
	}

	async function deleteNote(noteId: string) {
		if (!confirm('Delete this note?')) return;
		try {
			await bookclubApi.deleteNote(clubId, bookId, noteId);
			const updated = await bookclubApi.getBookDetail(clubId, bookId);
			data = updated;
			if (editingNoteId === noteId) editingNoteId = null;
		} catch {
			// could show error
		}
	}

	async function submitMeetupAdmin(event: SubmitEvent) {
		event.preventDefault();
		meetupAdminSubmitting = true;
		try {
			await bookclubApi.updateMeetup(clubId, bookId, {
				scheduledAt: meetupScheduledAt ? new Date(meetupScheduledAt).toISOString() : undefined,
				location: meetupLocation.trim() || undefined,
				link: meetupLink.trim() || undefined,
				notes: meetupNotes.trim() || undefined
			});
			const updated = await bookclubApi.getBookDetail(clubId, bookId);
			data = updated;
			if (updated.book.meetup) {
				meetupScheduledAt = updated.book.meetup.scheduledAt
					? new Date(updated.book.meetup.scheduledAt).toISOString().slice(0, 16)
					: '';
				meetupLocation = updated.book.meetup.location ?? '';
				meetupLink = updated.book.meetup.link ?? '';
				meetupNotes = updated.book.meetup.notes ?? '';
			}
			showMeetupAdmin = false;
		} finally {
			meetupAdminSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>{book?.title ?? 'Book'} | Bookclub</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
	{#if loading}
		<p class="text-slate-600 dark:text-slate-400">Loading...</p>
	{:else if error || !data}
		<div
			class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
			role="alert"
		>
			{error ?? 'Book not found'}
		</div>
		<p class="mt-4">
			<a href="{base}/{clubId}" class="text-slate-600 underline dark:text-slate-400">Back to club</a
			>
		</p>
	{:else}
		<a
			href="{base}/{clubId}"
			class="mb-6 inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:underline"
			aria-label="Back to club"
		>
			← Back to Hub
		</a>

		<!-- Main book card -->
		<section
			class="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
			aria-labelledby="book-title"
		>
			<div class="flex flex-col gap-6 sm:flex-row">
				{#if book!.coverImage}
					<img
						src={book!.coverImage}
						alt=""
						class="h-48 w-32 shrink-0 rounded-lg object-cover sm:h-56 sm:w-40"
					/>
				{/if}
				<div class="min-w-0 flex-1">
					<h1 id="book-title" class="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
						{book!.title}
					</h1>
					<p class="mt-1 text-slate-600 dark:text-slate-400">by {book!.author}</p>
					{#if book!.averageRating != null}
						<div class="mt-2 flex items-center gap-2">
							<span class="flex text-amber-500" aria-hidden="true">
								{#each Array(5) as _, i}
									<span class="text-lg">
										{i < Math.round(book!.averageRating! / 2) ? '★' : '☆'}
									</span>
								{/each}
							</span>
							<span class="text-sm font-medium text-slate-700 dark:text-slate-300">
								{book!.averageRating.toFixed(1)} ({book!.ratingCount} ratings)
							</span>
						</div>
					{/if}
					<div
						class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-400"
					>
						{#if book!.pageCount != null}
							<span
								>Pages: <strong class="text-slate-700 dark:text-slate-300">{book!.pageCount}</strong
								></span
							>
						{/if}
						{#if publishedYear}
							<span
								>Published: <strong class="text-slate-700 dark:text-slate-300"
									>{publishedYear}</strong
								></span
							>
						{/if}
					</div>

					<form onsubmit={submitProgress} class="mt-4 space-y-3">
						<div>
							<label
								for="progress-join"
								class="block text-sm font-medium text-slate-700 dark:text-slate-300"
							>
								Your status
							</label>
							<select
								id="progress-join"
								bind:value={progressJoinStatus}
								class="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								aria-label="Reading status"
							>
								<option value={JoinStatus.NotSet}>—</option>
								<option value={JoinStatus.Joined}>Currently reading</option>
								<option value={JoinStatus.Skipping}>Skipping this one</option>
								<option value={JoinStatus.Finished}>Finished</option>
							</select>
						</div>
						<div>
							<div class="flex items-center justify-between">
								<label
									for="progress-page"
									class="block text-sm font-medium text-slate-700 dark:text-slate-300"
								>
									Reading progress
								</label>
								{#if book!.pageCount != null}
									<span class="text-sm text-slate-500 dark:text-slate-400">{progressPercent}%</span>
								{/if}
							</div>
							<div class="mt-1 flex items-center gap-2">
								{#if book!.pageCount != null}
									<input
										id="progress-page"
										type="range"
										min="0"
										max={book!.pageCount}
										value={progressPage === '' ? 0 : Number(progressPage)}
										oninput={(e) =>
											(progressPage = Number((e.currentTarget as HTMLInputElement).value))}
										class="h-2 flex-1 rounded-full bg-slate-200 accent-orange-500 dark:bg-slate-600"
										aria-label="Current page"
									/>
								{/if}
								<input
									id="progress-page-num"
									type="number"
									min="0"
									bind:value={progressPage}
									class="w-20 rounded border border-slate-300 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
									aria-label="Page number"
								/>
							</div>
						</div>
						<div
							class="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-3 dark:border-slate-600"
						>
							<fieldset class="flex gap-2">
								<legend class="sr-only">Format</legend>
								<button
									type="button"
									onclick={() => toggleFormat(ReadingFormat.Audiobook)}
									class="rounded px-2 py-1 text-sm {progressFormats & ReadingFormat.Audiobook
										? 'bg-slate-600 text-white'
										: 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-300'}"
								>
									Audiobook
								</button>
								<button
									type="button"
									onclick={() => toggleFormat(ReadingFormat.Physical)}
									class="rounded px-2 py-1 text-sm {progressFormats & ReadingFormat.Physical
										? 'bg-slate-600 text-white'
										: 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-300'}"
								>
									Physical
								</button>
								<button
									type="button"
									onclick={() => toggleFormat(ReadingFormat.Ebook)}
									class="rounded px-2 py-1 text-sm {progressFormats & ReadingFormat.Ebook
										? 'bg-slate-600 text-white'
										: 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-300'}"
								>
									Ebook
								</button>
							</fieldset>
							<input
								id="progress-lang"
								type="text"
								bind:value={progressLanguage}
								placeholder="Language"
								class="w-28 rounded border border-slate-300 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								aria-label="Reading language"
							/>
							<button
								type="submit"
								disabled={progressSubmitting}
								class="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50"
							>
								{progressSubmitting ? 'Saving...' : 'Save progress'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>

		<!-- Two columns: In this club + Discussion questions -->
		<div class="mb-8 grid gap-6 lg:grid-cols-2">
			<section
				class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
				aria-labelledby="discussion-heading"
			>
				<h2
					id="discussion-heading"
					class="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-100"
				>
					<span class="text-amber-500" aria-hidden="true">💬</span>
					Discussion questions
				</h2>
				{#if discussionPoints.length > 0}
					<ul class="space-y-2" role="list">
						{#each discussionPoints as point (point.id)}
							<li class="flex gap-2">
								<span
									class="mt-1.5 h-full w-1 shrink-0 rounded-full bg-amber-500"
									aria-hidden="true"
								></span>
								<span class="text-sm text-slate-700 dark:text-slate-300">{point.text}</span>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-sm text-slate-500 dark:text-slate-400">No discussion questions yet.</p>
				{/if}
			</section>
		</div>

		<!-- Notes (only if club allows comments) -->
		{#if allowComments}
			<section class="mb-8">
				<h2 class="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-100">
					Notes & comments
				</h2>
				<form onsubmit={submitNote} class="mb-4 space-x-2 flex flex-row">
					<div class="flex flex-col mr-3 h-full">
						<label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Page</label>
						<input
							type="number"
							min="0"
							bind:value={notePage}
							placeholder="1"
							class="w-24 rounded border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
						/>
					</div>

					<textarea
						bind:value={noteContent}
						rows={3}
						placeholder="Add a note or comment (page helps others avoid spoilers)..."
						class="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
						aria-label="Note content"
					></textarea>
					<div class="flex flex-wrap items-center gap-2">
						<button
							type="submit"
							disabled={noteSubmitting || !noteContent.trim()}
							class="rounded-lg bg-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-600 disabled:opacity-50"
						>
							{noteSubmitting ? 'Posting...' : 'Post'}
						</button>
						<label
							class="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 justify-end"
						>
							<input type="checkbox" bind:checked={notePrivate} />
							Private
						</label>
					</div>
				</form>
				<ul class="space-y-3" role="list">
					{#each data.notes as note (note.id)}
						<li
							class="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
						>
							{#if editingNoteId === note.id}
								<form onsubmit={submitEditNote} class="space-y-2">
									<textarea
										bind:value={editingNoteContent}
										rows={3}
										class="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
										aria-label="Edit note"
									></textarea>
									<div class="flex flex-wrap items-center gap-2">
										<input
											type="number"
											min="0"
											bind:value={editingNotePage}
											placeholder="Page (optional)"
											class="w-24 rounded border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
										/>
										<label
											class="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400"
										>
											<input type="checkbox" bind:checked={editingNotePrivate} />
											Private
										</label>
										<button
											type="submit"
											class="rounded-lg bg-slate-700 px-3 py-1.5 text-sm text-white hover:bg-slate-600"
										>
											Save
										</button>
										<button
											type="button"
											onclick={cancelEditNote}
											class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
										>
											Cancel
										</button>
									</div>
								</form>
							{:else}
								<p class="text-sm text-slate-500 dark:text-slate-400">
									{note.userDisplayName}
									{#if note.pageNumber != null}
										· p.{note.pageNumber}{/if}
									{#if note.isPrivate}
										· Private{/if}
									{#if canEditNote(note)}
										<span class="ml-2">
											<button
												type="button"
												onclick={() => startEditNote(note)}
												class="text-slate-500 underline hover:text-slate-700 dark:hover:text-slate-300"
											>
												Edit
											</button>
											<button
												type="button"
												onclick={() => deleteNote(note.id)}
												class="ml-2 text-red-600 hover:underline dark:text-red-400"
											>
												Delete
											</button>
										</span>
									{/if}
								</p>
								<p class="mt-1 text-slate-700 dark:text-slate-300">{note.content}</p>
							{/if}
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		<!-- Rate the book: only when club allows ratings and user has finished (or already rated) -->
		{#if allowRatings && isFinished}
			<section
				class="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
				aria-labelledby="rating-heading"
			>
				<h2
					id="rating-heading"
					class="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-100"
				>
					{myRating ? 'Your rating' : 'Rate this book'}
				</h2>
				<form onsubmit={submitRating} class="space-y-3">
					<div class="flex items-center gap-2">
						<label for="rating-score" class="text-sm text-slate-600 dark:text-slate-400"
							>Score (1–10)</label
						>
						<input
							id="rating-score"
							type="range"
							min="1"
							max="10"
							step="0.5"
							bind:value={ratingScore}
							class="w-32"
						/>
						<span class="text-sm font-medium text-slate-700 dark:text-slate-300">{ratingScore}</span
						>
					</div>
					<div>
						<label for="rating-thought" class="block text-sm text-slate-600 dark:text-slate-400"
							>Finishing thought</label
						>
						<textarea
							id="rating-thought"
							bind:value={ratingThought}
							rows={2}
							placeholder="Optional"
							class="mt-1 w-full rounded border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
						></textarea>
					</div>
					<button
						type="submit"
						disabled={ratingSubmitting}
						class="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50"
					>
						{ratingSubmitting ? 'Saving...' : myRating ? 'Update rating' : 'Submit rating'}
					</button>
				</form>
				{#if data.ratings.length > 0}
					<div class="mt-4 border-t border-slate-200 pt-4 dark:border-slate-600">
						<h3 class="text-sm font-medium text-slate-600 dark:text-slate-400">All ratings</h3>
						<ul class="mt-2 space-y-2" role="list">
							{#each data.ratings as r (r.id)}
								<li class="text-sm">
									<span class="font-medium text-slate-700 dark:text-slate-300"
										>{r.userDisplayName}</span
									>
									<span class="text-slate-500 dark:text-slate-400"> ★ {r.score}</span>
									{#if r.finishingThought}
										<p class="mt-0.5 text-slate-600 dark:text-slate-300">{r.finishingThought}</p>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</section>
		{/if}

		<!-- Meetup (only if club allows meetup vote or details) -->
		{#if allowMeetupVote || allowMeetupDetails}
			<section
				class="mb-8 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
			>
				<div class="mb-3 flex items-center justify-between">
					<h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">Meetup</h2>
					{#if effectiveIsAdmin && allowMeetupDetails}
						<button
							type="button"
							onclick={() => (showMeetupAdmin = !showMeetupAdmin)}
							class="rounded border border-slate-300 px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
						>
							{showMeetupAdmin ? 'Hide' : 'Set details'}
						</button>
					{/if}
				</div>
				{#if showMeetupAdmin && effectiveIsAdmin && allowMeetupDetails}
					<form
						onsubmit={submitMeetupAdmin}
						class="mb-4 space-y-3 rounded-lg border border-slate-200 p-3 dark:border-slate-600"
					>
						<div>
							<label
								for="meetup-datetime"
								class="block text-sm font-medium text-slate-700 dark:text-slate-300"
								>Date & time</label
							>
							<input
								id="meetup-datetime"
								type="datetime-local"
								bind:value={meetupScheduledAt}
								class="mt-1 w-full rounded border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
							/>
						</div>
						<div>
							<label
								for="meetup-location"
								class="block text-sm font-medium text-slate-700 dark:text-slate-300">Location</label
							>
							<input
								id="meetup-location"
								type="text"
								bind:value={meetupLocation}
								placeholder="e.g. Zoom / Café Name"
								class="mt-1 w-full rounded border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
							/>
						</div>
						<div>
							<label
								for="meetup-link"
								class="block text-sm font-medium text-slate-700 dark:text-slate-300">Link</label
							>
							<input
								id="meetup-link"
								type="url"
								bind:value={meetupLink}
								placeholder="https://..."
								class="mt-1 w-full rounded border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
							/>
						</div>
						<div>
							<label
								for="meetup-notes"
								class="block text-sm font-medium text-slate-700 dark:text-slate-300">Notes</label
							>
							<textarea
								id="meetup-notes"
								bind:value={meetupNotes}
								rows={2}
								class="mt-1 w-full rounded border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
							></textarea>
						</div>
						<button
							type="submit"
							disabled={meetupAdminSubmitting}
							class="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50"
						>
							{meetupAdminSubmitting ? 'Saving...' : 'Save meetup details'}
						</button>
					</form>
				{/if}
				{#if book!.meetup}
					{#if book!.meetup.scheduledAt}
						<p class="text-slate-600 dark:text-slate-300">
							{new Date(book!.meetup.scheduledAt).toLocaleDateString(undefined, {
								dateStyle: 'long',
								timeStyle: 'short'
							})}
						</p>
					{/if}
					{#if book!.meetup.location}
						<p class="text-slate-600 dark:text-slate-300">{book!.meetup.location}</p>
					{/if}
					{#if book!.meetup.link}
						<a
							href={book!.meetup.link}
							target="_blank"
							rel="noopener noreferrer"
							class="text-slate-600 underline dark:text-slate-400"
						>
							Meetup link
						</a>
					{/if}
					{#if book!.meetup.notes}
						<p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{book!.meetup.notes}</p>
					{/if}
				{:else if !showMeetupAdmin}
					<p class="text-sm text-slate-500 dark:text-slate-400">No meetup scheduled yet.</p>
				{/if}
				{#if allowMeetupVote}
					<form onsubmit={submitMeetupVote} class="mt-4 flex gap-2">
						<input
							type="datetime-local"
							bind:value={meetupDate}
							class="rounded border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
							aria-label="Preferred date"
						/>
						<button
							type="submit"
							disabled={meetupSubmitting || !meetupDate}
							class="rounded-lg bg-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-600 disabled:opacity-50"
						>
							Vote for date
						</button>
					</form>
				{/if}
			</section>
		{/if}

		<!-- DNF (only if club allows) -->
		{#if allowDnfVote}
			<section class="mb-8">
				<button
					type="button"
					onclick={toggleDnf}
					disabled={dnfSubmitting}
					class="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
				>
					I don't want to finish this book ({data.dnfVoteCount} vote{data.dnfVoteCount === 1
						? ''
						: 's'})
				</button>
			</section>
		{/if}
	{/if}
</div>
