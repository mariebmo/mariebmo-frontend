<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import { BOOKCLUB_BASE_PATH } from '$lib/bookclub/config';
	import { bookclubApi } from '$lib/bookclub/api';
	import type { BookClubDetailResponse, BookDto } from '$lib/bookclub/types';

	const clubId = $derived($page.params.clubId as string);
	const base = $derived(BOOKCLUB_BASE_PATH || '/');

	let data = $state<BookClubDetailResponse | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	// Add book (admin)
	let showAddBook = $state(false);
	let addTitle = $state('');
	let addAuthor = $state('');
	let addCoverUrl = $state('');
	let addPageCount = $state<number | ''>('');
	let addIsCurrent = $state(true);
	let addBookFetchUrl = $state('');
	let addBookFetching = $state(false);
	let addBookSubmitting = $state(false);
	let addBookError = $state<string | null>(null);

	// Club settings (admin)
	let showSettings = $state(false);
	let settingsName = $state('');
	let settingsDescription = $state('');
	let settingsTheme = $state('');
	let settingsIsPublic = $state(false);
	let settingsInviteSlug = $state('');
	let settingsInvitePassword = $state('');
	let settingsAllowComments = $state(true);
	let settingsAllowRatings = $state(true);
	let settingsAllowDnfVote = $state(true);
	let settingsAllowMeetupVote = $state(true);
	let settingsAllowMeetupDetails = $state(true);
	let settingsSubmitting = $state(false);
	let settingsError = $state<string | null>(null);

	let inviteCopyDone = $state(false);

	async function loadData() {
		const res = await bookclubApi.getClubDetail(clubId);
		data = res;
		if (res.club) {
			settingsName = res.club.name;
			settingsDescription = res.club.description ?? '';
			settingsTheme = res.club.theme ?? '';
			settingsIsPublic = res.club.isPublic;
			settingsInviteSlug = res.club.inviteSlug ?? '';
			settingsAllowComments = res.club.allowComments;
			settingsAllowRatings = res.club.allowRatings;
			settingsAllowDnfVote = res.club.allowDnfVote;
			settingsAllowMeetupVote = res.club.allowMeetupVote;
			settingsAllowMeetupDetails = res.club.allowMeetupDetails;
		}
	}

	onMount(async () => {
		if (!auth.isAuthenticated) {
			goto(`${base}`);
			return;
		}
		try {
			await loadData();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load club';
		} finally {
			loading = false;
		}
	});

	const club = $derived(data?.club ?? null);
	const isAdmin = $derived(!!club && auth.user?.id === club.adminId);

	const inviteUrl = $derived(
		typeof window !== 'undefined' && club?.inviteSlug
			? `${window.location.origin}${base}/join/${encodeURIComponent(club.inviteSlug)}`
			: ''
	);

	function copyInviteLink() {
		if (!inviteUrl) return;
		navigator.clipboard.writeText(inviteUrl).then(() => {
			inviteCopyDone = true;
			setTimeout(() => (inviteCopyDone = false), 2000);
		});
	}

	async function fetchBookInfo() {
		if (!addBookFetchUrl.trim()) return;
		addBookFetching = true;
		addBookError = null;
		try {
			const info = await bookclubApi.fetchBookInfo(addBookFetchUrl.trim());
			if (info.title) addTitle = info.title;
			if (info.author) addAuthor = info.author;
			if (info.coverImage) addCoverUrl = info.coverImage;
			if (info.pageCount != null) addPageCount = info.pageCount;
		} catch (e) {
			addBookError = e instanceof Error ? e.message : 'Could not fetch book info';
		} finally {
			addBookFetching = false;
		}
	}

	async function submitAddBook(event: SubmitEvent) {
		event.preventDefault();
		if (!addTitle.trim() || !addAuthor.trim()) return;
		addBookSubmitting = true;
		addBookError = null;
		try {
			const book = await bookclubApi.addBook(clubId, {
				title: addTitle.trim(),
				author: addAuthor.trim(),
				coverImage: addCoverUrl.trim() || undefined,
				pageCount: addPageCount === '' ? undefined : Number(addPageCount),
				isCurrentBook: addIsCurrent
			});
			await loadData();
			showAddBook = false;
			addTitle = '';
			addAuthor = '';
			addCoverUrl = '';
			addPageCount = '';
			addIsCurrent = true;
			if (data?.currentBook?.id === book.id) goto(`${base}/${clubId}/books/${book.id}`);
		} catch (e) {
			addBookError = e instanceof Error ? e.message : 'Failed to add book';
		} finally {
			addBookSubmitting = false;
		}
	}

	async function submitSettings(event: SubmitEvent) {
		event.preventDefault();
		settingsSubmitting = true;
		settingsError = null;
		try {
			await bookclubApi.updateClub(clubId, {
				name: settingsName.trim() || undefined,
				description: settingsDescription.trim() || undefined,
				theme: settingsTheme.trim() || undefined,
				isPublic: settingsIsPublic,
				inviteSlug: settingsInviteSlug.trim() || undefined,
				invitePassword: settingsInvitePassword || undefined,
				allowComments: settingsAllowComments,
				allowRatings: settingsAllowRatings,
				allowDnfVote: settingsAllowDnfVote,
				allowMeetupVote: settingsAllowMeetupVote,
				allowMeetupDetails: settingsAllowMeetupDetails
			});
			await loadData();
			showSettings = false;
		} catch (e) {
			settingsError = e instanceof Error ? e.message : 'Failed to update settings';
		} finally {
			settingsSubmitting = false;
		}
	}

	async function removeMember(memberId: string) {
		if (!confirm('Remove this member from the club?')) return;
		try {
			await bookclubApi.removeMember(clubId, memberId);
			await loadData();
		} catch {
			// could show toast
		}
	}
</script>

<svelte:head>
	<title>{club?.name ?? 'Club'} | Bookclub</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
	{#if loading}
		<p class="text-slate-600 dark:text-slate-400">Loading...</p>
	{:else if error || !data}
		<div
			class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
			role="alert"
		>
			{error ?? 'Club not found'}
		</div>
		<p class="mt-4">
			<a href={base} class="text-slate-600 underline dark:text-slate-400">Back to bookclub</a>
		</p>
	{:else}
		<header class="mb-8">
			<a href={base} class="mb-4 inline-block text-sm text-slate-600 dark:text-slate-400 hover:underline">
				← My clubs
			</a>
			<h1 class="text-2xl font-bold text-slate-900 dark:text-white">{club!.name}</h1>
			{#if club!.theme}
				<p class="mt-1 text-slate-500 dark:text-slate-400">{club!.theme}</p>
			{/if}
			{#if club!.description}
				<p class="mt-2 text-slate-600 dark:text-slate-300">{club!.description}</p>
			{/if}
			<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
				{data.members.length} member{data.members.length === 1 ? '' : 's'}
			</p>

			<!-- Invite link -->
			{#if club!.inviteSlug}
				<div class="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-600 dark:bg-slate-800/50">
					<span class="text-sm text-slate-600 dark:text-slate-400">Invite link:</span>
					<code class="flex-1 truncate rounded bg-white px-2 py-1 text-sm dark:bg-slate-800">{inviteUrl}</code>
					<button
						type="button"
						onclick={copyInviteLink}
						class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
						aria-label="Copy invite link"
					>
						{inviteCopyDone ? 'Copied!' : 'Copy'}
					</button>
				</div>
			{/if}

			<!-- Admin: Settings & Add book -->
			{#if isAdmin}
				<div class="mt-4 flex flex-wrap gap-2">
					<button
						type="button"
						onclick={() => (showSettings = !showSettings)}
						class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
					>
						{showSettings ? 'Hide settings' : 'Club settings'}
					</button>
					<button
						type="button"
						onclick={() => (showAddBook = !showAddBook)}
						class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
					>
						{showAddBook ? 'Cancel' : 'Add book'}
					</button>
				</div>

				{#if showSettings}
					<section class="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
						<h2 class="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-100">Club settings</h2>
						{#if settingsError}
							<p class="mb-3 text-sm text-red-600 dark:text-red-400" role="alert">{settingsError}</p>
						{/if}
						<form onsubmit={submitSettings} class="space-y-3">
							<div>
								<label for="settings-name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
								<input
									id="settings-name"
									type="text"
									bind:value={settingsName}
									maxlength={100}
									class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								/>
							</div>
							<div>
								<label for="settings-desc" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
								<textarea
									id="settings-desc"
									bind:value={settingsDescription}
									rows={2}
									maxlength={500}
									class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								></textarea>
							</div>
							<div>
								<label for="settings-theme" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Theme (e.g. Black history month)</label>
								<input
									id="settings-theme"
									type="text"
									bind:value={settingsTheme}
									maxlength={200}
									class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								/>
							</div>
							<div class="flex items-center gap-2">
								<input
									id="settings-public"
									type="checkbox"
									bind:checked={settingsIsPublic}
									class="h-4 w-4 rounded border-slate-300 text-slate-600 dark:border-slate-600 dark:bg-slate-700"
								/>
								<label for="settings-public" class="text-sm text-slate-700 dark:text-slate-300">Public club</label>
							</div>
							<div>
								<label for="settings-invite-slug" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Invite slug (for join link)</label>
								<input
									id="settings-invite-slug"
									type="text"
									bind:value={settingsInviteSlug}
									placeholder="e.g. my-club"
									maxlength={100}
									class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								/>
							</div>
							<div>
								<label for="settings-invite-pw" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Invite password (optional)</label>
								<input
									id="settings-invite-pw"
									type="password"
									bind:value={settingsInvitePassword}
									placeholder="Leave blank to remove"
									class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								/>
							</div>
							<div class="space-y-2 border-t border-slate-200 pt-3 dark:border-slate-600">
								<p class="text-sm font-medium text-slate-700 dark:text-slate-300">Features</p>
								<div class="flex flex-wrap gap-4">
									<label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
										<input type="checkbox" bind:checked={settingsAllowComments} class="rounded border-slate-300" />
										Comments
									</label>
									<label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
										<input type="checkbox" bind:checked={settingsAllowRatings} class="rounded border-slate-300" />
										Ratings
									</label>
									<label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
										<input type="checkbox" bind:checked={settingsAllowDnfVote} class="rounded border-slate-300" />
										DNF vote
									</label>
									<label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
										<input type="checkbox" bind:checked={settingsAllowMeetupVote} class="rounded border-slate-300" />
										Meetup vote
									</label>
									<label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
										<input type="checkbox" bind:checked={settingsAllowMeetupDetails} class="rounded border-slate-300" />
										Meetup details
									</label>
								</div>
							</div>
							<button
								type="submit"
								disabled={settingsSubmitting}
								class="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500"
							>
								{settingsSubmitting ? 'Saving...' : 'Save settings'}
							</button>
						</form>
					</section>
				{/if}

				{#if showAddBook}
					<section class="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
						<h2 class="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-100">Add book</h2>
						<p class="mb-2 text-sm text-slate-600 dark:text-slate-400">
							Paste the book page URL or ISBN. If you paste a whole line (e.g. title + URL), the URL is picked out automatically.
						</p>
						<div class="mb-3 flex gap-2">
							<input
								type="text"
								bind:value={addBookFetchUrl}
								placeholder="e.g. https://www.goodreads.com/book/show/12345 or 9780141439518"
								class="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								aria-label="Book page URL or ISBN to fetch book info"
							/>
							<button
								type="button"
								onclick={fetchBookInfo}
								disabled={addBookFetching || !addBookFetchUrl.trim()}
								class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
							>
								{addBookFetching ? 'Fetching...' : 'Fetch'}
							</button>
						</div>
						{#if addBookError}
							<p class="mb-3 text-sm text-red-600 dark:text-red-400" role="alert">{addBookError}</p>
						{/if}
						<form onsubmit={submitAddBook} class="space-y-3">
							<div class="grid gap-3 sm:grid-cols-2">
								<div>
									<label for="add-title" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Title *</label>
									<input
										id="add-title"
										type="text"
										bind:value={addTitle}
										required
										maxlength={200}
										class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
									/>
								</div>
								<div>
									<label for="add-author" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Author *</label>
									<input
										id="add-author"
										type="text"
										bind:value={addAuthor}
										required
										maxlength={200}
										class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
									/>
								</div>
							</div>
							<div class="flex flex-wrap gap-4">
								<div>
									<label for="add-cover" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Cover URL</label>
									<input
										id="add-cover"
										type="url"
										bind:value={addCoverUrl}
										class="mt-1 w-64 rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
									/>
								</div>
								<div>
									<label for="add-pages" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Page count</label>
									<input
										id="add-pages"
										type="number"
										min="0"
										bind:value={addPageCount}
										class="mt-1 w-24 rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
									/>
								</div>
								<div class="flex items-center gap-2 pt-6">
									<input
										id="add-current"
										type="checkbox"
										bind:checked={addIsCurrent}
										class="h-4 w-4 rounded border-slate-300 text-slate-600 dark:border-slate-600 dark:bg-slate-700"
									/>
									<label for="add-current" class="text-sm text-slate-700 dark:text-slate-300">Set as current book</label>
								</div>
							</div>
							<button
								type="submit"
								disabled={addBookSubmitting || !addTitle.trim() || !addAuthor.trim()}
								class="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500"
							>
								{addBookSubmitting ? 'Adding...' : 'Add book'}
							</button>
						</form>
					</section>
				{/if}
			{/if}
		</header>

		{#if data.currentBook}
			<section class="mb-8">
				<h2 class="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Current book</h2>
				<a
					href="{base}/{clubId}/books/{data.currentBook.id}"
					class="block rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
				>
					<div class="flex gap-4">
						{#if data.currentBook.coverImage}
							<img
								src={data.currentBook.coverImage}
								alt=""
								class="h-24 w-16 shrink-0 rounded object-cover"
							/>
						{/if}
						<div class="min-w-0 flex-1">
							<h3 class="font-semibold text-slate-900 dark:text-white">{data.currentBook.title}</h3>
							<p class="text-sm text-slate-600 dark:text-slate-400">{data.currentBook.author}</p>
							{#if data.currentBook.averageRating != null}
								<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
									★ {data.currentBook.averageRating.toFixed(1)} ({data.currentBook.ratingCount} ratings)
								</p>
							{/if}
						</div>
						<span class="text-slate-400 dark:text-slate-500" aria-hidden="true">→</span>
					</div>
				</a>
			</section>
		{/if}

		<section class="mb-8">
			<h2 class="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Members</h2>
			<ul class="space-y-2" role="list">
				{#each data.members as member (member.id)}
					<li
						class="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-800"
					>
						<div class="min-w-0 flex-1">
							<span class="font-medium text-slate-700 dark:text-slate-300">{member.displayName || member.email}</span>
							<span class="ml-2 text-xs text-slate-500 dark:text-slate-400">
								{member.role}
								{#if member.currentBookProgress}
									· {member.currentBookProgress.joinStatus}
								{/if}
							</span>
						</div>
						{#if isAdmin && member.userId !== club!.adminId}
							<button
								type="button"
								onclick={() => removeMember(member.id)}
								class="shrink-0 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
								aria-label="Remove member"
							>
								Remove
							</button>
						{/if}
					</li>
				{/each}
			</ul>
		</section>

		{#if data.pastBooks.length > 0}
			<section>
				<h2 class="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Past books</h2>
				<ul class="space-y-2" role="list">
					{#each data.pastBooks as book (book.id)}
						<li>
							<a
								href="{base}/{clubId}/books/{book.id}"
								class="block rounded-lg border border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50"
							>
								<span class="font-medium text-slate-700 dark:text-slate-300">{book.title}</span>
								<span class="text-slate-500 dark:text-slate-400"> — {book.author}</span>
								{#if book.averageRating != null}
									<span class="text-sm text-slate-500 dark:text-slate-400">
										· ★ {book.averageRating.toFixed(1)}
									</span>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	{/if}
</div>
