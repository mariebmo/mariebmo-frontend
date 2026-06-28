<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';

	let email = $state('');
	let password = $state('');
	let rememberMe = $state(false);
	let isSubmitting = $state(false);

	const canSubmit = $derived(email.length > 0 && password.length >= 8 && !isSubmitting);
	const redirectTo = $derived($page.url.searchParams.get('redirect'));

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!canSubmit) return;

		isSubmitting = true;

		const success = await auth.login({
			email,
			password,
			rememberMe
		});

		isSubmitting = false;

		if (success) {
			const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/';
			goto(target);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && canSubmit) {
			handleSubmit(event as unknown as SubmitEvent);
		}
	}
</script>

<svelte:head>
	<title>Login | Marie Blichfeldt Mo</title>
</svelte:head>

<div class="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-8">
	<div class="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
		<h1 class="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>

		{#if auth.error}
			<div
				class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
				role="alert"
			>
				{auth.error}
			</div>
		{/if}

		<form onsubmit={handleSubmit} class="space-y-5">
			<div>
				<label for="email" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
					Email
				</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					onkeydown={handleKeydown}
					autocomplete="email"
					required
					class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-pink-400"
					placeholder="you@example.com"
				/>
			</div>

			<div>
				<label
					for="password"
					class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>
					Password
				</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					onkeydown={handleKeydown}
					autocomplete="current-password"
					required
					minlength={8}
					class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-pink-400"
					placeholder="••••••••"
				/>
				<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Minimum 8 characters</p>
			</div>

			<div class="flex items-center">
				<input
					type="checkbox"
					id="rememberMe"
					bind:checked={rememberMe}
					class="h-4 w-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700"
				/>
				<label for="rememberMe" class="ml-2 text-sm text-gray-600 dark:text-gray-400">
					Remember me
				</label>
			</div>

			<button
				type="submit"
				disabled={!canSubmit}
				class="w-full rounded-lg bg-pink-500 px-4 py-3 font-semibold text-white transition-all hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-800"
			>
				{#if isSubmitting}
					<span class="inline-flex items-center gap-2">
						<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
							></path>
						</svg>
						Signing in...
					</span>
				{:else}
					Sign in
				{/if}
			</button>
		</form>

		<p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
			Don't have an account?
			<a
				href="/register"
				class="font-medium text-pink-500 transition-colors hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300"
				tabindex="0"
				aria-label="Go to registration page"
			>
				Create one
			</a>
		</p>
	</div>
</div>
