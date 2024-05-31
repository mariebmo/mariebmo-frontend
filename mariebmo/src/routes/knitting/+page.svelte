<script lang="ts">
	enum KnitAction {
		KNIT = 'k',
		INCREASE = 'm',
		DECREASE = 'k2tog'
	}

	enum KnitSymbol {
		KNIT = '-',
		INCREASE = '+',
		DECREASE = 'x'
	}

	interface Action {
		actions: string[];
		count: number;
	}

	const MAX_ITERATIONS = 500;

	let current: number;
	let amount: number;
	let totalAmountIncluded = false;
	let increaseSelected = true;

	$: byOrTo = totalAmountIncluded ? 'to' : 'by';
	$: increaseOrDecrease = increaseSelected ? 'increase' : 'decrease';

	let visualizationOutput = '';
	let knittingLingoOutput = '';
	let shorthandOutput = '';

	let actions: string[] = [];

	function toggleByOrTo() {
		totalAmountIncluded = !totalAmountIncluded;
	}

	function toggleIncreaseDecrease() {
		increaseSelected = !increaseSelected;
	}

	function handleStitches(
		action: KnitAction,
		ratio: number,
		totalStitches: number,
		incDecAmount: number
	) {
		visualizationOutput = '';
		knittingLingoOutput = '';

		if (
			(action == KnitAction.INCREASE && ratio < 1) ||
			(action == KnitAction.DECREASE && ratio < 0)
		) {
			visualizationOutput =
				'This calculator can only handle k2tog or m1 - this is not possible with the given inputs.';
			return;
		}

		let nextIncrease = ratio;
		const symbol = action == KnitAction.INCREASE ? KnitSymbol.INCREASE : KnitSymbol.DECREASE;

		let knitCount = 0;

		for (var i = 0; i < totalStitches; i++) {
			switch (nextIncrease <= 0) {
				case true:
					visualizationOutput += symbol + ' ';
					var knitCountOutput = knitCount > 1 ? knitCount : '';
					var knitActionOutput = knitCount > 0 ? KnitAction.KNIT + knitCountOutput + ', ' : '';
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
			var knitActionOutput = knitCount > 0 ? KnitAction.KNIT + knitCountOutput + ', ' : '';
			knittingLingoOutput += knitActionOutput + action;
			actions.push(knitActionOutput + action);
		} else if (incDecAmount > 1) {
			visualizationOutput =
				"Hmm. There's something wrong with the calculation. There is a remainder of " +
				incDecAmount +
				' stitches.';
			knitActionOutput = '';
		} else {
			knittingLingoOutput = knittingLingoOutput.slice(0, -2);
		}
	}

	function increase() {
		const increaseAmount = totalAmountIncluded ? amount - current : amount;
		const increaseRatio = current / increaseAmount;
		handleStitches(KnitAction.INCREASE, increaseRatio, current + increaseAmount, increaseAmount);
	}

	function decrease() {
		const decreaseAmount = totalAmountIncluded ? current - amount : amount;
		const decreaseRatio = (current - decreaseAmount) / decreaseAmount - 1;

		handleStitches(KnitAction.DECREASE, decreaseRatio, current - decreaseAmount, decreaseAmount);
	}

	function makeShorthand() {
		let combinedActions: Action[] = [];
		let lookAhead = 3;

		let index = 0;
		let outerMaxIterations = MAX_ITERATIONS;

		while (index < actions.length && outerMaxIterations-- > 0) {
			let currentAction = actions[index];
			let lookAheadIndex = 1;

			let possibleMatches: Action[] = [];

			let hasAMatch = false;

			let lastAction = combinedActions[combinedActions.length - 1];

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
						combinedActions.push({
							actions: [bestMatch.actions[0]],
							count: bestMatch.actions.length * 2
						});

						index += bestMatch.actions.length * 2;
						hasAMatch = true;
					} else {
						combinedActions.push(bestMatch);
						index += bestMatch.actions.length * 2;
						hasAMatch = true;
					}
				}
			} else if (possibleMatches.length == 1) {
				combinedActions.push(possibleMatches[0]);
				index += possibleMatches[0].actions.length * 2;
				hasAMatch = true;
			}

			if (!hasAMatch) {
				combinedActions.push({
					actions: [currentAction],
					count: 1
				});

				index++;
			}
		}

		shorthandOutput = printShorthand(combinedActions);
		shorthandOutput = shorthandOutput.slice(0, -2);
	}

	function printShorthand(actionArr: Action[]): string {
		let output = '';

		for (let i = 0; i < actionArr.length; i++) {
			let action = actionArr[i];

			if (action.count > 1) {
				output += '(' + action.actions.join(', ') + ') ' + action.count + 'times, ';
			} else {
				output += action.actions.join('') + ', ';
			}
		}

		return output;
	}

	function submit() {
		if (increaseSelected) {
			increase();
		} else {
			decrease();
		}

		makeShorthand();
		actions = [];
	}
</script>

<section class="flex flex-col antialiased p-4 align-top" id="knitting-container">
	<div class="h-full">
		<!-- Card -->
		<div class="max-w-2xl mx-auto dark:bg-amber-800 bg-orange-200 shadow-lg rounded-lg">
			<div class="px-6 py-5">
				<div class="flex items-start">
					<!-- Icon -->
					<div
						class="fill-current text-amber-800 dark:text-orange-200 p-1 mr-4 bg-orange-300 dark:bg-amber-700 rounded-full"
					>
						<iconify-icon width="30" icon="carbon:user-favorite" />
					</div>
					<!-- Card content -->
					<div id="knitting-calculator-content">
						<h1
							class="text-2xl leading-snug font-extrabold dark:text-gray-50 text-gray-900 truncate mb-1 sm:mb-0"
						>
							Knitting Calculator
						</h1>

						<p class="max-w-md dark:text-amber-100 text-amber-950" id="info-text-knitting">
							The calculator is used for even increases or decreases in knitting.
						</p>

						<!-- Divider -->
						<div class="border-t border-amber-950 dark:border-amber-100 my-4" />

						<div id="knitting-calculator-search">
							<label class="calculator-element" for="current">from</label>
							<input
								id="current"
								class="block text-sm font-medium leading-6 text-gray-900 rounded-lg"
								type="number"
								bind:value={current}
							/>

							<button
								on:click={toggleIncreaseDecrease}
								id="increase-decrease-btn"
								class="px-3 py-1 my-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>{increaseOrDecrease}</button
							>
							<button
								on:click={toggleByOrTo}
								id="by-to-btn"
								class="px-3 py-1 my-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>{byOrTo}</button
							>

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

						<div>
							<div class="increase-output">
								<p>{visualizationOutput}</p>
								<p>{knittingLingoOutput}</p>
								<p>{shorthandOutput}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
