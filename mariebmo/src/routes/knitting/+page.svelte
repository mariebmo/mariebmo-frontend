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
		action: string;
		count: number;
	}

	let current: number = 12;
	let amount: number = 7;
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
		visualizationOutput = '';
		knittingLingoOutput = '';

		//handle edge case
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
		let actions: Action[] = [];

		for (var i = 0; i < totalStitches; i++) {
			if (nextIncrease <= 0) {
				visualizationOutput += symbol;
				var knitCountOutput = knitCount > 1 ? knitCount : '';
				var knitActionOutput = knitCount > 0 ? KnitAction.KNIT + knitCountOutput + ', ' : '';
				knittingLingoOutput += knitActionOutput + action + ', ';

				//Logging actions
				var currentAction = knitActionOutput + action;
				var actionIndex = actions.findIndex((a) => a.action == currentAction);

				if (actionIndex == -1 || actions.length - 1 > actionIndex) {
					actions.push({ action: currentAction, count: 1 });
				} else {
					actions[actionIndex].count++;
				}

				knitCount = 0;
				nextIncrease += ratio;
			} else {
				knitCount++;
				nextIncrease--;
				visualizationOutput += KnitSymbol.KNIT;
			}
		}

		visualizationOutput += ' ';
		handleActions(actions);
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

	function handleActions(actions: Action[]) {
		console.log(actions);
		//Combine actions that are the same, if they are next to each other
		var previousTwoActions = ['', ''];
		var combinedActions: Action[] = [];
		let hasPreviousBeenAdded = true;

		var output = '';

		if (actions == null || actions.length == 0) {
			return;
		}

		if (actions.length == 1) {
			combinedActions.push({ action: actions[0].action, count: actions[0].count });

			if (actions[0].count > 1) {
				output += '(' + actions[0].action + ') ' + actions[0].count + ' times,';
			} else {
				output += actions[0].action;
			}
		}

		if (actions.length > 3) {
			for (let i = 0; i < actions.length; i++) {
				var currentAction = actions[i];

				if (currentAction.count > 2) {

					console.log('currentAction.count > 2 : ' + currentAction.action);
					combinedActions.push({ action: currentAction.action, count: currentAction.count });
					previousTwoActions = [currentAction.action, currentAction.action];
					console.log(previousTwoActions);
				} else {
					//fill previousTwoActions
					if (actions[i - 1].count >= 2) {
						previousTwoActions = [actions[i - 1].action, actions[i - 1].action];
					} else if (actions[i - 1].count == 1 && actions[i - 2] == null) {
						previousTwoActions = ['', actions[i - 1].action];
					} else {
						previousTwoActions = [actions[i - 2].action, actions[i - 1].action];
					}

					if (
						previousTwoActions[0] == currentAction.action &&
						previousTwoActions[1] == actions[i + 1].action
					) {
						let action = previousTwoActions[0] + ', ' + previousTwoActions[1];

						if (
							combinedActions.length > 1 &&
							combinedActions[combinedActions.length - 1].action == action
						) {
							combinedActions[combinedActions.length - 1].count++;
						} else {
							combinedActions.push({ action: action, count: 2 });
						}

						hasPreviousBeenAdded = false;

						if(i < actions.length - 2){
							i += 1;
						}
					} 
					else {
						combinedActions.push({ action: currentAction.action, count: currentAction.count });
					}
				}
			}
		}

		console.log(combinedActions);
		console.log(output);

		for(let i = 0; i<combinedActions.length; i++){
			var currentAction = combinedActions[i];

			if(currentAction.count > 1){
				output += '(' + currentAction.action + ') ' + currentAction.count + ' times, ';
			} else {
				output += currentAction.action + ', ';
			}
		}

		//remove last comma
		output = output.substring(0, output.length - 2);

		console.log(output);
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
