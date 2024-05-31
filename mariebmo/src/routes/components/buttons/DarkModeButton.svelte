<script lang="typescript">
	import { browser } from '$app/environment';

	var isDarkMode = false;
	var icon = isDarkMode ? 'ic:round-light-mode' : 'ic:round-dark-mode';

	if (browser) {
		if (
			localStorage.getItem('color-theme') === 'dark' ||
			(!('color-theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('color-theme', 'dark');

			isDarkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('color-theme', 'light');

			isDarkMode = false;
		}

		toggle();
	}

	function toggle() {
		if (localStorage.getItem('color-theme')) {
			if (localStorage.getItem('color-theme') === 'light') {
				document.documentElement.classList.add('dark');
				localStorage.setItem('color-theme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('color-theme', 'light');
			}
		} else {
			if (document.documentElement.classList.contains('dark')) {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('color-theme', 'light');
			} else {
				document.documentElement.classList.add('dark');
				localStorage.setItem('color-theme', 'dark');
			}
		}

		isDarkMode = !isDarkMode;

		//refresh icon
		icon = isDarkMode ? 'ic:round-light-mode' : 'ic:round-dark-mode';
	}
</script>

<button id="theme-toggle-btn" on:click={toggle}>
	<iconify-icon id="theme-toggle-icon" {icon} width="16" />
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
		color: var(--text-1);
	}

	#theme-toggle-icon {
		font-size: 2rem;
	}
</style>
