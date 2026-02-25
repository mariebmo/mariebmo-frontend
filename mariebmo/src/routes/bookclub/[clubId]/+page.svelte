<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import { BOOKCLUB_BASE_PATH } from '$lib/bookclub/config';
	import { bookclubApi } from '$lib/bookclub/api';
	import type { BookClubDetailResponse } from '$lib/bookclub/types';
	import { JoinStatus } from '$lib/bookclub/types';
	import { viewAsRole } from '$lib/bookclub/viewAsRole';
	import {
		AddBookForm,
		BookclubBreadcrumb,
		ClubHeroCard,
		ClubSettingsForm,
		CurrentlyReadingSection,
		HelpFloatingButton,
		MeetingScheduleCard,
		MembersList,
		PastBooksGrid,
		PastBooksSidebar
	} from '$lib/bookclub/components';

	const clubId = $derived($page.params.clubId as string);
	const base = $derived(BOOKCLUB_BASE_PATH || '/');

	let data = $state<BookClubDetailResponse | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

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
	let currentBookProgressSubmitting = $state(false);

	const club = $derived(data?.club ?? null);
	const me = $derived(data?.members?.find((m) => m.userId === auth.user?.id) ?? null);
	const myJoinStatus = $derived(
		me?.currentBookProgress?.joinStatus?.toLowerCase() ?? JoinStatus.NotSet
	);

	const nextMeetingDate = $derived(
		data?.currentBook?.meetup?.scheduledAt
			? new Date(data.currentBook.meetup.scheduledAt).toLocaleDateString(undefined, {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})
			: null
	);
	const scheduleLabel = $derived(
		data?.currentBook?.meetup?.notes ?? club?.theme ?? 'See book page for details'
	);
	const themeTags = $derived(
		club?.theme
			? club.theme
					.split(/[,&]|\s+and\s+/i)
					.map((t) => t.trim())
					.filter(Boolean)
			: []
	);

	const isAdmin = $derived(!!club && auth.user?.id === club.adminId);
	let viewAsRoleValue = $state<'admin' | 'member'>('admin');
	$effect(() => {
		const unsub = viewAsRole.subscribe((v) => {
			viewAsRoleValue = v;
		});
		return unsub;
	});
	const effectiveIsAdmin = $derived(isAdmin && viewAsRoleValue !== 'member');

	const inviteUrl = $derived(
		typeof window !== 'undefined' && club?.inviteSlug
			? `${window.location.origin}${base}/join/${encodeURIComponent(club.inviteSlug)}`
			: ''
	);

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

	async function setMyParticipation(joinStatus: string) {
		if (!data?.currentBook) return;
		currentBookProgressSubmitting = true;
		try {
			await bookclubApi.setMyProgress(clubId, data.currentBook.id, { joinStatus });
			await loadData();
		} finally {
			currentBookProgressSubmitting = false;
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

<div class="min-h-full bg-amber-50/60 dark:bg-slate-900">
	{#if loading}
		<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6">
			<p class="text-slate-600 dark:text-slate-400">Loading...</p>
		</div>
	{:else if error || !data}
		<div class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
			<div
				class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
				role="alert"
			>
				{error ?? 'Club not found'}
			</div>
			<p class="mt-4">
				<a
					href={base}
					class="inline-flex items-center gap-1 text-sm font-medium text-slate-600 underline hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
					aria-label="Back to bookclub hub"
				>
					← Back to Hub
				</a>
			</p>
		</div>
	{:else if club}
		<BookclubBreadcrumb basePath={base} />

		<div class="mx-auto max-w-5xl px-4 py-6 sm:px-6">
			<ClubHeroCard
				{club}
				memberCount={data.members.length}
				nextMeetingLabel={nextMeetingDate ?? scheduleLabel}
				{scheduleLabel}
				{effectiveIsAdmin}
				{showSettings}
				{showAddBook}
				{inviteCopyDone}
				{inviteUrl}
				onToggleSettings={() => (showSettings = !showSettings)}
				onToggleAddBook={() => (showAddBook = !showAddBook)}
				onCopyInvite={copyInviteLink}
			/>

			{#if effectiveIsAdmin && showSettings}
				<ClubSettingsForm
					name={settingsName}
					description={settingsDescription}
					theme={settingsTheme}
					isPublic={settingsIsPublic}
					inviteSlug={settingsInviteSlug}
					invitePassword={settingsInvitePassword}
					allowComments={settingsAllowComments}
					allowRatings={settingsAllowRatings}
					allowDnfVote={settingsAllowDnfVote}
					allowMeetupVote={settingsAllowMeetupVote}
					allowMeetupDetails={settingsAllowMeetupDetails}
					submitting={settingsSubmitting}
					error={settingsError}
					onNameChange={(v) => (settingsName = v)}
					onDescriptionChange={(v) => (settingsDescription = v)}
					onThemeChange={(v) => (settingsTheme = v)}
					onIsPublicChange={(v) => (settingsIsPublic = v)}
					onInviteSlugChange={(v) => (settingsInviteSlug = v)}
					onInvitePasswordChange={(v) => (settingsInvitePassword = v)}
					onAllowCommentsChange={(v) => (settingsAllowComments = v)}
					onAllowRatingsChange={(v) => (settingsAllowRatings = v)}
					onAllowDnfVoteChange={(v) => (settingsAllowDnfVote = v)}
					onAllowMeetupVoteChange={(v) => (settingsAllowMeetupVote = v)}
					onAllowMeetupDetailsChange={(v) => (settingsAllowMeetupDetails = v)}
					onSubmit={submitSettings}
				/>
			{/if}

			{#if effectiveIsAdmin && showAddBook}
				<AddBookForm
					fetchUrl={addBookFetchUrl}
					title={addTitle}
					author={addAuthor}
					coverUrl={addCoverUrl}
					pageCount={addPageCount}
					isCurrent={addIsCurrent}
					fetching={addBookFetching}
					submitting={addBookSubmitting}
					error={addBookError}
					onFetchUrlChange={(v) => (addBookFetchUrl = v)}
					onTitleChange={(v) => (addTitle = v)}
					onAuthorChange={(v) => (addAuthor = v)}
					onCoverUrlChange={(v) => (addCoverUrl = v)}
					onPageCountChange={(v) => (addPageCount = v)}
					onIsCurrentChange={(v) => (addIsCurrent = v)}
					onFetch={fetchBookInfo}
					onSubmit={submitAddBook}
				/>
			{/if}

			<div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div class="lg:col-span-2">
					<CurrentlyReadingSection
						currentBook={data.currentBook}
						{club}
						{themeTags}
						basePath={base}
						{clubId}
						{myJoinStatus}
						submitting={currentBookProgressSubmitting}
						{effectiveIsAdmin}
						onSetParticipation={setMyParticipation}
						onShowAddBook={() => (showAddBook = true)}
					/>
				</div>
				<aside class="flex flex-col gap-6" aria-label="Club sidebar">
					<MeetingScheduleCard {nextMeetingDate} {scheduleLabel} />
					<PastBooksSidebar pastBooks={data.pastBooks} basePath={base} {clubId} />
				</aside>
			</div>

			<MembersList members={data.members} {club} {effectiveIsAdmin} onRemoveMember={removeMember} />

			{#if data.pastBooks.length > 0}
				<PastBooksGrid pastBooks={data.pastBooks} basePath={base} {clubId} />
			{/if}
		</div>

		<HelpFloatingButton helpHref={base + '#help'} />
	{/if}
</div>
