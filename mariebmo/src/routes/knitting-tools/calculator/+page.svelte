<script lang="ts">
	import { Operation, getFinalDistribution, type ActionGroup } from './evenCalculator';

	import { knittingCalculations } from './knitting.svelte';
	import type { KnittingActions } from './interfaces';
	import KnittingViewTabs from './KnittingViewTabs.svelte';

	// Import constants and utilities
	import { KnitType, KnitSymbol } from './interfaces';
	import {
		validateKnittingInputs,
		calculateKnittingTargetAmount,
		getKnittingSymbol,
		getKnittingActionType,
		createKnittingActionString,
		processActionGroups,
		VALIDATION_MESSAGES
	} from './knittingUtils';

	let current: number | null = $state(null);
	let amount: number | null = $state(null);
	let totalAmountIncluded = $state(false);
	let increaseSelected = $state(true);
	let warning: string | null = $state(null);

	let byOrTo = $derived(totalAmountIncluded ? 'to' : 'by');
	let increaseOrDecrease = $derived(increaseSelected ? 'increase' : 'decrease');

	let hasCalculatedData = $derived(knittingCalculations.actions.length > 0);

	let validationWarning = $derived(
		getValidationWarning(current, amount, increaseSelected, totalAmountIncluded)
	);
	let disableSubmitButton = $derived(validationWarning !== null);

	function getValidationWarning(
		current: number | null,
		amount: number | null,
		increaseSelected: boolean,
		totalAmountIncluded: boolean
	): string | null {
		if (current === null || amount === null) {
			return '';
		}

		if (current <= 0 || amount <= 0) {
			return 'Please enter positive numbers for both fields.';
		}
		if (increaseSelected) {
			let targetAmount = totalAmountIncluded ? amount : amount + current;
			if (targetAmount <= current) {
				return "You can't increase to fewer stitches than you have. Try a larger number.";
			} else if (targetAmount > current * 2) {
				return `You can only increase up to ${current * 2} stitches (double your current amount).`;
			}
		} else {
			let targetAmount = totalAmountIncluded ? amount : current - amount;
			if (targetAmount >= current) {
				return "You can't decrease to more stitches than you started with. Try a smaller number.";
			} else if (targetAmount < current / 2) {
				return `You can only decrease down to ${Math.ceil(current / 2)} stitches (half your current amount).`;
			}
		}

		return null;
	}

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

			const distribution = getFinalDistribution(current ?? 0, targetAmount ?? 0, operation);
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
		return validateKnittingInputs(current ?? 0, amount ?? 0, increaseSelected, totalAmountIncluded);
	}

	function setError(message: string) {
		warning = message;
		knittingCalculations.reset();
	}

	function calculateTargetAmount(): number {
		return calculateKnittingTargetAmount(
			current ?? 0,
			amount ?? 0,
			increaseSelected,
			totalAmountIncluded
		);
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
						{#if hasCalculatedData}
							<!-- Compact Layout -->
							<div class="max-w-4xl mx-auto px-2 sm:px-0">
								<div
									class=" dark:bg-amber-900 rounded-lg p-4 border border-gray-200 dark:border-amber-600"
								>
									<div class="flex flex-col sm:flex-row gap-4 items-end">
										<!-- Starting Stitches -->
										<div class="flex-1 min-w-0">
											<label
												for="current-compact"
												class="text-xs font-semibold text-gray-700 dark:text-amber-200 block mb-1"
											>
												Starting stitches
											</label>
											<input
												id="current-compact"
												class="w-full px-2 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-amber-900 border border-gray-200 dark:border-amber-600 rounded focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-200 placeholder-gray-400 dark:placeholder-amber-300 focus:outline-none text-sm"
												type="number"
												bind:value={current}
												placeholder="12"
											/>
										</div>

										<!-- Action Buttons -->
										<div class="flex flex-row gap-2 w-full sm:w-auto">
											<button
												onclick={toggleIncreaseDecrease}
												class="flex-1 sm:flex-none px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 dark:focus:ring-offset-amber-800 bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 sm:min-w-[100px]"
												aria-pressed={increaseSelected}
											>
												{increaseOrDecrease}
											</button>
											<button
												onclick={toggleByOrTo}
												class="flex-1 sm:flex-none px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 dark:focus:ring-offset-amber-800 bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 sm:min-w-[80px]"
												aria-pressed={!totalAmountIncluded}
											>
												{byOrTo}
											</button>
										</div>

										<!-- Amount Input -->
										<div class="flex-1 min-w-0">
											<label
												for="amount-compact"
												class="text-xs font-semibold text-gray-700 dark:text-amber-200 block mb-1"
											>
												Amount to {increaseOrDecrease}
												{byOrTo}
											</label>
											<input
												id="amount-compact"
												class="w-full px-2 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-amber-900 border border-gray-200 dark:border-amber-600 rounded focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-200 placeholder-gray-400 dark:placeholder-amber-300 focus:outline-none text-sm"
												type="number"
												bind:value={amount}
												placeholder="5"
											/>
										</div>

										<!-- Submit Button -->
										<button
											disabled={disableSubmitButton}
											class="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white font-semibold rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-700 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-600 disabled:shadow-none disabled:hover:shadow-none"
											onclick={submit}
										>
											Calculate
										</button>
									</div>

									<!-- Result Display -->
									<div class="mt-3 text-center">
										<div class="text-sm text-gray-600 dark:text-gray-100 font-semibold">
											{increaseOrDecrease} from {current}
											{byOrTo}
											{amount} = {calculateTargetAmount()} stitches
										</div>
									</div>
								</div>
							</div>
						{:else}
							<!-- Full Layout -->
							<div class="max-w-md mx-auto space-y-4 px-2 sm:px-0">
								<!-- Starting Stitches Input -->
								<div class="space-y-1">
									<label
										for="current"
										class="text-sm font-semibold text-gray-700 dark:text-amber-200"
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
								<div class="flex flex-row gap-3 justify-center w-full">
									<button
										onclick={toggleIncreaseDecrease}
										id="increase-decrease-btn"
										class="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-amber-800 bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 shadow-sm hover:shadow-md sm:min-w-[110px]"
										aria-pressed={increaseSelected}
									>
										{increaseOrDecrease}
									</button>
									<button
										onclick={toggleByOrTo}
										id="by-to-btn"
										class="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-amber-800 bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 shadow-sm hover:shadow-md sm:min-w-[90px]"
										aria-pressed={!totalAmountIncluded}
									>
										{byOrTo}
									</button>
								</div>

								<!-- Amount Input -->
								<div class="space-y-1">
									<label
										for="amount"
										class="text-sm font-semibold text-gray-700 dark:text-amber-200"
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

								{#if hasCalculatedData}
									<div
										class="text-gray-600 dark:text-gray-100 font-semibold italic text-sm mb-4 justify-center flex"
									>
										{increaseOrDecrease} from {current}
										{byOrTo}
										{amount} = {calculateTargetAmount()} stitches.
									</div>
								{/if}

								{#if validationWarning}
									<div
										class="text-red-500 dark:text-red-400 font-semibold italic text-sm mb-4 justify-center flex"
									>
										{validationWarning}
									</div>
								{/if}

								<!-- Submit Button -->
								<button
									disabled={disableSubmitButton}
									class="w-full flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-700 transition-all duration-200 hover:from-amber-600 hover:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-600 disabled:shadow-none disabled:hover:shadow-none disabled:hover:from-gray-400 disabled:hover:to-gray-400 dark:disabled:hover:from-gray-600 dark:disabled:hover:to-gray-600"
									onclick={submit}
								>
									Calculate Pattern
								</button>
							</div>
						{/if}
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
