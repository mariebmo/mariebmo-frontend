<script lang="typescript">
	import { browser } from '$app/environment';

	var isDarkMode = false;
	var icon = isDarkMode ? 'ic:round-light-mode' : 'ic:round-dark-mode';

	if (browser) {
		const storedPreference =
			localStorage.getItem('dark-mode') || window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';

		if (storedPreference === 'dark') {
			isDarkMode = true;
		}

		toggle();
	}

	function toggle() {
		document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
		isDarkMode = !isDarkMode;

		//refresh icon
		icon = isDarkMode ? 'ic:round-light-mode' : 'ic:round-dark-mode';
	}
</script>

<button id="theme-toggle-btn" on:click={toggle}>
	<iconify-icon id="theme-toggle-icon" {icon} />
</button>

<style>
	#theme-toggle-btn {
		width: 2rem;
		height: 2rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		margin: 0;
		color: var(--background);
	}

	#theme-toggle-icon {
		font-size: 2rem;
	}
</style>
