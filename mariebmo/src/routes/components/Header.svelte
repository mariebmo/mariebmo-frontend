<script lang="ts">
	import * as config from '$lib/config'
</script>

<nav class="nav-bar">
  <!-- Title -->
	<a href="/" class="title">
		<b>{config.title}</b>
	</a>

  <!-- Navigation -->
	<ul class="links">
		<li>
			<a href="/about">About</a>
		</li>
		<li>
			<a href="/contact">Contact</a>
		</li>
		<li>
			<a href="/rss.xml" target="_blank">RSS</a>
		</li>
	</ul>

  <!-- Theme -->
  <button>Toggle</button>
</nav>

<style>
	.nav-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background-color: var(--secondary-color);
	}
</style>