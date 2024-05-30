<script lang="ts">
	import Logo from './Logo.svelte';
	import DarkModeButton from './DarkModeButton.svelte';
</script>

<nav class="nav-bar">

	<a href="/" class="title">
		<Logo />
	</a>

	<div class="links">
		<DarkModeButton />
	</div>
</nav>

<style>
	.nav-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
	}

	.title {
		display: flex;
		align-items: center;
	}

	.links {
		display: flex;
		align-items: center;
		vertical-align: middle;
	}
</style>
