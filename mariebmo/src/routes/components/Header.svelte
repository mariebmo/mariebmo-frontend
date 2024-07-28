<script lang="ts">
	import Logo from './Logo.svelte';
	import DarkModeButton from './buttons/DarkModeButton.svelte';
</script>

<nav class="nav-bar">
	<a href="/" class="mx-auto">
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

	.links {
		display: flex;
		align-items: center;
		vertical-align: middle;
	}
</style>
