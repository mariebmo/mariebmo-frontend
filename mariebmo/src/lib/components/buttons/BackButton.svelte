<script lang="ts">
	import { goto } from '$app/navigation';

	interface Props {
		href?: string;
		label?: string;
	}

	let { href, label = 'Back' }: Props = $props();

	function handleClick() {
		if (href) {
			goto(href);
		} else {
			window.history.back();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<button
	onclick={handleClick}
	onkeydown={handleKeydown}
	class="group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
	aria-label={label}
	tabindex="0"
>
	<span class="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
		arrow_back
	</span>
	<span class="font-medium">{label}</span>
</button>
