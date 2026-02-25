<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import { BOOKCLUB_BASE_PATH } from '$lib/bookclub/config';
	import { bookclubApi } from '$lib/bookclub/api';
	import { getDueDate } from '$lib/bookclub/utils';
	import type { BookClubDto, CurrentBookEntry } from '$lib/bookclub/types';
	import {
		AddNoteModal,
		ClubCard,
		CreateClubForm,
		CurrentReadsSection,
		JoinClubForm
	} from '$lib/bookclub/components';

	let clubs = $state<BookClubDto[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let currentBooks = $state<CurrentBookEntry[]>([]);
	let currentBooksLoading = $state(false);

	let showCreate = $state(false);
	let createName = $state('');
	let createDescription = $state('');
	let createIsPublic = $state(false);
	let createSubmitting = $state(false);
	let createError = $state<string | null>(null);

	let joinSlug = $state('');

	let noteForBook = $state<CurrentBookEntry | null>(null);
	let noteContent = $state('');
	let notePage = $state<number | ''>('');
	let notePrivate = $state(true);
	let noteSubmitting = $state(false);
	let noteError = $state<string | null>(null);

	const base = $derived(BOOKCLUB_BASE_PATH || '/');

	async function loadClubsAndCurrentBooks() {
		if (!auth.isAuthenticated) {
			clubs = [];
			currentBooks = [];
			loading = false;
			return;
		}
		try {
			const res = await bookclubApi.getMyClubs();
			clubs = res.clubs ?? [];
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load clubs';
		} finally {
			loading = false;
		}

		const withCurrentBook = clubs.filter((c) => c.currentBook != null);
		if (withCurrentBook.length === 0) {
			currentBooks = [];
			return;
		}
		currentBooksLoading = true;
		try {
			const details = await Promise.all(
				withCurrentBook.map((c) => bookclubApi.getClubDetail(c.id))
			);
			const userId = auth.user?.id;
			const entries: CurrentBookEntry[] = [];
			for (let i = 0; i < details.length; i++) {
				const detail = details[i];
				const club = withCurrentBook[i];
				if (!detail?.currentBook || !userId) continue;
				const me = detail.members.find((m) => m.userId === userId);
				const joinStatus = me?.currentBookProgress?.joinStatus?.toLowerCase() ?? '';
				if (joinStatus !== 'joined') continue;
				const pageCount = detail.currentBook.pageCount ?? null;
				const currentPage = me?.currentBookProgress?.currentPage ?? null;
				const progressPercent =
					pageCount != null && pageCount > 0 && currentPage != null
						? Math.min(100, Math.round((currentPage / pageCount) * 100))
						: null;
				entries.push({
					clubId: club.id,
					clubName: club.name,
					book: detail.currentBook,
					dueDate: getDueDate(detail.currentBook),
					progressPercent
				});
			}
			entries.sort((a, b) => {
				if (!a.dueDate) return 1;
				if (!b.dueDate) return -1;
				return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
			});
			currentBooks = entries;
		} catch {
			currentBooks = [];
		} finally {
			currentBooksLoading = false;
		}
	}

	onMount(async () => {
		if (browser) {
			const maxWait = 3000;
			const start = Date.now();
			while (auth.isLoading && Date.now() - start < maxWait) {
				await new Promise((r) => setTimeout(r, 50));
			}
		}
		loadClubsAndCurrentBooks();
	});

	async function handleCreate(event: SubmitEvent) {
		event.preventDefault();
		if (!createName.trim()) return;
		createSubmitting = true;
		createError = null;
		try {
			const club = await bookclubApi.createClub({
				name: createName.trim(),
				description: createDescription.trim() || undefined,
				isPublic: createIsPublic
			});
			clubs = [...clubs, club];
			showCreate = false;
			createName = '';
			createDescription = '';
			createIsPublic = false;
			goto(`${base}/${club.id}`);
		} catch (e) {
			createError = e instanceof Error ? e.message : 'Failed to create club';
		} finally {
			createSubmitting = false;
		}
	}

	function goToJoin() {
		const slug = joinSlug.trim().toLowerCase();
		if (slug) goto(`${base}/join/${encodeURIComponent(slug)}`);
	}

	function openAddNote(entry: CurrentBookEntry) {
		noteForBook = entry;
		noteContent = '';
		notePage = '';
		notePrivate = true;
		noteError = null;
	}

	function closeAddNote() {
		noteForBook = null;
	}

	function handleEscape(e: KeyboardEvent) {
		if (e.key === 'Escape' && noteForBook) closeAddNote();
	}

	if (browser) {
		$effect(() => {
			if (!noteForBook) return;
			window.addEventListener('keydown', handleEscape);
			return () => window.removeEventListener('keydown', handleEscape);
		});
	}

	async function submitQuickNote(event: SubmitEvent) {
		event.preventDefault();
		if (!noteForBook || !noteContent.trim()) return;
		noteSubmitting = true;
		noteError = null;
		try {
			await bookclubApi.createNote(noteForBook.clubId, noteForBook.book.id, {
				content: noteContent.trim(),
				pageNumber: notePage === '' ? undefined : Number(notePage),
				isPrivate: notePrivate
			});
			closeAddNote();
		} catch (e) {
			noteError = e instanceof Error ? e.message : 'Failed to save note';
		} finally {
			noteSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Bookclub | My clubs</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
	<header class="mb-10">
		<h1 class="text-2xl font-bold text-slate-900 dark:text-white">My Book Clubs</h1>
		<p class="mt-1 text-slate-600 dark:text-slate-400">
			Your current reads and clubs in one place.
		</p>
	</header>

	{#if auth.isAuthenticated && (currentBooks.length > 0 || currentBooksLoading)}
		<CurrentReadsSection
			entries={currentBooks}
			loading={currentBooksLoading}
			basePath={base}
			onAddNote={openAddNote}
		/>
	{/if}

	{#if loading}
		<p class="text-slate-600 dark:text-slate-400">Loading...</p>
	{:else if error}
		<div
			class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
			role="alert"
		>
			{error}
		</div>
	{:else if !auth.isAuthenticated}
		<p class="mb-6 text-slate-600 dark:text-slate-400">
			Sign in to see your clubs or create one. You can still join a club with an invite link below.
		</p>
		<p class="mb-6">
			<a
				href="/login"
				class="font-medium text-slate-700 underline hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
			>
				Sign in
			</a>
			<span class="text-slate-500 dark:text-slate-400"> or </span>
			<a
				href="/register"
				class="font-medium text-slate-700 underline hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
			>
				Register
			</a>
		</p>
	{/if}

	<JoinClubForm slug={joinSlug} onSlugChange={(v) => (joinSlug = v)} onGoToJoin={goToJoin} />

	{#if auth.isAuthenticated}
		<section class="mb-10">
			<CreateClubForm
				visible={showCreate}
				name={createName}
				description={createDescription}
				isPublic={createIsPublic}
				submitting={createSubmitting}
				error={createError}
				onNameChange={(v) => (createName = v)}
				onDescriptionChange={(v) => (createDescription = v)}
				onIsPublicChange={(v) => (createIsPublic = v)}
				onSubmit={handleCreate}
				onCancel={() => (showCreate = false)}
				onShowCreate={() => (showCreate = true)}
			/>
		</section>

		<section class="mb-10" aria-labelledby="book-clubs-heading">
			<h2
				id="book-clubs-heading"
				class="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
			>
				Your book clubs
			</h2>
			{#if clubs.length === 0}
				<p class="text-slate-600 dark:text-slate-400">
					You're not in any clubs yet. Create one or use an invite link below to join.
				</p>
			{:else}
				<ul class="grid gap-4 sm:grid-cols-2" role="list">
					{#each clubs as club (club.id)}
						<ClubCard {club} basePath={base} />
					{/each}
				</ul>
			{/if}
		</section>
	{/if}
</div>

<AddNoteModal
	entry={noteForBook}
	content={noteContent}
	page={notePage}
	isPrivate={notePrivate}
	submitting={noteSubmitting}
	error={noteError}
	onContentChange={(v) => (noteContent = v)}
	onPageChange={(v) => (notePage = v)}
	onPrivateChange={(v) => (notePrivate = v)}
	onSubmit={submitQuickNote}
	onClose={closeAddNote}
/>
