<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import { BOOKCLUB_BASE_PATH } from '$lib/bookclub/config';
	import { bookclubApi } from '$lib/bookclub/api';
	import type { BookClubDto } from '$lib/bookclub/types';

	let clubs = $state<BookClubDto[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	let showCreate = $state(false);
	let createName = $state('');
	let createDescription = $state('');
	let createIsPublic = $state(false);
	let createSubmitting = $state(false);
	let createError = $state<string | null>(null);

	let joinSlug = $state('');

	const base = $derived(BOOKCLUB_BASE_PATH || '/');

	onMount(async () => {
		if (!auth.isAuthenticated) {
			clubs = [];
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
</script>

<svelte:head>
	<title>Bookclub | My clubs</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6">
	<h1 class="mb-6 text-2xl font-bold text-slate-900 dark:text-white">My book clubs</h1>

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

	<!-- Join with invite (everyone) -->
		<section class="mb-8 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
			<h2 class="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-100">Join with invite link</h2>
			<div class="flex flex-wrap gap-2">
				<input
					type="text"
					bind:value={joinSlug}
					placeholder="Invite slug (e.g. my-club)"
					class="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500"
					aria-label="Invite slug"
				/>
				<button
					type="button"
					onclick={goToJoin}
					disabled={!joinSlug.trim()}
					class="rounded-lg bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500"
				>
					Go to join
				</button>
			</div>
	</section>

	{#if auth.isAuthenticated}
		<!-- Create club -->
		<section class="mb-8">
			{#if showCreate}
				<form
					onsubmit={handleCreate}
					class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
				>
					<h2 class="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-100">Create a club</h2>
					{#if createError}
						<p class="mb-3 text-sm text-red-600 dark:text-red-400" role="alert">{createError}</p>
					{/if}
					<div class="space-y-3">
						<div>
							<label for="create-name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
								Name *
							</label>
							<input
								id="create-name"
								type="text"
								bind:value={createName}
								required
								maxlength={100}
								class="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
								aria-required="true"
							/>
						</div>
						<div>
							<label for="create-desc" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
								Description
							</label>
							<textarea
								id="create-desc"
								bind:value={createDescription}
								rows={2}
								maxlength={500}
								class="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
							></textarea>
						</div>
						<div class="flex items-center gap-2">
							<input
								id="create-public"
								type="checkbox"
								bind:checked={createIsPublic}
								class="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-700"
							/>
							<label for="create-public" class="text-sm text-slate-700 dark:text-slate-300">
								Public club
							</label>
						</div>
					</div>
					<div class="mt-4 flex gap-2">
						<button
							type="submit"
							disabled={createSubmitting || !createName.trim()}
							class="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500"
						>
							{createSubmitting ? 'Creating...' : 'Create'}
						</button>
						<button
							type="button"
							onclick={() => (showCreate = false)}
							class="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
						>
							Cancel
						</button>
					</div>
				</form>
			{:else}
				<button
					type="button"
					onclick={() => (showCreate = true)}
					class="rounded-xl border-2 border-dashed border-slate-300 px-6 py-4 text-slate-600 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:bg-slate-800"
				>
					+ Create a club
				</button>
			{/if}
		</section>

		<!-- Club list -->
		<section>
			{#if clubs.length === 0}
				<p class="text-slate-600 dark:text-slate-400">
					You’re not in any clubs yet. Create one or use an invite link above to join.
				</p>
			{:else}
				<ul class="space-y-3" role="list">
					{#each clubs as club (club.id)}
						<li>
							<a
								href="{base}/{club.id}"
								class="block rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-slate-900/50"
							>
								<div class="flex items-start justify-between gap-2">
									<div class="min-w-0 flex-1">
										<h2 class="font-semibold text-slate-900 dark:text-white">{club.name}</h2>
										{#if club.theme}
											<p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{club.theme}</p>
										{/if}
										{#if club.description}
											<p class="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
												{club.description}
											</p>
										{/if}
										<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
											{club.memberCount} member{club.memberCount === 1 ? '' : 's'}
											{#if club.currentBook}
												· Current: {club.currentBook.title}
											{/if}
										</p>
									</div>
									<span class="text-slate-400 dark:text-slate-500" aria-hidden="true">→</span>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	{/if}
</div>
