<script lang="ts">
	import { KnitSymbol, KnitType, type KnittingAction, type KnittingActions } from './interfaces';
	import { knittingActionsStore } from '../../lib/stores/knittingActionStore';

	import MovableList from './MovableList.svelte';

	const MAX_ITERATIONS = 500;

	let current: number;
	let amount: number;
	let totalAmountIncluded = false;
	let increaseSelected = true;

	$: byOrTo = totalAmountIncluded ? 'to' : 'by';
	$: increaseOrDecrease = increaseSelected ? 'increase' : 'decrease';

	let actions: string[] = [];
	let knittingActions: KnittingActions | null = null;

	function toggleByOrTo() {
		totalAmountIncluded = !totalAmountIncluded;
	}

	function toggleIncreaseDecrease() {
		increaseSelected = !increaseSelected;
	}

	function calculateStichIncDec(
		action: KnitType,
		ratio: number,
		totalStitches: number,
		incDecAmount: number
	) {
		let visualizationOutput = ''; // --+---+--+---+
		let knittingLingoOutput = ''; // k2, m, k3, m, k2, m, k3, m

		if ((action == KnitType.INCREASE && ratio < 1) || (action == KnitType.DECREASE && ratio < 0)) {
			visualizationOutput =
				'This calculator can only handle k2tog or m1 - this is not possible with the given inputs.';
			return;
		}

		let nextIncrease = ratio;
		const symbol = action == KnitType.INCREASE ? KnitType.INCREASE : KnitType.DECREASE;

		let knitCount = 0;

		for (var i = 0; i < totalStitches; i++) {
			switch (nextIncrease <= 0) {
				case true:
					visualizationOutput += symbol + ' ';
					var knitCountOutput = knitCount > 1 ? knitCount : '';
					var knitActionOutput = knitCount > 0 ? KnitType.KNIT + knitCountOutput + ', ' : '';
					knittingLingoOutput += knitActionOutput + action + ', ';

					actions.push(knitActionOutput + action);

					knitCount = 0;
					nextIncrease += ratio;
					incDecAmount--;
					break;
				case false:
					knitCount++;
					nextIncrease--;
					visualizationOutput += KnitSymbol.KNIT + ' ';
					break;
			}
		}

		if (incDecAmount == 1) {
			visualizationOutput += symbol;
			var knitCountOutput = knitCount > 1 ? knitCount : '';
			var knitActionOutput = knitCount > 0 ? KnitType.KNIT + knitCountOutput + ', ' : '';
			knittingLingoOutput += knitActionOutput + action;
			actions.push(knitActionOutput + action);
		} else if (incDecAmount > 1 || incDecAmount < 0) {
			visualizationOutput =
				"Hmm. There's something wrong with the calculation. There is a remainder of " +
				incDecAmount +
				' stitches.';
			knitActionOutput = '';
		} else {
			knittingLingoOutput = knittingLingoOutput.slice(0, -2);
		}

		const knittingAction = getKnittingAction();

		knittingActions = {
			actions: knittingAction,
			visualize: visualizationOutput,
			fullWritten: knittingLingoOutput
		};

		knittingActionsStore.set(knittingActions);
	}

	function increase() {
		const increaseAmount = totalAmountIncluded ? amount - current : amount;
		const increaseRatio = current / increaseAmount;
		calculateStichIncDec(
			KnitType.INCREASE,
			increaseRatio,
			current + increaseAmount,
			increaseAmount
		);
	}

	function decrease() {
		const decreaseAmount = totalAmountIncluded ? current - amount : amount;
		const decreaseRatio = (current - decreaseAmount) / decreaseAmount - 1;

		calculateStichIncDec(
			KnitType.DECREASE,
			decreaseRatio,
			current - decreaseAmount,
			decreaseAmount
		);
	}

	function getKnittingAction(): KnittingAction[] {
		let knittingAction: KnittingAction[] = [];
		let lookAhead = 3;

		let index = 0;
		let outerMaxIterations = MAX_ITERATIONS;

		while (index < actions.length && outerMaxIterations-- > 0) {
			let currentAction = actions[index];
			let lookAheadIndex = 1;

			let possibleMatches: KnittingAction[] = [];

			let hasAMatch = false;

			let lastAction = knittingAction[knittingAction.length - 1];

			if (lastAction?.actions != null) {
				if (
					actions.slice(index, index + lastAction.actions.length).join('') ==
					lastAction.actions.join('')
				) {
					lastAction.count++;
					index += lastAction.actions.length;
					hasAMatch = true;
				}
			}

			let lookAheadMaxIterations = MAX_ITERATIONS;
			while (
				lookAheadIndex <= lookAhead &&
				index + lookAheadIndex < actions.length &&
				lookAheadMaxIterations-- > 0
			) {
				if (
					actions.slice(index, index + lookAheadIndex).join('') ==
					actions.slice(index + lookAheadIndex, index + lookAheadIndex * 2).join('')
				) {
					possibleMatches.push({
						actions: actions.slice(index, index + lookAheadIndex),
						count: 2
					});
				}

				lookAheadIndex++;
			}

			if (possibleMatches.length > 1) {
				let bestMatch = possibleMatches.find(
					(match) =>
						match.actions.length ==
						Math.max(...possibleMatches.map((match) => match.actions.length))
				);

				if (bestMatch != null) {
					//see if best match consists of same actions
					let bestMatchSet = new Set(bestMatch.actions);
					if (bestMatchSet.size == 1) {
						knittingAction.push({
							actions: [bestMatch.actions[0]],
							count: bestMatch.actions.length * 2
						});

						index += bestMatch.actions.length * 2;
						hasAMatch = true;
					} else {
						knittingAction.push(bestMatch);
						index += bestMatch.actions.length * 2;
						hasAMatch = true;
					}
				}
			} else if (possibleMatches.length == 1) {
				knittingAction.push(possibleMatches[0]);
				index += possibleMatches[0].actions.length * 2;
				hasAMatch = true;
			}

			if (!hasAMatch) {
				knittingAction.push({
					actions: [currentAction],
					count: 1
				});

				index++;
			}
		}

		return makeSmaller(knittingAction);
	}

	function makeSmaller(knittingAction: KnittingAction[]): KnittingAction[] {
		let newKnittingAction: KnittingAction[] = [];

		let previousAction = knittingAction[0].actions.join('');
		let previousActionIndex = 0;

		for (let i = 1; i < knittingAction.length; i++) {
			let currentAction = knittingAction[i].actions.join('');

			if (previousAction == currentAction) {
				knittingAction[previousActionIndex].count += knittingAction[i].count;
				knittingAction[i].count = 0;
			} else {
				previousAction = currentAction;
				previousActionIndex = i;
			}
		}

		newKnittingAction = knittingAction.filter((action) => action.count > 0);

		return newKnittingAction;
	}

	function submit() {
		if (increaseSelected) {
			increase();
		} else {
			decrease();
		}

		actions = [];
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
							<iconify-icon width="30" icon="carbon:user-favorite" />
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
					<div class="border-t border-amber-800 dark:border-amber-100 my-4" />
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
									on:click={toggleIncreaseDecrease}
									id="increase-decrease-btn"
									class="px-3 py-1 my-2 mr-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>{increaseOrDecrease}</button
								>
								<button
									on:click={toggleByOrTo}
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
								on:click={submit}>Submit</button
							>
						</div>
					</div>

					<!-- OUTPUT -->
					{#if knittingActions != null}
						<div class="mt-5">
							<MovableList />
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
