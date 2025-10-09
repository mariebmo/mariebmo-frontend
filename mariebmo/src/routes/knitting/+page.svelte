<script lang="ts">
	import { Operation, getFinalDistribution, type ActionGroup } from './evenCalculator';

	import { knittingCalculations } from './knitting.svelte';
	import type { KnittingActions } from './interfaces';
	import KnittingViewTabs from './KnittingViewTabs.svelte';

	$inspect(knittingCalculations);

	// Import constants and utilities
	import { KnitType, KnitSymbol } from './interfaces';
	import {
		validateKnittingInputs,
		calculateKnittingTargetAmount,
		actionToKnitType,
		getKnittingSymbol,
		getKnittingActionType,
		createKnittingActionString,
		processActionGroups,
		VALIDATION_MESSAGES
	} from './knittingUtils';

	let current = $state(0);
	let amount = $state(0);
	let totalAmountIncluded = $state(false);
	let increaseSelected = $state(true);
	let warning: string | null = $state(null);

	let byOrTo = $derived(totalAmountIncluded ? 'to' : 'by');
	let increaseOrDecrease = $derived(increaseSelected ? 'increase' : 'decrease');

	let knittingActions: KnittingActions | null = $derived(knittingCalculations);

	function toggleByOrTo() {
		totalAmountIncluded = !totalAmountIncluded;
	}

	function toggleIncreaseDecrease() {
		increaseSelected = !increaseSelected;
	}

	function submit() {
		const validationError = validateInputs();
		if (validationError) {
			setError(validationError);
			return;
		}

		try {
			const operation = increaseSelected ? Operation.ADD : Operation.REMOVE;
			const targetAmount = calculateTargetAmount();

			const distribution = getFinalDistribution(current, targetAmount, operation);
			const result = processDistribution(distribution, increaseSelected);

			if (distribution) {
				warning = null;
				knittingCalculations.visualize = result.visualize;
				knittingCalculations.fullWritten = result.fullWritten;
				knittingCalculations.actions = result.actions;
			} else {
				setError(VALIDATION_MESSAGES.CALCULATION_ERROR);
			}
		} catch (error) {
			setError(VALIDATION_MESSAGES.GENERAL_ERROR);
			console.error('Calculation error:', error);
		}
	}

	function validateInputs(): string | null {
		return validateKnittingInputs(current, amount, increaseSelected, totalAmountIncluded);
	}

	function setError(message: string) {
		warning = message;
		knittingCalculations.reset();
	}

	function calculateTargetAmount(): number {
		return calculateKnittingTargetAmount(current, amount, increaseSelected, totalAmountIncluded);
	}

	function processDistribution(
		distribution: Array<{ group: ActionGroup[]; count: number }>,
		isIncrease: boolean
	): KnittingActions {
		let visualizationOutput = '';
		let knittingLingoOutput = '';
		let actions: string[] = [];

		const symbol = getKnittingSymbol(isIncrease);
		const actionType = getKnittingActionType(isIncrease);

		// Process each combined group
		for (const combinedGroup of distribution) {
			const { group: patternGroups, count: patternCount } = combinedGroup;

			// Repeat the pattern for the specified count
			for (let patternIndex = 0; patternIndex < patternCount; patternIndex++) {
				for (const group of patternGroups) {
					let groupActions: string[] = [];
					let groupVisualization = '';

					// Process each action type in the group
					for (const [actionTypeStr, count] of Object.entries(group)) {
						const actionNum = parseInt(actionTypeStr);

						if (actionNum === 0) {
							// Regular knit stitches
							const knitActionOutput = createKnittingActionString(KnitType.KNIT, count);
							groupActions.push(knitActionOutput);
							groupVisualization += KnitSymbol.KNIT.repeat(count) + ' ';
						} else if (actionNum === 1 || actionNum === -1) {
							// Increases or decreases
							groupActions.push(actionType);
							groupVisualization += symbol.repeat(count) + ' ';
						}
					}

					// Add group to outputs
					if (groupActions.length > 0) {
						actions.push(...groupActions);
						knittingLingoOutput += groupActions.join(', ') + ', ';
						visualizationOutput += groupVisualization;
					}
				}
			}
		}

		// Clean up trailing comma
		if (knittingLingoOutput.endsWith(', ')) {
			knittingLingoOutput = knittingLingoOutput.slice(0, -2);
		}

		const knittingAction = processActionGroups(distribution);

		return {
			actions: knittingAction,
			visualize: visualizationOutput.trim(),
			fullWritten: knittingLingoOutput
		};
	}
</script>

<section class="flex flex-col antialiased p-4 align-top" id="knitting-container">
	<div class="h-full">
		<!-- Enhanced Card -->
		<div class="max-w-2xl rounded-2xl border overflow-hidden mx-2 sm:mx-auto">
			<div class="px-6 py-5">
				<!--HEADER AREA -->
				<div>
					<div class="flex flex-row items-start">
						<!-- Icon -->
						<div
							class=" h-10 w-10 fill-current text-amber-800 dark:text-orange-200 p-1 mr-4 bg-orange-300 dark:bg-amber-700 rounded-full"
						>
							<span class="material-symbols-outlined">favorite</span>
						</div>
						<!-- Card content -->
						<div id="knitting-calculator-content" class="w-full">
							<h1
								class="text-2xl leading-snug font-extrabold dark:text-gray-50 text-gray-900 truncate mb-1 sm:mb-0"
							>
								Knitting Calculator
							</h1>

							<p class="max-w-md dark:text-amber-100 text-amber-950" id="info-text-knitting">
								The calculator is used for even increases or decreases in knitting.
							</p>
						</div>
					</div>

					<!-- Divider -->
					<div class="border-t border-amber-800 dark:border-amber-100 my-4"></div>
				</div>

				<!-- CONTENT -->
				<div>
					<!-- ENHANCED INPUT SECTION -->
					<div class="mt-4">
						<div class="max-w-md mx-auto space-y-4 px-2 sm:px-0">
							<!-- Starting Stitches Input -->
							<div class="space-y-1">
								<label for="current" class="text-sm font-semibold text-gray-700 dark:text-amber-200"
									>Starting stitches</label
								>
								<input
									id="current"
									class="w-full px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-amber-900 border-2 border-gray-200 dark:border-amber-600 rounded-lg focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-200 placeholder-gray-400 dark:placeholder-amber-300 focus:outline-none focus:shadow-md text-base sm:text-sm"
									type="number"
									bind:value={current}
									placeholder="12"
								/>
							</div>

							<!-- Action Buttons -->
							<div class="flex justify-center">
								<div
									class="flex gap-2 p-1 bg-white dark:bg-amber-900 rounded-xl border border-gray-200 dark:border-amber-600 flex-col sm:flex-row"
								>
									<button
										onclick={toggleIncreaseDecrease}
										id="increase-decrease-btn"
										class="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-amber-800 {increaseSelected
											? 'bg-amber-500 dark:bg-amber-600 text-white shadow-md'
											: 'text-gray-600 dark:text-amber-300 hover:text-gray-800 dark:hover:text-amber-100 hover:bg-gray-50 dark:hover:bg-amber-800'}"
										aria-pressed={increaseSelected}
									>
										{increaseOrDecrease}
									</button>
									<button
										onclick={toggleByOrTo}
										id="by-to-btn"
										class="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-amber-800 {!totalAmountIncluded
											? 'bg-amber-500 dark:bg-amber-600 text-white shadow-md'
											: 'text-gray-600 dark:text-amber-300 hover:text-gray-800 dark:hover:text-amber-100 hover:bg-gray-50 dark:hover:bg-amber-800'}"
										aria-pressed={!totalAmountIncluded}
									>
										{byOrTo}
									</button>
								</div>
							</div>

							<!-- Amount Input -->
							<div class="space-y-1">
								<label for="amount" class="text-sm font-semibold text-gray-700 dark:text-amber-200"
									>Amount to {increaseOrDecrease} {byOrTo}</label
								>
								<input
									id="amount"
									class="w-full px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-amber-900 border-2 border-gray-200 dark:border-amber-600 rounded-lg focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-200 placeholder-gray-400 dark:placeholder-amber-300 focus:outline-none focus:shadow-md text-base sm:text-sm"
									type="number"
									bind:value={amount}
									placeholder="5"
								/>
							</div>

							<div
								class="text-gray-600 dark:text-gray-100 font-semibold italic text-sm mb-4 justify-center flex"
							>
								{increaseOrDecrease} from {current}
								{byOrTo}
								{amount} -> {calculateTargetAmount()}.
							</div>

							<!-- Submit Button -->
							<button
								class="w-full flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-700 transition-all duration-200 hover:from-amber-600 hover:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700"
								onclick={submit}
							>
								Calculate Pattern
							</button>
						</div>
					</div>

					<!-- OUTPUT -->
					<KnittingViewTabs />

					{#if warning}
						<p class="text-red-500 dark:text-red-400 mt-4">{warning}</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
