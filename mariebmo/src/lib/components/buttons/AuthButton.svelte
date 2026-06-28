<script lang="ts">
	import { auth } from '$lib/auth';
	import { goto } from '$app/navigation';

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	async function handleLogout() {
		await auth.logout();
		closeMenu();
		goto('/');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMenu();
		}
		if (event.key === 'Enter' || event.key === ' ') {
			toggleMenu();
		}
	}

	function handleMenuKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			handleLogout();
		}
	}
</script>

{#if auth.isLoading}
	<div class="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
{:else if auth.isAuthenticated}
	<div class="relative">
		<button
			onclick={toggleMenu}
			onkeydown={handleKeydown}
			class="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-sm font-semibold text-white transition-all hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
			aria-label="User menu"
			aria-expanded={isMenuOpen}
			aria-haspopup="true"
		>
			{auth.user?.displayName?.charAt(0).toUpperCase() ||
				auth.user?.email?.charAt(0).toUpperCase() ||
				'U'}
		</button>

		{#if isMenuOpen}
			<!-- Backdrop -->
			<button
				class="fixed inset-0 z-40 cursor-default bg-transparent"
				onclick={closeMenu}
				aria-label="Close menu"
				tabindex="-1"
			></button>

			<!-- Dropdown menu -->
			<div
				class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700"
				role="menu"
			>
				<div class="border-b border-gray-100 px-4 py-2 dark:border-gray-700">
					<p class="text-sm font-medium text-gray-900 dark:text-white">
						{auth.user?.displayName || 'User'}
					</p>
					<p class="truncate text-xs text-gray-500 dark:text-gray-400">
						{auth.user?.email}
					</p>
				</div>

				<button
					onclick={handleLogout}
					onkeydown={handleMenuKeydown}
					class="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
					role="menuitem"
					tabindex="0"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						></path>
					</svg>
					Sign out
				</button>
			</div>
		{/if}
	</div>
{:else}
	<a
		href="/login"
		class="rounded-lg bg-pink-500 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
		tabindex="0"
		aria-label="Sign in to your account"
	>
		Sign in
	</a>
{/if}
