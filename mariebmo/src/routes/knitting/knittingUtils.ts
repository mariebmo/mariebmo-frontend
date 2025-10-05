import { KnitType, KnitSymbol } from './interfaces';
import type { ActionGroup, KnittingAction } from './interfaces';

/**
 * Validation error messages
 */
export const VALIDATION_MESSAGES = {
	INVALID_NUMBERS: 'Please enter valid positive numbers for current and amount.',
	CANNOT_DECREASE_TO_HIGHER:
		'Cannot decrease to a number greater than or equal to current stitches.',
	CANNOT_INCREASE_TO_LOWER: 'Cannot increase to a number less than or equal to current stitches.',
	CALCULATION_ERROR: 'Unable to calculate even distribution for the given inputs.',
	GENERAL_ERROR: 'An error occurred during calculation.'
} as const;

/**
 * Validates knitting calculation inputs
 */
export function validateKnittingInputs(
	current: number,
	amount: number,
	increaseSelected: boolean,
	totalAmountIncluded: boolean
): string | null {
	if (current <= 0 || amount <= 0) {
		return VALIDATION_MESSAGES.INVALID_NUMBERS;
	}

	if (!increaseSelected && totalAmountIncluded && amount >= current) {
		return VALIDATION_MESSAGES.CANNOT_DECREASE_TO_HIGHER;
	}

	if (increaseSelected && totalAmountIncluded && amount <= current) {
		return VALIDATION_MESSAGES.CANNOT_INCREASE_TO_LOWER;
	}

	return null;
}

/**
 * Calculates the target amount based on current settings
 */
export function calculateKnittingTargetAmount(
	current: number,
	amount: number,
	increaseSelected: boolean,
	totalAmountIncluded: boolean
): number {
	if (totalAmountIncluded) {
		return amount;
	}
	return increaseSelected ? current + amount : current - amount;
}

/**
 * Converts numeric action to knitting type
 */
export function actionToKnitType(action: number): string {
	switch (action) {
		case 0:
			return KnitType.KNIT;
		case 1:
			return KnitType.INCREASE;
		case -1:
			return KnitType.DECREASE;
		default:
			throw new Error(`Unknown action type: ${action}`);
	}
}

/**
 * Gets the appropriate symbol for knitting actions
 */
export function getKnittingSymbol(isIncrease: boolean): string {
	return isIncrease ? KnitSymbol.INCREASE : KnitSymbol.DECREASE;
}

/**
 * Gets the appropriate action type for knitting
 */
export function getKnittingActionType(isIncrease: boolean): string {
	return isIncrease ? KnitType.INCREASE : KnitType.DECREASE;
}

/**
 * Formats knitting action count for display
 */
export function formatKnitCount(count: number): string {
	return count > 1 ? count.toString() : '';
}

/**
 * Creates a knitting action string with optional count
 */
export function createKnittingActionString(actionType: string, count: number): string {
	const countStr = formatKnitCount(count);
	return actionType + countStr;
}

/**
 * Processes action groups into knitting actions
 */
export function processActionGroups(
	distribution: Array<{ group: ActionGroup[]; count: number }>
): KnittingAction[] {
	return distribution.map((group) => ({
		actions: group.group.flatMap((actionGroup) =>
			Object.entries(actionGroup).map(([actionType, count]) => {
				const actionNum = parseInt(actionType);
				const knitType = actionToKnitType(actionNum);
				return createKnittingActionString(knitType, count);
			})
		),
		count: group.count
	}));
}
