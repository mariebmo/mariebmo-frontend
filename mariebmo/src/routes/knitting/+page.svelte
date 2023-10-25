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


	let current: number = 12;
	let amount: number = 4;
	let totalAmountIncluded = false;
	let increaseSelected = true;
	$: byOrTo = totalAmountIncluded ? 'to' : 'by';
	$: increaseOrDecrease = increaseSelected ? 'increase' : 'decrease';
	let visualizationOutput = '';
	let knittingLingoOutput = '';

	function toggleByOrTo() {
		totalAmountIncluded = !totalAmountIncluded;
	}

	function toggleIncreaseDecrease() {
		increaseSelected = !increaseSelected;
	}

	function handleStitches(action: KnitAction, ratio: number, totalStitches: number) {

		console.log(ratio)

		visualizationOutput = '';
		knittingLingoOutput = '';

		//handle edge case
		if((action == KnitAction.INCREASE && ratio < 1) || (action == KnitAction.DECREASE && ratio < 0)){
			visualizationOutput = 'This calculator can only handle k2tog or m1 - this is not possible with the given inputs.';
			return;
		}

		let nextIncrease = ratio;
		const symbol = action == KnitAction.INCREASE ? KnitSymbol.INCREASE : KnitSymbol.DECREASE;

		let increaseCount = 0;
		let knitCount = 0;
		let isCurrentKnit = true;

		for (var i = 0; i < totalStitches; i++) {
			if (nextIncrease <= 0) {
				visualizationOutput += symbol;

				if (isCurrentKnit) {
					var knitCountOutput = knitCount > 1 ? knitCount : '';
					knittingLingoOutput += KnitAction.KNIT + knitCountOutput + ' ' + action  + ' ';
					isCurrentKnit = false;
					knitCount = 0;
				}

				increaseCount++;
				nextIncrease += ratio;
			} else {
				if (!isCurrentKnit) {
					isCurrentKnit = true;
				}

				knitCount++;
				nextIncrease--;
				visualizationOutput += KnitSymbol.KNIT;
			}
		}

			visualizationOutput += ' ';
	}

	function increase() {
		const increaseAmount = totalAmountIncluded ? amount - current : amount;
		const increaseRatio = current / increaseAmount;
		handleStitches(KnitAction.INCREASE, increaseRatio, current + increaseAmount);
	}

	function decrease() {
		const decreaseAmount = totalAmountIncluded ? current - amount : amount;
		const decreaseRatio = (current - decreaseAmount) / decreaseAmount - 1;

		handleStitches(KnitAction.DECREASE, decreaseRatio, current - decreaseAmount);
	}

	function submit() {
		if (increaseSelected) {
			increase();
		} else {
			decrease();
		}
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