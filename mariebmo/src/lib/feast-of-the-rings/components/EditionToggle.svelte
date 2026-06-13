<script lang="ts">
	import type { Edition } from '$lib/feast-of-the-rings/types';

	interface Props {
		edition: Edition;
		onchange: (edition: Edition) => void;
	}

	let { edition, onchange }: Props = $props();

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		onchange(target.value as Edition);
	}
</script>

<label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
	<span class="font-medium">Edition</span>
	<select
		value={edition}
		onchange={handleChange}
		class="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
		aria-label="Select edition"
	>
		<option value="extended">Extended</option>
		<option value="theatrical">Theatrical</option>
	</select>
</label>
