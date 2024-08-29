<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';

	import { inject } from '@vercel/analytics';

	inject();
</script>

<div class="layout">
	<!-- Header -->
	<Header />

	<main>
		<div class="min-h-screen">
			<slot class="align-top" />
		</div>
	</main>

	<!-- Footer -->
	<Footer />
</div>
