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
		const targetEl = event.target as HTMLElement;
		if (targetEl.closest('button') || targetEl.closest('input')) {
			return; // Don't increment if clicking on buttons or inputs
		}
		increment();
	}

	function handleCounterKeyDown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			const targetEl = event.target as HTMLElement;
			if (targetEl.closest('button') || targetEl.closest('input')) {
				return;
			}
			event.preventDefault();
			increment();
		}
	}

	// Global keyboard listener
	onMount(() => {
		document.addEventListener('keydown', handleGlobalKeyDown);
	});

	onDestroy(() => {
		document.removeEventListener('keydown', handleGlobalKeyDown);
	});
</script>

<section class="flex flex-col antialiased p-4 align-top h-full" id="row-counter-container">
	<div class="h-full">
		<div
			class="max-w-2xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mx-2 sm:mx-auto w-full cursor-pointer"
			onclick={handleCounterClick}
			onkeydown={handleCounterKeyDown}
			role="button"
			tabindex="0"
			aria-label="Click anywhere to increment counter"
		>
			<div class="px-6 py-5">
				<!-- Header -->
				<div>
					<h1
						class="text-2xl leading-snug font-extrabold dark:text-gray-50 text-gray-900 truncate mb-1 sm:mb-0"
					>
						Row Counter
					</h1>
					<p class="max-w-md text-amber-950 dark:text-amber-100" id="info-text-counter">
						Tap to count your knitting rows.
					</p>
					<!-- Divider -->
					<div class="border-t border-amber-800 dark:border-amber-100 my-4"></div>
				</div>

				<!-- Main Counter (white box with outline on gray card) -->
				<div class="mt-4">
					<div
						class="rounded-lg p-6 border border-gray-200 dark:border-amber-600 bg-white dark:bg-amber-900 mb-6 text-center"
					>
						<div class="text-8xl font-light text-gray-900 dark:text-white select-none">
							{count}
						</div>

						{#if hasTarget}
							<div class="text-lg text-gray-600 dark:text-amber-200 mt-2">
								Target: {target}
							</div>
							<div class="w-full bg-gray-200 dark:bg-amber-800 rounded-full h-2 mt-3">
								<div
									class="bg-amber-500 dark:bg-amber-600 h-2 rounded-full transition-all duration-300"
									style="width: {Math.min((count / target) * 100, 100)}%"
								></div>
							</div>
						{/if}

						{#if isCompleted}
							<div
								class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-700 rounded-lg p-4 mt-4"
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

					<!-- Set Target -->
					<div
						class="rounded-lg p-4 border border-gray-200 dark:border-amber-600 bg-white dark:bg-amber-900 mb-4"
					>
						<label
							for="target-input"
							class="text-sm font-semibold text-gray-700 dark:text-amber-200 block mb-2"
							>Set Target</label
						>
						<div class="flex gap-2">
							<input
								id="target-input"
								type="number"
								class="flex-1 px-3 py-2 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-amber-950 border-2 border-gray-200 dark:border-amber-600 rounded-lg focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 focus:outline-none placeholder-gray-400"
								placeholder="Enter target rows"
								bind:value={target}
								min="1"
							/>
							<button
								class="px-4 py-2 bg-amber-500 dark:bg-amber-600 text-white rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-pointer"
								onclick={setTarget}
							>
								Set
							</button>
						</div>
						{#if hasTarget}
							<button
								class="text-sm text-gray-600 dark:text-amber-300 hover:text-gray-800 dark:hover:text-amber-100 transition-colors duration-200 cursor-pointer mt-2"
								onclick={clearTarget}
							>
								Clear target
							</button>
						{/if}
					</div>

					<!-- Action Buttons (non-gradient, matching calculator) -->
					<div class="flex gap-3">
						<button
							class="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-pointer"
							onclick={reset}
						>
							Reset Counter
						</button>
						<button
							class="flex-1 px-4 py-2.5 bg-amber-500 dark:bg-amber-600 text-white rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-pointer"
							onclick={increment}
						>
							+1 Row
						</button>
					</div>
				</div>

				<!-- Instructions -->
				<div class="text-center mt-6 text-sm text-gray-500 dark:text-amber-200">
					<p>Click anywhere or press Space to count</p>
				</div>
			</div>
		</div>
	</div>
</section>
