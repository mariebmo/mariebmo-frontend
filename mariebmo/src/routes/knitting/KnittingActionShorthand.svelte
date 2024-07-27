<script lang="ts">
	import type { KnittingAction, KnittingActions } from './interfaces';

	export let actions: KnittingActions;

	let shorthandOutput = printShorthand(actions.actions);
	shorthandOutput = shorthandOutput.slice(0, -2);

	function printShorthand(actionArr: KnittingAction[]): string {
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
</script>

<div
	class="flex flex-col p-5 fill-current text-amber-800 dark:text-orange-200 bg-orange-300 dark:bg-amber-700 rounded-sm"
>
	<p>{shorthandOutput}</p>
</div>
