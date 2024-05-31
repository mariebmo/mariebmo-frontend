<script lang="ts">
	import '../app.css';
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import 'iconify-icon';
</script>

<div class="layout">
	<!-- Header -->
	<Header />

	<main>
		<div class="">
			<slot class="align-top" />
		</div>
	</main>

	<!-- Footer -->
	<Footer />
</div>
