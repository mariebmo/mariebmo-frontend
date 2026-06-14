<script lang="ts">
	import { feastTheme } from '$lib/feast-of-the-rings/theme';

	interface Props {
		headcount: number;
		onChange: (headcount: number) => void;
	}

	let { headcount, onChange }: Props = $props();

	function decrement() {
		onChange(Math.max(1, headcount - 1));
	}

	function increment() {
		onChange(headcount + 1);
	}

	function handleInput(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		const parsed = Number.parseInt(target.value, 10);
		if (Number.isNaN(parsed)) return;
		onChange(Math.max(1, parsed));
	}
</script>

<div
	class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
	aria-labelledby="headcount-label"
>
	<div>
		<h2 id="headcount-label" class="text-lg font-semibold text-gray-900 dark:text-white">
			Headcount
		</h2>
		<p class="text-sm text-gray-600 dark:text-gray-400">
			Ingredient amounts scale from each dish's base servings.
		</p>
	</div>

	<div class="flex items-center gap-2" role="group" aria-label="Adjust headcount">
		<button
			type="button"
			class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-40 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
			aria-label="Decrease headcount"
			disabled={headcount <= 1}
			onclick={decrement}
		>
			−
		</button>
		<input
			type="number"
			min="1"
			inputmode="numeric"
			class="h-10 w-16 rounded-lg border border-gray-300 bg-white text-center text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
			value={headcount}
			aria-label="Number of people eating"
			onchange={handleInput}
		/>
		<button
			type="button"
			class="flex h-10 w-10 items-center justify-center rounded-lg {feastTheme.watch.solid} text-lg font-medium transition-colors"
			aria-label="Increase headcount"
			onclick={increment}
		>
			+
		</button>
	</div>
</div>
