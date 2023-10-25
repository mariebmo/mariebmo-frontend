<script lang="ts">
	import Logo from './Logo.svelte';
	import DarkModeButton from './DarkModeButton.svelte';

	export let title = 'Marie B. Mo';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<nav class="nav-bar">
	<a href="/" class="title">
		<Logo />
	</a>

	<h1>{title}</h1>

	<div class="links">
		<a class="header-link" href="/knitting">knitting</a>
		<DarkModeButton />
	</div>
</nav>

<style>
	.nav-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background-color: var(--brand);
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

	.header-link {
		color: var(--text-1);
		text-decoration: none;
		padding: 0 1rem;
	}
</style>
