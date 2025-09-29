export enum Operation {
	ADD = 'add',
	REMOVE = 'remove'
}

/**
 * Whether to use BY or TO for the calculation
 * By will increase the difference by the new amount (12, 5, remove, by) -> 7
 * To will decrease the difference by the new amount (12, 7, remove, to) -> 7
 */
export enum ByOrTo {
	BY = 'by',
	TO = 'to'
}

/**
 * This will distribute the amount between the target and current amount
 * @param oldAmount
 * @param newAmount
 * @param operation
 * @param byOrTo
 * @returns an shortened array of action groups - eg. {{0: 3}, {1: 1}}
 */
export function getFinalDistribution(
	oldAmount: number,
	newAmount: number,
	operation: Operation,
	byOrTo: ByOrTo = ByOrTo.TO
): Array<{ group: ActionGroup[]; count: number }> {
	const distribution = getEvenDistribution(oldAmount, newAmount, operation, byOrTo);
	const groups = groupActions(distribution);
	return combineActions(groups);
}

function getDifference(
	oldAmount: number,
	newAmount: number,
	operation: Operation,
	byOrTo: ByOrTo | undefined = ByOrTo.BY
): number {
	switch (operation) {
		case Operation.ADD:
			return newAmount >= oldAmount ? Math.abs(newAmount - oldAmount) : newAmount;

		case Operation.REMOVE:
			return byOrTo === ByOrTo.TO ? Math.abs(oldAmount - newAmount) : newAmount;
	}
}

/**
 * Calculates an even distribution of additions
 * @param oldAmount - The original amount
 * @param newAmount - The target amount (will handle both target and amount to add)
 * @returns Array where 0 = keep existing, 1 = add
 * eg. (12, 16) -> [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]
 */
export function getEvenAddDistribution(oldAmount: number, newAmount: number): number[] {
	return getEvenDistribution(oldAmount, newAmount, Operation.ADD);
}

/**
 * Calculates an even distribution of removals
 * @param oldAmount - The original amount
 * @param amountToRemove - The amount to remove (12, 4) -> 8
 * @returns Array where 0 = keep existing, -1 = remove one item
 * eg. (12, 4) -> [0, -1, 0, -1, 0, -1, 0, -1]
 */
export function getEvenRemoveByDistribution(oldAmount: number, amountToRemove: number): number[] {
	return getEvenDistribution(oldAmount, amountToRemove, Operation.REMOVE, ByOrTo.BY);
}

/**
 * Calculates an even distribution of removals
 * @param oldAmount - The original amount
 * @param targetAmount - The target amount (12, 7) -> 7
 * @returns Array where 0 = keep existing, -1 = remove one item
 * eg. (12, 8) -> [0, -1, 0, -1, 0, -1, 0, -1]
 */
export function getEvenRemoveToDistribution(oldAmount: number, targetAmount: number): number[] {
	return getEvenDistribution(oldAmount, targetAmount, Operation.REMOVE, ByOrTo.TO);
}

/**
 * Calculates an even distribution of additions or removals
 * @param oldAmount - The original amount
 * @param newAmount - The target amount
 * @param operation - Whether to ADD or REMOVE items
 * @param byOrTo - Whether to use BY or TO for the calculation (default is BY)
 * @returns Array where 0 = keep existing, 1 = add, -1 = remove
 */
export function getEvenDistribution(
	oldAmount: number,
	newAmount: number,
	operation: Operation,
	byOrTo: ByOrTo = ByOrTo.TO
): number[] {
	const difference = getDifference(oldAmount, newAmount, operation, byOrTo);
	const result: number[] = [];

	if (operation === Operation.ADD) {
		// For adding: distribute additions evenly across the new total
		const totalItems = oldAmount + difference;
		const addRatio = oldAmount / difference;

		let nextAdd = addRatio;

		for (let i = 0; i < totalItems; i++) {
			if (nextAdd <= 0) {
				result.push(1); // Add an item
				nextAdd += addRatio;
			} else {
				result.push(0); // Keep existing item
				nextAdd--;
			}
		}
	} else if (operation === Operation.REMOVE) {
		// For removing: distribute removals evenly across the old total
		const totalItems = oldAmount;
		const removeRatio = (oldAmount - difference) / difference - 1;

		let nextRemove = removeRatio;

		for (let i = 0; i < totalItems; i++) {
			if (nextRemove <= 0) {
				result.push(-1); // Remove an item
				i++;
				nextRemove += removeRatio;
			} else {
				result.push(0); // Keep existing item
				nextRemove--;
			}
		}
	}

	return result;
}

/**
 * Calculates the amount to add or remove based on current settings
 * @param current - Current amount
 * @param amount - Target amount or amount to change by
 * @param totalAmountIncluded - Whether amount represents total or change
 * @param increaseSelected - Whether to increase or decrease
 * @returns The amount to add or remove
 */
export function getNewAmount(
	current: number,
	amount: number,
	totalAmountIncluded: boolean,
	increaseSelected: boolean
): number {
	if (increaseSelected) {
		return totalAmountIncluded ? amount - current : amount;
	} else {
		return totalAmountIncluded ? current - amount : amount;
	}
}

// Generic interfaces for action processing
export interface ActionGroup {
	[actionType: string]: number;
}

export interface ProcessedAction {
	groups: ActionGroup[];
}

/**
 * Groups consecutive actions from a distribution array
 * @param distribution - Array of actions (0, 1, -1)
 * @returns Array of action groups with counts
 * eg. [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1] -> [{0: 3}, {1: 1}]
 */
export function groupActions(distribution: number[]): ActionGroup[] {
	const groups: ActionGroup[] = [];
	let currentGroup: ActionGroup = {};

	for (let i = 0; i < distribution.length; i++) {
		const action = distribution[i].toString();

		if (currentGroup[action]) {
			currentGroup[action]++;
		} else {
			// Check if we need to start a new group
			if (Object.keys(currentGroup).length > 0 && !currentGroup[action]) {
				groups.push({ ...currentGroup });
				currentGroup = {};
			}
			currentGroup[action] = 1;
		}
	}

	// Add the last group
	if (Object.keys(currentGroup).length > 0) {
		groups.push(currentGroup);
	}

	return groups;
}

/**
 * Combines repeated action patterns for efficiency
 * @param groups - Array of action groups
 * @returns Optimized array of action groups with pattern information
 * eg. [{0: 3}, {1: 1}, {0: 3}, {1: 1}, {0: 3}, {1: 1}] -> [{group: [{0: 3}, {1: 1}], count: 3}]
 */
export function combineActions(
	groups: ActionGroup[]
): Array<{ group: ActionGroup[]; count: number }> {
	const result: Array<{ group: ActionGroup[]; count: number }> = [];
	let lookAhead = 3;
	let index = 0;
	const MAX_ITERATIONS = 500;
	let outerMaxIterations = MAX_ITERATIONS;

	while (index < groups.length && outerMaxIterations-- > 0) {
		let currentGroup = groups[index];
		let lookAheadIndex = 1;
		let possibleMatches: Array<{ group: ActionGroup[]; count: number }> = [];
		let hasAMatch = false;

		// Look ahead for repeated patterns
		let lookAheadMaxIterations = MAX_ITERATIONS;
		while (
			lookAheadIndex <= lookAhead &&
			index + lookAheadIndex < groups.length &&
			lookAheadMaxIterations-- > 0
		) {
			const pattern = groups.slice(index, index + lookAheadIndex);
			const nextPattern = groups.slice(index + lookAheadIndex, index + lookAheadIndex * 2);

			if (patternsEqual(pattern, nextPattern)) {
				possibleMatches.push({
					group: pattern,
					count: 2
				});
			}
			lookAheadIndex++;
		}

		if (possibleMatches.length > 0) {
			// Find the longest pattern
			let bestMatch = possibleMatches.reduce((prev, current) =>
				prev.group.length > current.group.length ? prev : current
			);

			// Count how many times this pattern repeats
			let patternCount = 2; // We already found 2 occurrences
			let patternLength = bestMatch.group.length;

			// Check for more repetitions
			while (
				index + patternLength * (patternCount + 1) <= groups.length &&
				patternsEqual(
					groups.slice(index, index + patternLength),
					groups.slice(
						index + patternLength * patternCount,
						index + patternLength * (patternCount + 1)
					)
				)
			) {
				patternCount++;
			}

			result.push({
				group: bestMatch.group,
				count: patternCount
			});
			index += patternLength * patternCount;
			hasAMatch = true;
		}

		if (!hasAMatch) {
			result.push({
				group: [currentGroup],
				count: 1
			});
			index++;
		}
	}

	return result;
}

/**
 * Helper function to check if two action groups are equal
 * eg. [{0: 3}, {1: 1}] -> [{0: 3}, {1: 1}] -> true
 */
function groupsEqual(group1: ActionGroup, group2: ActionGroup): boolean {
	const keys1 = Object.keys(group1).sort();
	const keys2 = Object.keys(group2).sort();

	if (keys1.length !== keys2.length) return false;

	return keys1.every((key) => group1[key] === group2[key]);
}

/**
 * Helper function to check if two patterns are equal
 */
function patternsEqual(pattern1: ActionGroup[], pattern2: ActionGroup[]): boolean {
	if (pattern1.length !== pattern2.length) return false;

	return pattern1.every((group, index) => groupsEqual(group, pattern2[index]));
}

/**
 * Helper function to combine multiple groups into one
 */
function combineGroups(groups: ActionGroup[]): ActionGroup {
	const result: ActionGroup = {};

	for (const group of groups) {
		for (const [action, count] of Object.entries(group)) {
			result[action] = (result[action] || 0) + count;
		}
	}

	return result;
}
