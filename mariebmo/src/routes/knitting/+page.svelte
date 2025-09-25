<script lang="ts">
	import {
		Operation,
		type KnittingActions,
		type KnittingAction,
		getFinalDistribution,
		type ActionGroup
	} from './evenCalculator';

	import MovableList from './MovableList.svelte';
	import { knittingCalculations } from './knitting.svelte';

	$inspect(knittingCalculations);

	// Knitting-specific constants
	const KnitSymbol = {
		KNIT: '-',
		INCREASE: '+',
		DECREASE: '↓'
	} as const;

	const KnitType = {
		KNIT: 'k',
		INCREASE: 'm',
		DECREASE: 'k2tog'
	} as const;

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
		// Validate inputs
		if (current <= 0 || amount <= 0) {
			warning = 'Please enter valid positive numbers for current and amount.';
			knittingCalculations.reset();
			knittingCalculations.actions = [];
			return;
		}

		// Check for impossible scenarios
		if (!increaseSelected && totalAmountIncluded && amount >= current) {
			warning = 'Cannot decrease to a number greater than or equal to current stitches.';
			knittingCalculations.reset();
			knittingCalculations.actions = [];
			return;
		}

		if (increaseSelected && totalAmountIncluded && amount <= current) {
			warning = 'Cannot increase to a number less than or equal to current stitches.';
			knittingCalculations.reset();
			knittingCalculations.actions = [];
			return;
		}

		// Calculate knitting actions using the generic calculator
		const operation = increaseSelected ? Operation.ADD : Operation.REMOVE;
		let targetAmount: number;

		if (totalAmountIncluded) {
			targetAmount = amount;
		} else {
			targetAmount = increaseSelected ? current + amount : current - amount;
		}

		const distribution = getFinalDistribution(current, targetAmount, operation);
		const result = processDistribution(distribution, increaseSelected);

		if (distribution) {
			warning = null;
			knittingCalculations.visualize = result.visualize;
			knittingCalculations.fullWritten = result.fullWritten;
			knittingCalculations.actions = result.actions;
		} else {
			warning = 'Unable to calculate even distribution for the given inputs.';
			knittingCalculations.reset();
		}
	}

	function processDistribution(
		distribution: Array<{ group: ActionGroup[]; count: number }>,
		isIncrease: boolean
	): KnittingActions {
		let visualizationOutput = '';
		let knittingLingoOutput = '';
		let actions: string[] = [];

		const symbol = isIncrease ? KnitSymbol.INCREASE : KnitSymbol.DECREASE;
		const actionType = isIncrease ? KnitType.INCREASE : KnitType.DECREASE;

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
							const knitCountOutput = count > 1 ? count : '';
							const knitActionOutput = KnitType.KNIT + knitCountOutput;
							groupActions.push(knitActionOutput);
							groupVisualization += KnitSymbol.KNIT.repeat(count) + ' ';
						} else if (actionNum === 1) {
							// Increases
							const increaseAction = actionType;
							groupActions.push(increaseAction);
							groupVisualization += symbol.repeat(count) + ' ';
						} else if (actionNum === -1) {
							// Decreases
							const decreaseAction = actionType;
							groupActions.push(decreaseAction);
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

		const knittingAction = getKnittingAction(actions);

		return {
			actions: knittingAction,
			visualize: visualizationOutput.trim(),
			fullWritten: knittingLingoOutput
		};
	}

	function getKnittingAction(actions: string[]): KnittingAction[] {
		// Convert the processed actions back to KnittingAction format
		return actions.map((action) => ({
			actions: [action],
			count: 1
		}));
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

					{#if warning}
						<p class="text-red-500 dark:text-red-400">{warning}</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
