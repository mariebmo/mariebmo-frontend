<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import type { Snippet } from 'svelte';
	import '../app.css';

	import { inject } from '@vercel/analytics';

	interface Props {
		children?: Snippet<[any]>;
	}

	let { children }: Props = $props();

	inject();
</script>

<div class="flex flex-col h-screen">
	<!-- Header -->
	<Header />

	<main class="flex-grow">
		{@render children?.({ class: 'h-full' })}
	</main>

	<!-- Footer -->
	<Footer />
</div>
