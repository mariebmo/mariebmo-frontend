<script lang="ts">
	var current = 12;
	var amount = 8;
	var totalAmountIncluded = false;
	$: byOrTo = totalAmountIncluded ? 'to' : 'by';
	var visualizationOutput = '';
	var knittingLingoOutput = '';

	function toggleByOrTo() {
		totalAmountIncluded = !totalAmountIncluded;
		byOrTo = totalAmountIncluded ? 'to' : 'by';
	}

	function increase() {
		var increaseAmount = totalAmountIncluded ? amount - current : amount;

		visualizationOutput = '';
		knittingLingoOutput = '';

		//add increases evenly distributed
		var increaseRatio = current / increaseAmount;
		var increaseRemainder = increaseAmount;

		var nextIncrease = increaseRatio;

		var increaseCount = 0;
		var knitCount = 0;
		var isCurrentKnit = true;

		console.log(increaseRatio);
		for (var i = 0; i < current + increaseAmount; i++) {
			if (nextIncrease <= 0 && increaseRemainder > 0) {
				visualizationOutput += '+';

				if (isCurrentKnit) {
					var knitCountOutput = knitCount > 0 ? knitCount : '';
					knittingLingoOutput += 'k' + knitCountOutput + ' ';
					isCurrentKnit = false;
					knitCount = 0;
				}

				increaseCount++;
				nextIncrease += increaseRatio;
				increaseRemainder--;
			} else {
				if (!isCurrentKnit) {
					var knitCountOutput = increaseCount > 0 ? increaseCount : '';
					knittingLingoOutput += 'inc' + increaseCount + ' ';
					isCurrentKnit = true;
					increaseCount = 0;
				}

				knitCount++;
				nextIncrease--;
				visualizationOutput += '-';
			}

			visualizationOutput += ' ';
		}
	}

	function decrease() {
		// should display an even distribution of the decrease, ex
		// --x---x--x---x

		var decreaseAmount = totalAmountIncluded ? current - amount : amount;
	}
</script>

<div>
	<label for="current">from</label>
	<input id="current" class="input-number" type="number" bind:value={current} />

	<button on:click={toggleByOrTo}>{byOrTo}</button>

	<input id="amount" class="input-number" type="number" bind:value={amount} />

	<div>
		<button on:click={increase}>Increase</button>
		<button on:click={decrease}>Decrease</button>
	</div>

	<div>
		<p class="increase-output">
			{visualizationOutput}
			<br />
			{knittingLingoOutput}
		</p>
	</div>
</div>

<style>
	.increase-output {
		font-family: monospace;
	}

	.input-number {
		width: 3rem;
	}
</style>
