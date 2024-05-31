<script lang="typescript">
	import "../app.css";
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import 'iconify-icon';
</script>

<div class="layout">
	<!-- Header -->
	<Header />

	<main>
		<div class="left-padding top-padding full-height">
			<slot class="full-height" />
		</div>
	</main>

	<!-- Footer -->
	<Footer />
</div>

<style>

	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}

	.left-padding {
		padding-left: 2rem;
	}

	.top-padding {
		padding-top: 1rem;
	}

	.full-height {
		height: 100%;
	}
</style>
