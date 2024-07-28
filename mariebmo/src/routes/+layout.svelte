<script lang="ts">
	import '../app.css';
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import 'iconify-icon';
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
