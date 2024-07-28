<script lang="ts">
	import { knittingActionsStore } from '$lib/stores/knittingActionStore';
	import type { KnittingAction, KnittingActions } from './interfaces';

	let actions: KnittingActions = {
		actions: [],
		fullWritten: '',
		visualize: ''
	};

	knittingActionsStore.subscribe((value) => {
		actions = value || { actions: [], fullWritten: '', visualize: '' };
	});

	$: shorthandOutput = printShorthand(actions.actions);
	shorthandOutput = shorthandOutput ? shorthandOutput.slice(0, -2) : '';

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

		return output;
	}
</script>

<div>
	<p>{shorthandOutput}</p>
</div>
