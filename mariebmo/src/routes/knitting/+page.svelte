<script lang="ts">
	import { Operation, getFinalDistribution, type ActionGroup } from './evenCalculator';

	import { knittingCalculations } from './knitting.svelte';
	import KnittingActionVisual from './KnittingActionVisual.svelte';
	import KnittingActionShorthand from './KnittingActionShorthand.svelte';
	import KnittingActionFullyWritten from './KnittingActionFullyWritten.svelte';
	import type { KnittingActions } from './interfaces';
	import KnittingActionChecklist from './KnittingActionChecklist.svelte';

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
		<!-- Card -->
		<div class="max-w-2xl mx-auto dark:bg-amber-800 bg-orange-200 shadow-lg rounded-lg">
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
					<!-- SEARCH -->
					<div class="">
						<div
							id="knitting-calculator-search"
							class=" flex flex-col justify-items-center max-w-sm mx-auto"
						>
							<label class="calculator-element" for="current">from</label>

							<input
								id="current"
								class="block text-sm font-medium leading-6 text-gray-900 rounded-lg"
								type="number"
								bind:value={current}
							/>

							<div class="">
								<button
									onclick={toggleIncreaseDecrease}
									id="increase-decrease-btn"
									class="px-3 py-1 my-2 mr-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>{increaseOrDecrease}</button
								>
								<button
									onclick={toggleByOrTo}
									id="by-to-btn"
									class="px-3 py-1 my-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>{byOrTo}</button
								>
							</div>

							<input
								id="amount"
								class="block text-sm font-medium leading-6 text-gray-900 rounded-lg"
								type="number"
								bind:value={amount}
							/>

							<button
								class="px-3 py-1 my-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								onclick={submit}>Submit</button
							>
						</div>
					</div>

					<!-- OUTPUT -->

					<!-- 
					{#if knittingActions != null}
						<div class="mt-5">
							<MovableList />
						</div>
					{/if}
					MOVABLE LIST -->

					<KnittingActionVisual />

					<KnittingActionShorthand />

					<KnittingActionFullyWritten />

					<KnittingActionChecklist />

					{#if warning}
						<p class="text-red-500 dark:text-red-400">{warning}</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
