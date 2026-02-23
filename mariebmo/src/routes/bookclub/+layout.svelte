<script lang="ts">
	import type { Snippet } from 'svelte';
	import { BOOKCLUB_BASE_PATH } from '$lib/bookclub/config';
	import { auth } from '$lib/auth';

	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="flex min-h-full flex-col bg-slate-50 dark:bg-slate-900">
	<header class="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
		<nav class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6" aria-label="Bookclub">
			<a
				href={BOOKCLUB_BASE_PATH || '/'}
				class="text-lg font-semibold text-slate-800 dark:text-slate-100"
				aria-label="Bookclub home"
			>
				Bookclub
			</a>
			<div class="flex items-center gap-4">
				{#if auth.isAuthenticated}
					<span class="text-sm text-slate-600 dark:text-slate-400">
						{auth.user?.displayName ?? auth.user?.email ?? 'Signed in'}
					</span>
					<button
						type="button"
						onclick={() => auth.logout()}
						class="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
						aria-label="Sign out"
					>
						Sign out
					</button>
				{:else}
					<a
						href="/login"
						class="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
						aria-label="Sign in"
					>
						Sign in
					</a>
				{/if}
				{#if BOOKCLUB_BASE_PATH}
					<a
						href="/"
						class="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
						aria-label="Back to main site"
					>
						← Main site
					</a>
				{/if}
			</div>
		</nav>
	</header>
	<main class="flex-1">
		{@render children?.()}
	</main>
</div>
