<script lang="typescript">
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import 'iconify-icon';
</script>

<div class="layout">
	<!-- Header -->
	<Header />

	<main>
		<div class="centered top-padding full-height">
			<slot class="full-height" />
		</div>
	</main>

	<!-- Footer -->
	<Footer />
</div>

<style>
	@import '../../static/global.scss';

	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}

	.centered {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.top-padding {
		padding-top: 5rem;
	}

	.full-height {
		height: 100%;
	}
</style>
