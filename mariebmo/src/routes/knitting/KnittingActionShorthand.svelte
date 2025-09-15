<script lang="ts">
	import { knittingActionsStore } from '$lib/stores/knittingActionStore';
	import type { KnittingAction, KnittingActions } from './interfaces';

	let actions: KnittingActions | null = $state(null);

	knittingActionsStore.subscribe((value) => {
		actions = value || { actions: [], fullWritten: '', visualize: '' };
	});


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

		return output;
	}
	let shorthandOutput = $derived(actions ? printShorthand(actions.actions) : '');
</script>

<div>
	<p>{shorthandOutput}</p>
</div>
