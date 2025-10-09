import type { KnittingAction } from './interfaces';

export const knittingCalculations = $state({
	actions: [] as KnittingAction[],
	visualize: '',
	fullWritten: '',
	reset: () => {
		knittingCalculations.actions = [];
		knittingCalculations.visualize = '';
		knittingCalculations.fullWritten = '';
	}
});
