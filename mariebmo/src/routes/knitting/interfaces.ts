import { SvelteComponent } from 'svelte';

export enum KnitType {
	KNIT = 'k',
	INCREASE = 'm',
	DECREASE = 'k2tog'
}

export enum KnitSymbol {
	KNIT = '-',
	INCREASE = '+',
	DECREASE = 'x'
}

export interface KnittingAction {
	actions: string[];
	count: number;
}

export interface KnittingActions {
	visualize: string;
	fullWritten: string;
	actions: KnittingAction[];
}

export interface KnittingComponent {
	name: string;
	component: typeof SvelteComponent;
	index: number;
	show: boolean;
	id: string;
}
