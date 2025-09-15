<script lang="ts">
<<<<<<< Updated upstream
=======
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import type { Snippet } from 'svelte';
>>>>>>> Stashed changes
	import '../app.css';
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';

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
