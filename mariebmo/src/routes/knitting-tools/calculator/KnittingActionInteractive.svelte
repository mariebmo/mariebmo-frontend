<script lang="ts">
	import { knittingCalculations } from './knitting.svelte';
	import { onMount, onDestroy } from 'svelte';

	let currentActionIndex = $state(0);
	let currentRepetitionIndex = $state(0);
	let isInFullscreen = $state(false);

	// Flatten all repetitions from all actions for global progression
	let allRepetitions = $derived(() => {
		const repetitions: Array<{
			actionIndex: number;
			repetitionIndex: number;
			action: string;
			isDone: boolean;
		}> = [];
		knittingCalculations.actions.forEach((action, actionIndex) => {
			if (action.count > 1) {
				action.actions.forEach((_, repetitionIndex) => {
					repetitions.push({
						actionIndex,
						repetitionIndex,
						action: action.actions.join(', '),
						isDone: false // We'll track this separately
					});
				});
			} else {
				repetitions.push({
					actionIndex,
					repetitionIndex: 0,
					action: action.actions.join(', '),
					isDone: false
				});
			}
		});
		return repetitions;
	});

	let currentRepetition = $derived(() => {
		if (currentActionIndex >= knittingCalculations.actions.length) {
			return null;
		}

		const action = knittingCalculations.actions[currentActionIndex];
		if (!action) return null;

		if (action.count > 1) {
			// For multi-repetition actions, show the current repetition being worked on
			const completedCount = action.completedRepetitions || 0;
			return {
				action: action.actions.join(', '),
				repetitionIndex: completedCount, // Show the next repetition to complete
				totalRepetitions: action.count,
				actionIndex: currentActionIndex
			};
		} else {
			return {
				action: action.actions.join(', '),
				repetitionIndex: 0,
				totalRepetitions: 1,
				actionIndex: currentActionIndex
			};
		}
	});

	let hasIncompleteRepetitions = $derived(() => {
		return knittingCalculations.actions.some((action) => {
			if (action.count > 1) {
				// For multi-repetition actions, check if any repetition is incomplete
				const completedCount = action.completedRepetitions || 0;
				return completedCount < action.count;
			} else {
				// For single actions, check if the action itself is incomplete
				return !action.isDone;
			}
		});
	});

	// Progress calculations
	let totalActions = $derived(knittingCalculations.actions.length);
	let completedActions = $derived(knittingCalculations.actions.filter((a) => a.isDone).length);
	let actionProgress = $derived(totalActions > 0 ? (completedActions / totalActions) * 100 : 0);

	// Current action repetition tracking
	let currentActionRepetitions = $derived(() => {
		if (currentActionIndex >= knittingCalculations.actions.length)
			return { total: 0, completed: 0 };
		const action = knittingCalculations.actions[currentActionIndex];
		if (!action) return { total: 0, completed: 0 };
		return {
			total: action.count,
			completed: action.completedRepetitions || 0
		};
	});
	let currentRepetitionProgress = $derived(() => {
		const reps = currentActionRepetitions();
		return reps.total > 0 ? (reps.completed / reps.total) * 100 : 0;
	});

	function completeNextRepetition() {
		const repetition = currentRepetition();
		if (!repetition) return;

		const action = knittingCalculations.actions[repetition.actionIndex];
		if (!action) return;

		if (action.count > 1) {
			// Track individual repetitions
			action.completedRepetitions = (action.completedRepetitions || 0) + 1;
			currentRepetitionIndex++;

			// Move to next action if all repetitions of current action are done
			if (currentRepetitionIndex >= action.count) {
				action.isDone = true;
				currentActionIndex++;
				currentRepetitionIndex = 0;
			}
		} else {
			// Single action - mark as done and move to next
			action.isDone = true;
			action.completedRepetitions = 1;
			currentActionIndex++;
			currentRepetitionIndex = 0;
		}
	}

	function handleInteractiveKeyDown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			completeNextRepetition();
		}
	}

	function handleFullscreenClick(event: MouseEvent) {
		// Check if the click target is a button or inside a button
		const target = event.target as HTMLElement;
		if (target.closest('button')) {
			return; // Don't complete if clicking on a button
		}
		completeNextRepetition();
	}

	function checkFullscreenMode() {
		// Check if we're inside a fullscreen container
		const fullscreenContainer = document.querySelector('.fixed.inset-0.z-50');
		isInFullscreen = !!fullscreenContainer;
	}

	function resetProgress() {
		// Reset all actions
		knittingCalculations.actions.forEach((action) => {
			action.isDone = false;
			action.completedRepetitions = 0;
		});
		currentActionIndex = 0;
		currentRepetitionIndex = 0;
	}

	function undoLastAction() {
		// Find the last completed action
		for (let i = knittingCalculations.actions.length - 1; i >= 0; i--) {
			const action = knittingCalculations.actions[i];
			if (action.isDone || (action.completedRepetitions && action.completedRepetitions > 0)) {
				if (action.count > 1) {
					// For multi-repetition actions, undo one repetition
					if (action.completedRepetitions && action.completedRepetitions > 0) {
						action.completedRepetitions--;
						if (action.completedRepetitions === 0) {
							action.isDone = false;
						}
						// Update current position
						currentActionIndex = i;
						currentRepetitionIndex = action.completedRepetitions || 0;
						return;
					}
				} else {
					// For single actions, undo the entire action
					action.isDone = false;
					action.completedRepetitions = 0;
					currentActionIndex = i;
					currentRepetitionIndex = 0;
					return;
				}
			}
		}
	}

	// Global keyboard listener for interactive mode
	onMount(() => {
		document.addEventListener('keydown', handleInteractiveKeyDown);

		// Check fullscreen mode initially and periodically
		checkFullscreenMode();
		const interval = setInterval(checkFullscreenMode, 100);

		return () => {
			clearInterval(interval);
		};
	});

	onDestroy(() => {
		document.removeEventListener('keydown', handleInteractiveKeyDown);
	});
</script>

<div
	class="p-4 sm:p-6 {isInFullscreen ? 'cursor-pointer min-h-screen' : ''}"
	onclick={isInFullscreen ? handleFullscreenClick : undefined}
	onkeydown={isInFullscreen ? handleInteractiveKeyDown : undefined}
	role="button"
	tabindex={isInFullscreen ? 0 : -1}
	aria-label={isInFullscreen
		? 'Click anywhere to complete current knitting step'
		: 'Interactive knitting pattern'}
>
	{#if knittingCalculations.actions.length === 0}
		<div class="text-center py-8">
			<div class="text-gray-500 dark:text-gray-400 mb-4">
				<span class="material-symbols-outlined text-4xl">calculate</span>
			</div>
			<p class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
				No pattern calculated yet
			</p>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Enter your knitting parameters above to generate a pattern
			</p>
		</div>
	{:else if hasIncompleteRepetitions() && currentRepetition()}
		<!-- Interactive Mode Display -->
		<div class="max-w-md mx-auto">
			<div class="text-center mb-6">
				<div class="mb-4">
					<span
						class="text-sm font-medium text-green-700 dark:text-green-300 uppercase tracking-wide"
					>
						Interactive Mode
					</span>
				</div>

				<!-- Clickable Content Area -->
				<div
					class="bg-white dark:bg-green-900 rounded-lg p-6 mb-4 border border-green-200 dark:border-green-700 cursor-pointer hover:bg-green-50 dark:hover:bg-green-800 transition-colors duration-200"
					onclick={(e) => {
						e.stopPropagation();
						completeNextRepetition();
					}}
					tabindex="0"
					role="button"
					aria-label="Complete current repetition"
					onkeydown={(e) => {
						e.stopPropagation();
						handleInteractiveKeyDown(e);
					}}
				>
					<div class="text-xl font-semibold text-gray-900 dark:text-green-100 mb-3">
						{currentRepetition()?.action}
					</div>
					<div class="text-sm text-green-600 dark:text-green-400 mb-2">
						Action {currentActionIndex + 1} of {knittingCalculations.actions.length}
					</div>
					{#if currentRepetition()?.totalRepetitions && currentRepetition()!.totalRepetitions > 1}
						<div class="text-sm text-green-600 dark:text-green-400">
							Repetition {currentRepetition()!.repetitionIndex + 1} of {currentRepetition()!
								.totalRepetitions}
						</div>
					{/if}
					<div class="mt-3 text-xs text-green-600 dark:text-green-400">
						{isInFullscreen
							? 'Click anywhere on screen or press Space to complete'
							: 'Click anywhere or press Space to complete'}
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="flex gap-2 mb-4">
					<button
						class="flex-1 bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-700 transition-all duration-200 touch-manipulation cursor-pointer"
						onclick={undoLastAction}
						tabindex="0"
						aria-label="Undo last action"
					>
						<span class="material-symbols-outlined mr-2">undo</span>
						Undo
					</button>
					<button
						class="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all duration-200 touch-manipulation cursor-pointer"
						onclick={resetProgress}
						tabindex="0"
						aria-label="Reset all progress"
					>
						<span class="material-symbols-outlined mr-2">refresh</span>
						Reset
					</button>
				</div>
			</div>

			<!-- Progress Overview -->
			<div
				class="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-4 border border-green-200 dark:border-green-700"
			>
				<div class="text-center">
					<div class="text-sm font-medium text-green-700 dark:text-green-300 mb-4">
						Progress Overview
					</div>

					<!-- Repetitions Progress -->
					<div class="mb-4">
						<div class="text-sm text-gray-700 dark:text-gray-300 mb-2">
							Current Action: {currentActionRepetitions().completed} of {currentActionRepetitions()
								.total} repetitions
						</div>
						<div class="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3">
							<div
								class="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
								style="width: {currentRepetitionProgress()}%"
							></div>
						</div>
					</div>

					<!-- Actions Progress -->
					<div class="mb-2">
						<div class="text-sm text-gray-700 dark:text-gray-300 mb-2">
							Actions: {completedActions} of {totalActions} complete
						</div>
						<div class="w-full bg-green-200 dark:bg-green-800 rounded-full h-3">
							<div
								class="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
								style="width: {actionProgress}%"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<!-- All Complete -->
		<div class="max-w-md mx-auto text-center">
			<div class="mb-6">
				<span
					class="text-sm font-medium text-green-700 dark:text-green-300 uppercase tracking-wide"
				>
					All Complete! 🎉
				</span>
			</div>

			<div
				class="bg-white dark:bg-green-900 rounded-lg p-6 mb-4 border border-green-200 dark:border-green-700"
			>
				<div class="text-xl font-semibold text-gray-900 dark:text-green-100 mb-2">
					Pattern Complete!
				</div>
				<div class="text-sm text-green-600 dark:text-green-400">
					All {knittingCalculations.actions.length} actions completed
				</div>
			</div>

			<button
				class="w-full bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-700 transition-all duration-200 touch-manipulation cursor-pointer"
				onclick={resetProgress}
				tabindex="0"
				aria-label="Start over"
			>
				<span class="material-symbols-outlined mr-2">refresh</span>
				Start Over
			</button>
		</div>
	{/if}
</div>
