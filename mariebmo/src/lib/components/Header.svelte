<script lang="ts">
	import { page } from '$app/stores';
	import Logo from './Logo.svelte';
	import DarkModeButton from './buttons/DarkModeButton.svelte';
	import BackButton from './buttons/BackButton.svelte';

	let showBackButton = $derived($page.url.pathname !== '/');
</script>

<nav class="relative flex items-center justify-center px-4 py-4 sm:px-8">
	<div class="absolute left-4 sm:left-8">
		{#if showBackButton}
			<BackButton />
		{/if}
	</div>

	<a href="/" aria-label="Go to homepage">
		<Logo />
	</a>

	<div class="absolute right-4 sm:right-8">
		<DarkModeButton />
	</div>
</nav>
