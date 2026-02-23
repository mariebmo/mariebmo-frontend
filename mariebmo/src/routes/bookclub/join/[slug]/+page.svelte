<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import { BOOKCLUB_BASE_PATH } from '$lib/bookclub/config';
	import { bookclubApi } from '$lib/bookclub/api';
	import type { BookClubDto } from '$lib/bookclub/types';

	const slug = $derived($page.params.slug);
	const base = $derived(BOOKCLUB_BASE_PATH || '/');

	let club = $state<BookClubDto | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	let password = $state('');
	let joining = $state(false);
	let joinError = $state<string | null>(null);

	onMount(async () => {
		try {
			club = await bookclubApi.getClubByInviteSlug(slug);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Invite link invalid or expired';
		} finally {
			loading = false;
		}
	});

	async function handleJoin(event: SubmitEvent) {
		event.preventDefault();
		if (!auth.isAuthenticated) {
			goto(`/login?redirect=${encodeURIComponent($page.url.pathname)}`);
			return;
		}
		joining = true;
		joinError = null;
		try {
			await bookclubApi.joinByInvite({ slug, password: password.trim() || undefined });
			goto(`${base}/${club!.id}`);
		} catch (e) {
			joinError = e instanceof Error ? e.message : 'Failed to join';
		} finally {
			joining = false;
		}
	}
</script>

<svelte:head>
	<title>Join {club?.name ?? 'Book club'} | Bookclub</title>
</svelte:head>

<div class="mx-auto max-w-md px-4 py-8 sm:px-6">
	{#if loading}
		<p class="text-slate-600 dark:text-slate-400">Loading...</p>
	{:else if error || !club}
		<div
			class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
			role="alert"
		>
			{error ?? 'Club not found'}
		</div>
		<p class="mt-4">
			<a href={base} class="text-slate-600 underline dark:text-slate-400">Back to bookclub</a>
		</p>
	{:else}
		<div class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
			<h1 class="mb-2 text-xl font-bold text-slate-900 dark:text-white">Join {club.name}</h1>
			{#if club.theme}
				<p class="mb-2 text-sm text-slate-500 dark:text-slate-400">{club.theme}</p>
			{/if}
			{#if club.description}
				<p class="mb-6 text-slate-600 dark:text-slate-300">{club.description}</p>
			{/if}

			{#if !auth.isAuthenticated}
				<p class="mb-4 text-slate-600 dark:text-slate-400">
					Sign in or create an account to join this club.
				</p>
				<div class="flex gap-3">
					<a
						href="/login?redirect={encodeURIComponent($page.url.pathname)}"
						class="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500"
					>
						Sign in
					</a>
					<a
						href="/register"
						class="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
					>
						Register
					</a>
				</div>
			{:else}
				<form onsubmit={handleJoin} class="space-y-4">
					{#if joinError}
						<p class="text-sm text-red-600 dark:text-red-400" role="alert">{joinError}</p>
					{/if}
					<div>
						<label for="join-password" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
							Password (if required)
						</label>
						<input
							id="join-password"
							type="password"
							bind:value={password}
							class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
							aria-label="Invite password"
						/>
					</div>
					<button
						type="submit"
						disabled={joining}
						class="w-full rounded-lg bg-slate-800 px-4 py-3 font-medium text-white hover:bg-slate-700 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500"
					>
						{joining ? 'Joining...' : 'Join club'}
					</button>
				</form>
			{/if}
		</div>
		<p class="mt-4">
			<a href={base} class="text-slate-600 underline dark:text-slate-400">Back to bookclub</a>
		</p>
	{/if}
</div>
