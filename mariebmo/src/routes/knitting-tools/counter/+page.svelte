<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let count = $state(0);
	let target = $state(0);
	let hasTarget = $state(false);
	let isCompleted = $derived(hasTarget && count >= target && target > 0);

	function increment() {
		count++;
	}

	function reset() {
		count = 0;
	}

	function setTarget() {
		if (target > 0) {
			hasTarget = true;
		} else {
			hasTarget = false;
		}
	}

	function clearTarget() {
		hasTarget = false;
		target = 0;
	}

	function handleGlobalKeyDown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			increment();
		}
	}

	function handleCounterClick(event: MouseEvent) {
		// Check if the click target is a button or input
		const target = event.target as HTMLElement;
		if (target.closest('button') || target.closest('input')) {
			return; // Don't increment if clicking on buttons or inputs
		}
		increment();
	}

	// Global keyboard listener
	onMount(() => {
		document.addEventListener('keydown', handleGlobalKeyDown);
	});

	onDestroy(() => {
		document.removeEventListener('keydown', handleGlobalKeyDown);
	});
</script>

<div
	class="h-full bg-white dark:bg-gray-900 flex items-center justify-center p-4 cursor-pointer"
	onclick={handleCounterClick}
	onkeydown={handleGlobalKeyDown}
	role="button"
	tabindex="0"
	aria-label="Click anywhere to increment counter"
>
	<div class="max-w-md w-full">
		<!-- Header -->
		<div class="text-center mb-8">
			<h1 class="text-3xl font-light text-gray-900 dark:text-white mb-2">Row Counter</h1>
			<p class="text-gray-600 dark:text-gray-400">Tap to count your knitting rows</p>
		</div>

		<!-- Main Counter -->
		<div class="text-center mb-8">
			<div class="text-8xl font-light text-gray-900 dark:text-white mb-4 select-none">
				{count}
			</div>

			{#if hasTarget}
				<div class="text-lg text-gray-600 dark:text-gray-400 mb-2">
					Target: {target}
				</div>
				<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
					<div
						class="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-300"
						style="width: {Math.min((count / target) * 100, 100)}%"
					></div>
				</div>
			{/if}

			{#if isCompleted}
				<div
					class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-4"
				>
					<div class="text-green-800 dark:text-green-200 font-semibold text-lg">
						🎉 You're done! 🎉
					</div>
					<p class="text-green-600 dark:text-green-400 text-sm mt-1">
						Great job completing {target} rows!
					</p>
				</div>
			{/if}
		</div>

		<!-- Controls -->
		<div class="space-y-4">
			<!-- Target Setting -->
			<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
				<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Set Target</h3>
				<div class="flex gap-2 mb-3">
					<input
						type="number"
						class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
						placeholder="Enter target rows"
						bind:value={target}
						min="1"
					/>
					<button
						class="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-medium cursor-pointer"
						onclick={setTarget}
					>
						Set
					</button>
				</div>
				{#if hasTarget}
					<button
						class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 cursor-pointer"
						onclick={clearTarget}
					>
						Clear target
					</button>
				{/if}
			</div>

			<!-- Action Buttons -->
			<div class="flex gap-3">
				<button
					class="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium cursor-pointer"
					onclick={reset}
				>
					Reset Counter
				</button>
				<button
					class="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-medium cursor-pointer"
					onclick={increment}
				>
					+1 Row
				</button>
			</div>
		</div>

		<!-- Instructions -->
		<div class="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
			<p>Click anywhere or press Space to count</p>
		</div>
	</div>
</div>
