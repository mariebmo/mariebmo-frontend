<script lang="ts">
	import * as config from '$lib/config';
</script>

<!-- Footer -->
<footer>
	<p>{config.title} &copy {new Date().getFullYear()}</p>
</footer>

<style>
	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2rem;
		color: var(--text-1);
	}
</style>
