<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { BOOKCLUB_BASE_PATH } from '$lib/bookclub/config';
	import { auth } from '$lib/auth';
	import { viewAsRole, type ViewAsRole as ViewAsRoleType } from '$lib/bookclub/viewAsRole';

	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();

	const base = BOOKCLUB_BASE_PATH || '/';

	let userMenuOpen = $state(false);
	let viewAsOpen = $state(false);
	let viewAsRoleValue = $state<ViewAsRoleType>('admin');

	const unsubscribe = viewAsRole.subscribe((v) => {
		viewAsRoleValue = v;
	});

	onMount(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!(e.target as HTMLElement)?.closest?.('.bookclub-nav')) closeMenus();
		};
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
			unsubscribe();
		};
	});

	function closeMenus() {
		userMenuOpen = false;
		viewAsOpen = false;
	}

	function toggleUserMenu() {
		viewAsOpen = false;
		userMenuOpen = !userMenuOpen;
	}

	function toggleViewAs() {
		userMenuOpen = false;
		viewAsOpen = !viewAsOpen;
	}

	function setViewAs(role: ViewAsRoleType) {
		viewAsRoleValue = role;
		viewAsRole.set(role);
		viewAsOpen = false;
	}

	function handleSignOut() {
		closeMenus();
		auth.logout();
	}
</script>

<div class="flex min-h-full flex-col bg-slate-50 dark:bg-slate-900">
	<header
		class="bookclub-nav border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
	>
		<nav
			class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6"
			aria-label="Bookclub"
		>
			<a
				href={base}
				class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
				aria-label="Bookclub home"
			>
				<span class="sr-only">Home</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			</a>
			<div class="flex items-center gap-2">
				{#if auth.isAuthenticated}
					<!-- View as: Admin / Member -->
					<div class="relative">
						<button
							type="button"
							onclick={(e) => {
								e.stopPropagation();
								toggleViewAs();
							}}
							class="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
							aria-haspopup="listbox"
							aria-expanded={viewAsOpen}
							aria-label="View as role"
						>
							View as: {viewAsRoleValue === 'admin' ? 'Admin' : 'Member'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/></svg
							>
						</button>
						{#if viewAsOpen}
							<ul
								role="listbox"
								class="absolute right-0 top-full z-20 mt-1 min-w-[8rem] rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-800"
								onclick={(e) => e.stopPropagation()}
							>
								<li role="option">
									<button
										type="button"
										onclick={() => setViewAs('admin')}
										class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
									>
										Admin
									</button>
								</li>
								<li role="option">
									<button
										type="button"
										onclick={() => setViewAs('member')}
										class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
									>
										Member
									</button>
								</li>
							</ul>
						{/if}
					</div>

					<!-- User menu -->
					<div class="relative">
						<button
							type="button"
							onclick={(e) => {
								e.stopPropagation();
								toggleUserMenu();
							}}
							class="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
							aria-haspopup="menu"
							aria-expanded={userMenuOpen}
							aria-label="User menu"
						>
							{auth.user?.displayName ?? auth.user?.email ?? 'Signed in'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/></svg
							>
						</button>
						{#if userMenuOpen}
							<ul
								role="menu"
								class="absolute right-0 top-full z-20 mt-1 min-w-[10rem] rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-800"
								onclick={(e) => e.stopPropagation()}
							>
								<li role="none">
									<button
										type="button"
										role="menuitem"
										onclick={handleSignOut}
										class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
									>
										Sign out
									</button>
								</li>
							</ul>
						{/if}
					</div>
				{:else}
					<a
						href="/login"
						class="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
						aria-label="Sign in"
					>
						Sign in
					</a>
				{/if}
			</div>
		</nav>
	</header>
	<main class="flex-1">
		{@render children?.()}
	</main>
</div>
