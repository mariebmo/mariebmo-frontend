import type { Component } from 'svelte';

export const KnitType = {
	KNIT: 'k',
	INCREASE: 'm',
	DECREASE: 'k2tog'
} as const;

export const KnitSymbol = {
	KNIT: '-',
	INCREASE: '+',
	DECREASE: '↓'
} as const;

export interface KnittingAction {
	actions: string[];
	count: number;
}

// Re-export ActionGroup from evenCalculator for convenience
export interface ActionGroup {
	[actionType: string]: number;
}

export interface KnittingActions {
	visualize: string;
	fullWritten: string;
	actions: KnittingAction[];
}

export interface KnittingComponent {
	name: string;
	component: Component;
	index: number;
	show: boolean;
	id: string;
}
