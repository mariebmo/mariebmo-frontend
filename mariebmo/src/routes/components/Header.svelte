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
		<a href="/knitting">Knitting calculator</a>
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
</style>