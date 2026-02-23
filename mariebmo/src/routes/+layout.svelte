<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import type { Snippet } from 'svelte';
	import '../app.css';

	import { inject } from '@vercel/analytics';
	import { auth } from '$lib/auth';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	interface Props {
		children?: Snippet<[Record<string, unknown>]>;
	}

	let { children }: Props = $props();

	/** When true, bookclub is served as a standalone app (no main site header/footer). */
	const isBookclub = $derived($page.url.pathname.startsWith('/bookclub'));

	inject();

	// Initialize auth store on mount (client-side only)
	onMount(() => {
		if (browser) {
			auth.initialize();
		}
	});
</script>

<div class="flex flex-col h-screen">
	{#if isBookclub}
		<main class="flex-grow">
			{@render children?.({ class: 'h-full' })}
		</main>
	{:else}
		<Header />
		<main class="flex-grow">
			{@render children?.({ class: 'h-full' })}
		</main>
		<Footer />
	{/if}
</div>
