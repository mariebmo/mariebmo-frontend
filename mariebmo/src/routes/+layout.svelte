<script lang="ts">
	import '../app.css';
	import Header from '../lib/components/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';
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
