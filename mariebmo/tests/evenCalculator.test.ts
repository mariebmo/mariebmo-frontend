import { describe, it, expect } from 'vitest';
import {
	groupActions,
	combineActions,
	type ActionGroup,
	getEvenAddDistribution,
	getEvenRemoveToDistribution,
	getEvenRemoveByDistribution
} from '../src/routes/knitting/evenCalculator';
describe('getEvenDistribution', () => {
	it('should create correct ADD distribution', () => {
		const result = getEvenAddDistribution(12, 16);
		expect(result).toHaveLength(16); // 12 + 4 = 16 total items
		expect(result.filter((x) => x === 1)).toHaveLength(4); // 4 additions
		expect(result.filter((x) => x === 0)).toHaveLength(12); // 12 existing items
	});

	it('should create correct ADD distribution with smaller target amount', () => {
		const result = getEvenAddDistribution(12, 4);
		expect(result).toHaveLength(16); // 12 + 4 = 16 total items
		expect(result.filter((x) => x === 1)).toHaveLength(4); // 4 additions
		expect(result.filter((x) => x === 0)).toHaveLength(12); // 12 existing items
	});

	it('should create correct ADD distribution with uneven distribution', () => {
		const result = getEvenAddDistribution(12, 17);
		expect(result).toHaveLength(17); // 12 + 5 = 17 total items
		expect(result.filter((x) => x === 1)).toHaveLength(5); // 5 additions
		expect(result.filter((x) => x === 0)).toHaveLength(12); // 12 existing items
	});

	it('should create correct REMOVE distribution', () => {
		const result = getEvenRemoveToDistribution(12, 8);
		expect(result).toHaveLength(8); // Original 12 items
		expect(result.filter((x) => x === -1)).toHaveLength(4); // 4 removals
		expect(result.filter((x) => x === 0)).toHaveLength(4); // 4 existing items
	});

	it('should create correct REMOVE distribution with uneven distribution', () => {
		const result = getEvenRemoveToDistribution(12, 7);
		expect(result).toHaveLength(7); // Original 12 items
		expect(result.filter((x) => x === -1)).toHaveLength(5); // 3 removals
		expect(result.filter((x) => x === 0)).toHaveLength(2); // 4 existing items
	});

	it('should handle edge case with 0 additions', () => {
		const result = getEvenAddDistribution(10, 10);

		expect(result).toHaveLength(10);
		expect(result.every((x) => x === 0)).toBe(true); // All existing items
	});

	it('should handle edge case with 0 removals', () => {
		const result = getEvenRemoveToDistribution(10, 10);
		expect(result).toHaveLength(10);
		expect(result.every((x) => x === 0)).toBe(true); // All existing items
	});
});

describe('groupActions', () => {
	it('should group consecutive actions correctly', () => {
		const distribution = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1];
		const groups = groupActions(distribution);

		expect(groups).toHaveLength(6);
		expect(groups[0]).toEqual({ '0': 3 });
		expect(groups[1]).toEqual({ '1': 1 });
		expect(groups[2]).toEqual({ '0': 3 });
		expect(groups[3]).toEqual({ '1': 1 });
		expect(groups[4]).toEqual({ '0': 3 });
		expect(groups[5]).toEqual({ '1': 1 });
	});

	it('should handle single action type', () => {
		const distribution = [0, 0, 0, 0];
		const groups = groupActions(distribution);

		expect(groups).toHaveLength(1);
		expect(groups[0]).toEqual({ '0': 4 });
	});

	it('should handle alternating actions', () => {
		const distribution = [0, 1, 0, 1, 0, 1];
		const groups = groupActions(distribution);

		expect(groups).toHaveLength(6);
		expect(groups[0]).toEqual({ '0': 1 });
		expect(groups[1]).toEqual({ '1': 1 });
		expect(groups[2]).toEqual({ '0': 1 });
		expect(groups[3]).toEqual({ '1': 1 });
		expect(groups[4]).toEqual({ '0': 1 });
		expect(groups[5]).toEqual({ '1': 1 });
	});
});

describe('combineActions', () => {
	it('should combine repeated patterns', () => {
		const groups: ActionGroup[] = [
			{ '0': 3 },
			{ '1': 1 },
			{ '0': 3 },
			{ '1': 1 },
			{ '0': 3 },
			{ '1': 1 }
		];

		const combined = combineActions(groups);
		console.log(combined);

		// Should recognize the repeated pattern and combine it
		expect(combined.length).toBeLessThanOrEqual(groups.length);
		expect(combined[0]).toEqual({
			group: [{ '0': 3 }, { '1': 1 }],
			count: 3
		});
	});

	it('should handle single group', () => {
		const groups: ActionGroup[] = [{ '0': 5 }];
		const combined = combineActions(groups);

		expect(combined).toHaveLength(1);
		expect(combined[0]).toEqual({
			group: [{ '0': 5 }],
			count: 1
		});
	});

	it('should handle empty groups', () => {
		const groups: ActionGroup[] = [];
		const combined = combineActions(groups);

		expect(combined).toHaveLength(0);
	});
});

describe('Integration tests', () => {
	it('should work end-to-end for ADD operation', () => {
		const distribution = getEvenAddDistribution(12, 4);

		const groups = groupActions(distribution);
		const combined = combineActions(groups);

		expect(distribution).toBeDefined();
		expect(distribution).toHaveLength(16);
		expect(distribution.filter((x) => x === 1)).toHaveLength(4);
		expect(distribution.filter((x) => x === 0)).toHaveLength(12);
		expect(distribution).toEqual([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]);

		expect(groups).toBeDefined();
		expect(groups).toHaveLength(8);
		expect(groups[0]).toEqual({ '0': 3 });
		expect(groups[1]).toEqual({ '1': 1 });
		expect(groups[2]).toEqual({ '0': 3 });
		expect(groups[3]).toEqual({ '1': 1 });
		expect(groups[4]).toEqual({ '0': 3 });
		expect(groups[5]).toEqual({ '1': 1 });
		expect(groups[6]).toEqual({ '0': 3 });
		expect(groups[7]).toEqual({ '1': 1 });

		expect(combined).toBeDefined();
		expect(combined.length).toBeGreaterThan(0);
		// The pattern should be repeated: [{ '0': 3 }, { '1': 1 }] 4 times
		expect(combined[0].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(combined[0].count).toEqual(4);

		// Verify the distribution has the right properties
		expect(distribution.filter((x) => x === 1)).toHaveLength(4);
		expect(distribution.filter((x) => x === 0)).toHaveLength(12);
	});

	it('should work end-to-end for REMOVE operation', () => {
		const distribution = getEvenRemoveByDistribution(12, 4);
		const groups = groupActions(distribution);
		const combined = combineActions(groups);

		expect(distribution).toBeDefined();
		expect(distribution).toHaveLength(8);
		expect(distribution.filter((x) => x === -1)).toHaveLength(4);
		expect(distribution.filter((x) => x === 0)).toHaveLength(4);

		expect(groups).toBeDefined();
		expect(groups).toHaveLength(8);
		expect(groups[0]).toEqual({ '0': 1 });
		expect(groups[1]).toEqual({ '-1': 1 });
		expect(groups[2]).toEqual({ '0': 1 });
		expect(groups[3]).toEqual({ '-1': 1 });
		expect(groups[4]).toEqual({ '0': 1 });
		expect(groups[5]).toEqual({ '-1': 1 });
		expect(groups[6]).toEqual({ '0': 1 });
		expect(groups[7]).toEqual({ '-1': 1 });

		expect(combined).toBeDefined();
		expect(combined.length).toBeGreaterThan(0);
		expect(combined[0].group).toEqual([{ '0': 1 }, { '-1': 1 }]);
		expect(combined[0].count).toEqual(4);
	});

	it('should handle the specific example from requirements', () => {
		const distribution = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1];

		const groups = groupActions(distribution);
		expect(groups).toEqual([
			{ '0': 3 },
			{ '1': 1 },
			{ '0': 3 },
			{ '1': 1 },
			{ '0': 3 },
			{ '1': 1 }
		]);

		const combined = combineActions(groups);
		expect(combined).toBeDefined();
		expect(combined.length).toBeGreaterThan(0);
	});
});
