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

<div class="layout">
	<!-- Header -->
	<Header />

	<main>
		<div class="min-h-screen">
			{@render children?.({ class: 'align-top' })}
		</div>
	</main>

	<!-- Footer -->
	<Footer />
</div>
