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

<section class="flex flex-col antialiased min-h-screen p-4 align-top" id="knitting-container">
	<div class="h-full">
		<!-- Card -->
		<div class="max-w-2xl mx-auto dark:bg-amber-800 bg-orange-200 shadow-lg rounded-lg">
			<div class="px-6 py-5">
				<div class="flex items-start">
					<!-- Icon -->
					<svg
						height="60"
						width="60"
						version="1.1"
						id="Capa_1"
						class="fill-current text-amber-800 dark:text-orange-200 p-1 mr-4 bg-orange-300 dark:bg-amber-700 rounded-full"
						viewBox="0 0 471.112 471.112"
						xml:space="preserve"
						><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						/><g id="SVGRepo_iconCarrier">
							<path
								d="M467.334,321.019l-101.311-40.423c3.239-11.12,4.983-22.87,4.983-35.022c0-69.144-56.252-125.396-125.396-125.396 c-16.448,0-32.164,3.189-46.569,8.972l-37.449-93.737c0.514-0.421,1.01-0.87,1.487-1.346c3.77-3.769,5.846-8.78,5.846-14.11 s-2.076-10.342-5.845-14.111c-3.77-3.769-8.78-5.845-14.11-5.845s-10.342,2.076-14.11,5.845c-3.77,3.769-5.846,8.781-5.846,14.111 s2.076,10.341,5.846,14.11c3.769,3.769,8.78,5.845,14.11,5.845c0.494,0,0.981-0.036,1.468-0.072l37.68,94.316 c-23.068,11.951-41.973,30.857-53.925,53.925L39.84,150.438c0.035-0.486,0.071-0.972,0.071-1.465c0-5.33-2.076-10.341-5.845-14.11 c0,0,0,0-0.001,0c-3.769-3.769-8.779-5.845-14.11-5.845c-5.33,0-10.342,2.076-14.109,5.845C2.076,138.632,0,143.643,0,148.973 s2.076,10.342,5.845,14.111c3.77,3.769,8.78,5.845,14.11,5.845c5.331,0,10.342-2.076,14.11-5.845 c0.478-0.478,0.927-0.976,1.35-1.492l93.773,37.413c-5.783,14.406-8.972,30.121-8.972,46.57 c0,69.144,56.252,125.395,125.396,125.395c12.136,0,23.872-1.739,34.979-4.971l40.431,101.332c0.938,2.349,3.192,3.778,5.575,3.778 c0.74,0,1.492-0.138,2.222-0.429c3.078-1.228,4.577-4.718,3.35-7.796l-40.215-100.792c31.916-12.739,57.41-38.226,70.159-70.136 l100.775,40.209c0.729,0.291,1.481,0.429,2.222,0.429c2.383,0,4.638-1.43,5.575-3.778 C471.911,325.738,470.412,322.247,467.334,321.019z M141.015,19.958c0-2.125,0.828-4.123,2.33-5.625 c1.503-1.502,3.501-2.33,5.626-2.33s4.122,0.828,5.625,2.33c1.502,1.502,2.33,3.5,2.33,5.625s-0.828,4.123-2.331,5.625 c-1.502,1.502-3.499,2.33-5.624,2.33s-4.123-0.827-5.626-2.33C141.843,24.081,141.015,22.083,141.015,19.958z M25.58,154.599 c-1.502,1.502-3.499,2.33-5.625,2.33c-2.125,0-4.122-0.828-5.625-2.33c-1.502-1.502-2.33-3.5-2.33-5.625s0.828-4.123,2.331-5.625 c1.502-1.502,3.5-2.33,5.624-2.33c2.125,0,4.123,0.827,5.625,2.33l0.001,0c1.502,1.502,2.33,3.5,2.33,5.625 S27.083,153.096,25.58,154.599z M303.905,342.804L148.421,187.216c2.776-4.605,5.87-8.996,9.251-13.146l134.193,134.193 c0.578,1.141,1.507,2.07,2.647,2.647l22.604,22.604C312.947,336.911,308.534,340.018,303.905,342.804z M275.207,355.045 L136.142,215.98c1.653-6.107,3.801-12.011,6.405-17.666l150.257,150.358C287.17,351.261,281.289,353.399,275.207,355.045z M245.611,132.18c6.667,0,13.199,0.583,19.553,1.692l-65.36,65.36l-11.252-11.252l55.784-55.784 C244.761,132.191,245.185,132.18,245.611,132.18z M354.695,214.559h-72.84l17-17h49.468 C350.879,203.006,353.022,208.684,354.695,214.559z M356.343,270.029L270.572,270l-15.441-15.441h103.521 C358.237,259.825,357.456,264.988,356.343,270.029z M253.855,242.559l16-16h87.549c0.885,5.223,1.42,10.563,1.562,16H253.855z M240.008,239.436l-11.252-11.252l78.042-78.042c4.52,2.908,8.821,6.129,12.873,9.631L240.008,239.436z M220.271,219.7 l-11.983-11.983l70.563-70.563c5.928,1.821,11.649,4.119,17.122,6.844L220.271,219.7z M180.067,179.495l-14.329-14.329 c16.017-15.911,36.743-27.087,59.879-31.22L180.067,179.495z M282.576,282.004l70.419,0.024c-2.073,6.092-4.65,11.952-7.683,17.531 h-45.182L282.576,282.004z M341.779,185.559h-30.923l17.468-17.468C333.349,173.453,337.86,179.302,341.779,185.559z M135.68,273.423l82.083,82.084C177.571,345.32,145.866,313.615,135.68,273.423z M237.932,358.705l-105.45-105.451 c-0.171-2.539-0.266-5.098-0.266-7.679c0-5.254,0.367-10.423,1.063-15.489l127.823,127.822c-5.066,0.695-10.236,1.063-15.49,1.063 C243.03,358.971,240.47,358.876,237.932,358.705z M326.021,325.449l-13.89-13.89h25.647 C334.23,316.5,330.297,321.145,326.021,325.449z"
							/>
						</g></svg
					>
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
