<script lang="ts">
	import * as config from '$lib/config'
	import Knitting from '../knitting/+page.svelte';
	import Logo from './Logo.svelte'
	import DarkModeButton from './DarkModeButton.svelte';
</script>

<nav class="nav-bar">
	
	<a href="/" class="title">
		<Logo />
	</a>

	<div class="links">
		<a class='header-link' href="/knitting">knitting</a>
		<DarkModeButton />
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