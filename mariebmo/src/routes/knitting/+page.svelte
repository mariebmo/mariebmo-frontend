<script lang="ts">
	var current = 12;
	var amount = 4;
	var totalAmountIncluded = false;
	var increaseSelected = false;
	$: byOrTo = totalAmountIncluded ? 'to' : 'by';
	$: increaseOrDecrease = increaseSelected ? 'increase' : 'decrease';
	var visualizationOutput = '';
	var knittingLingoOutput = '';

	function toggleByOrTo() {
		totalAmountIncluded = !totalAmountIncluded;
	}

	function toggleIncreaseDecrease() {
		increaseSelected = !increaseSelected;
	}

	function increase() {
		var increaseAmount = totalAmountIncluded ? amount - current : amount;

		if (totalAmountIncluded && current > amount) {
			visualizationOutput =
				"You can't increase from " +
				current +
				' to ' +
				amount +
				' stitches, silly! Did you mean to decrease or increase by ' +
				amount +
				' stitches?';
			knittingLingoOutput = '';
			return;
		}

		if (
			(totalAmountIncluded && amount - current > current) ||
			(!totalAmountIncluded && amount > current)
		) {
			visualizationOutput =
				"This calculator doesn't support increasing by more than the current amount of stitches.";
			knittingLingoOutput = '';
			return;
		}

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
					var knitCountOutput = knitCount > 1 ? knitCount : '';
					knittingLingoOutput += 'k' + knitCountOutput + ' ';
					isCurrentKnit = false;
					knitCount = 0;
				}

				increaseCount++;
				nextIncrease += increaseRatio;
				increaseRemainder--;
			} else {
				if (!isCurrentKnit) {
					var increaseCountOutput = increaseCount > 1 ? increaseCount : '';
					knittingLingoOutput += 'inc' + increaseCountOutput + ' ';
					isCurrentKnit = true;
					increaseCount = 0;
				}

				knitCount++;
				nextIncrease--;
				visualizationOutput += '-';
			}

			visualizationOutput += ' ';
		}

		if (increaseCount > 0) {
			var knitCountOutput = increaseCount > 1 ? increaseCount : '';
			knittingLingoOutput += 'inc' + knitCountOutput + ' ';
		}

		if (knitCount > 0) {
			var knitCountOutput = knitCount > 1 ? knitCount : '';
			knittingLingoOutput += 'k' + knitCountOutput + ' ';
		}
	}

	function decrease() {
		// should display an even distribution of the decrease, ex
		// --x---x--x---x

		var decreaseAmount = totalAmountIncluded ? current - amount : amount;

        if (totalAmountIncluded && current < amount) {
            visualizationOutput =
                "You can't decrease from " +
                current +
                ' to ' +
                amount +
                ' stitches, silly! Did you mean to decrease or increase by ' +
                amount +
                ' stitches?';
            knittingLingoOutput = '';
            return;
        }

        if(
            (totalAmountIncluded && current - amount > current) ||
            (!totalAmountIncluded && amount > current)
        ) {
            visualizationOutput =
                "This calculator doesn't support decreasing by more than half the current amount of stitches.";
            knittingLingoOutput = '';
            return;
        }

        visualizationOutput = '';
        knittingLingoOutput = '';

        //add decreases evenly distributed
        var finalRemainingStitches = current - decreaseAmount;
        var decreaseRatio = (finalRemainingStitches / decreaseAmount)-1;
        var decreaseRemainder = decreaseAmount;

        var nextDecrease = decreaseRatio;

        var decreaseCount = 0;
        var knitCount = 0;
        var isCurrentKnit = true;

        console.log(decreaseRatio);

        for(var i = 0; i < finalRemainingStitches; i++){
            if(nextDecrease <= 0 && decreaseRemainder > 0){
                visualizationOutput += 'x';

                if(isCurrentKnit){
                    var knitCountOutput = knitCount > 1 ? knitCount : '';
                    knittingLingoOutput += 'k' + knitCountOutput + ' ';
                    isCurrentKnit = false;
                    knitCount = 0;
                }

                decreaseCount++;
                nextDecrease += decreaseRatio;
                decreaseRemainder--;
            } else {

                if(!isCurrentKnit){
                    var decreaseCountOutput = decreaseCount > 1 ? decreaseCount : '';
                    knittingLingoOutput += 'dec' + decreaseCountOutput + ' ';
                    isCurrentKnit = true;
                    decreaseCount = 0;
                }

                knitCount++;
                nextDecrease--;
                visualizationOutput += '-';
            }

            visualizationOutput += ' ';
        }

        if(decreaseCount > 0){
            var knitCountOutput = decreaseCount > 1 ? decreaseCount : '';
            knittingLingoOutput += 'dec' + knitCountOutput + ' ';
        }

        if(knitCount > 0){
            var knitCountOutput = knitCount > 1 ? knitCount : '';
            knittingLingoOutput += 'k' + knitCountOutput + ' ';
        }
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
	}

	#knitting-calculator-content {
		align-items: center;
		display: flex;
		flex-direction: column;
		width: 100%;
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

	.calculator-element {
		margin: 0 0 0 0.5rem;
	}
</style>
