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

	let current: number = 13;
	let amount: number = 5;
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
					visualizationOutput += symbol;
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
					visualizationOutput += KnitSymbol.KNIT;
					break;
			}
		}

		if (incDecAmount == 1) {
			visualizationOutput += symbol;
			var knitCountOutput = knitCount > 1 ? knitCount : '';
			var knitActionOutput = knitCount > 0 ? KnitAction.KNIT + knitCountOutput + ', ' : '';
			knittingLingoOutput += knitActionOutput + action;
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
		debugger;
		let combinedActions: Action[] = [];
		let lookAhead = 3;

		let index = 0;
		let maxIterations = 100;

		console.log(actions);

		while (index < actions.length && maxIterations-- > 0) {
			let currentAction = actions[index];
			let lookAheadIndex = 1;
			let a: string[] = [];
			let b: string[] = [];

			let hasAMatch = false;

			while (lookAheadIndex <= lookAhead && index + lookAheadIndex < actions.length) {

				let lastAction = combinedActions[combinedActions.length - 1]

				if (lastAction?.actions != null) {
					let c = [];
					for (let i = 0; i < lastAction.actions.length; i++) {
						c.push(actions[index + i]);
					}

					if (c.join('') == lastAction.actions.join('')) {
						lastAction.count++;

						index += lastAction.actions.length;

						hasAMatch = true;
						break;
					}
				}

				if(!hasAMatch){
					//Adds the compared actions to the array
					for (let i = 0; i < lookAheadIndex; i++) {
						b.push(actions[index + i + lookAheadIndex]);
					}

					for (let i = 0; i < lookAheadIndex; i++) {
						a.push(actions[index + i]);
					}

					//Checks if the compared actions are equal
					if (a.join('') == b.join('') && !hasAMatch) {
						hasAMatch = true;
						combinedActions.push({
							actions: a,
							count: 2
						});

						index += lookAheadIndex*2;
						break;
					} else {
						lookAheadIndex++;
					}
				}	
			}

			if (!hasAMatch) {
				combinedActions.push({
					actions: [currentAction],
					count: 1
				});

				index++;
			}

			hasAMatch = false;
		}

		console.log(combinedActions);
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

<div id="knitting-page">
	<div id="knitting-calculator-content">
		<h1>Knitting Calculator</h1>

		<p class="info-text" id="info-text-knitting">
			The calculator is used for even increases or decreases in knitting.
		</p>

		<div id="knitting-calculator-search">
			<label class="calculator-element" for="current">from</label>
			<input
				id="current"
				class="input-number calculator-element"
				type="number"
				bind:value={current}
			/>

			<button
				on:click={toggleIncreaseDecrease}
				id="increase-decrease-btn"
				class="calculator-element">{increaseOrDecrease}</button
			>
			<button on:click={toggleByOrTo} id="by-to-btn" class="calculator-element">{byOrTo}</button>

			<input
				id="amount"
				class="input-number calculator-element"
				type="number"
				bind:value={amount}
			/>

			<button class="calculator-element" on:click={submit}>Search</button>
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

<style>
	.increase-output {
		margin-top: 1rem;
		font-family: monospace;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.input-number {
		width: 3rem;
	}

	#knitting-page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#knitting-calculator-content {
		align-items: center;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		max-width: 600px;
	}

	#knitting-calculator-search {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	#increase-decrease-btn {
		min-width: 75px;
	}

	#by-to-btn {
		min-width: 30px;
	}

	#info-text-knitting {
		max-width: 600px;
		text-align: center;
		position: relative;
		bottom: 0;
	}

	.calculator-element {
		margin: 0 0 0 0.5rem;
	}
</style>
