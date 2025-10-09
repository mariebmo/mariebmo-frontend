<script lang="ts">
	import type { KnittingAction } from './interfaces';
	import { knittingCalculations } from './knitting.svelte';

	let shorthandOutput = $derived(printShorthand(knittingCalculations.actions));

	function printShorthand(actionArr: KnittingAction[]): string {
		let output = '';

		for (let i = 0; i < actionArr.length; i++) {
			let action = actionArr[i];

			if (action.count > 1) {
				output += '(' + action.actions.join(', ') + ') ' + action.count + ' times, ';
			} else {
				output += action.actions.join(', ') + ', ';
			}
		}

		output = output.replace(/(, )$/, '');

		console.log(output);
		return output;
	}
</script>

<div>
	<p>{shorthandOutput}</p>
</div>
