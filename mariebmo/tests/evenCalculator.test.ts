import { describe, it, expect } from 'vitest';
import {
	groupActions,
	combineActions,
	type ActionGroup,
	getEvenAddDistribution,
	getEvenRemoveToDistribution,
	getEvenRemoveByDistribution,
	getFinalDistribution,
	Operation,
	ByOrTo
} from '../src/routes/knitting-tools/calculator/evenCalculator';
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

	it('should work end-to-end for ADD operation with uneven distribution', () => {
		const distribution = getEvenAddDistribution(12, 17);
		const groups = groupActions(distribution);
		const combined = combineActions(groups);

		expect(distribution).toBeDefined();
		expect(distribution).toHaveLength(17);
		expect(distribution.filter((x) => x === 1)).toHaveLength(5);
		expect(distribution.filter((x) => x === 0)).toHaveLength(12);

		expect(groups).toBeDefined();
		expect(groups).toHaveLength(10);
		// k3, m, k2, m, k3, m, k2, m, k2, m
		expect(groups[0]).toEqual({ '0': 3 });
		expect(groups[1]).toEqual({ '1': 1 });
		expect(groups[2]).toEqual({ '0': 2 });
		expect(groups[3]).toEqual({ '1': 1 });
		expect(groups[4]).toEqual({ '0': 3 });
		expect(groups[5]).toEqual({ '1': 1 });
		expect(groups[6]).toEqual({ '0': 2 });
		expect(groups[7]).toEqual({ '1': 1 });
		expect(groups[8]).toEqual({ '0': 2 });
		expect(groups[9]).toEqual({ '1': 1 });

		expect(combined).toBeDefined();
		expect(combined.length).toEqual(2);
		expect(combined[0].group).toEqual([{ '0': 3 }, { '1': 1 }, { '0': 2 }, { '1': 1 }]);
		expect(combined[0].count).toEqual(2);
		expect(combined[1].group).toEqual([{ '0': 2 }, { '1': 1 }]);
		expect(combined[1].count).toEqual(1);
	});

	it('should work end-to-end for ADD operation with uneven distribution and TO for large numbers	', () => {
		const distribution = getEvenAddDistribution(123, 32);
		const groups = groupActions(distribution);
		const combined = combineActions(groups);

		expect(distribution).toBeDefined();
		expect(distribution).toHaveLength(155);
		expect(distribution.filter((x) => x === 1)).toHaveLength(32);
		expect(distribution.filter((x) => x === 0)).toHaveLength(123);

		console.log(distribution);
		console.log(groups);
		console.log(combined);

		expect(groups).toBeDefined();
		expect(groups).toHaveLength(64);
		expect(groups[0]).toEqual({ '0': 4 });
		expect(groups[1]).toEqual({ '1': 1 });
		expect(groups[2]).toEqual({ '0': 4 });
		expect(groups[3]).toEqual({ '1': 1 });
		expect(groups[4]).toEqual({ '0': 4 });
		expect(groups[5]).toEqual({ '1': 1 });
		expect(groups[6]).toEqual({ '0': 4 });
		expect(groups[7]).toEqual({ '1': 1 });
		expect(groups[8]).toEqual({ '0': 4 });
		expect(groups[9]).toEqual({ '1': 1 });
		expect(groups[10]).toEqual({ '0': 4 });
		expect(groups[11]).toEqual({ '1': 1 }); //6
		expect(groups[12]).toEqual({ '0': 3 });
		expect(groups[13]).toEqual({ '1': 1 });
		expect(groups[14]).toEqual({ '0': 4 });
		expect(groups[15]).toEqual({ '1': 1 });
		expect(groups[16]).toEqual({ '0': 4 });
		expect(groups[17]).toEqual({ '1': 1 });
		expect(groups[18]).toEqual({ '0': 4 });
		expect(groups[19]).toEqual({ '1': 1 });
		expect(groups[20]).toEqual({ '0': 4 });
		expect(groups[21]).toEqual({ '1': 1 });
		expect(groups[22]).toEqual({ '0': 4 });
		expect(groups[23]).toEqual({ '1': 1 }); // 5
		expect(groups[24]).toEqual({ '0': 3 });
		expect(groups[25]).toEqual({ '1': 1 });
		expect(groups[26]).toEqual({ '0': 4 });
		expect(groups[27]).toEqual({ '1': 1 });
		expect(groups[28]).toEqual({ '0': 4 });
		expect(groups[29]).toEqual({ '1': 1 });
		expect(groups[30]).toEqual({ '0': 4 });
		expect(groups[31]).toEqual({ '1': 1 });
		expect(groups[32]).toEqual({ '0': 4 });
		expect(groups[33]).toEqual({ '1': 1 });
		expect(groups[34]).toEqual({ '0': 4 });
		expect(groups[35]).toEqual({ '1': 1 });
		expect(groups[36]).toEqual({ '0': 4 });
		expect(groups[37]).toEqual({ '1': 1 }); // 6
		expect(groups[38]).toEqual({ '0': 3 });
		expect(groups[39]).toEqual({ '1': 1 });
		expect(groups[40]).toEqual({ '0': 4 });
		expect(groups[41]).toEqual({ '1': 1 });
		expect(groups[42]).toEqual({ '0': 4 });
		expect(groups[43]).toEqual({ '1': 1 });
		expect(groups[44]).toEqual({ '0': 4 });
		expect(groups[45]).toEqual({ '1': 1 });
		expect(groups[46]).toEqual({ '0': 4 });
		expect(groups[47]).toEqual({ '1': 1 });
		expect(groups[48]).toEqual({ '0': 4 });
		expect(groups[49]).toEqual({ '1': 1 }); //5
		expect(groups[50]).toEqual({ '0': 3 });
		expect(groups[51]).toEqual({ '1': 1 });
		expect(groups[52]).toEqual({ '0': 4 });
		expect(groups[53]).toEqual({ '1': 1 });
		expect(groups[54]).toEqual({ '0': 4 });
		expect(groups[55]).toEqual({ '1': 1 });
		expect(groups[56]).toEqual({ '0': 4 });
		expect(groups[57]).toEqual({ '1': 1 });
		expect(groups[58]).toEqual({ '0': 4 });
		expect(groups[59]).toEqual({ '1': 1 });
		expect(groups[60]).toEqual({ '0': 4 });
		expect(groups[61]).toEqual({ '1': 1 }); //5
		expect(groups[62]).toEqual({ '0': 3 });
		expect(groups[63]).toEqual({ '1': 1 });
		expect(groups[64]).toEqual(undefined);

		expect(combined).toBeDefined();
		expect(combined.length).toEqual(10);
		expect(combined[0].group).toEqual([{ '0': 4 }, { '1': 1 }]);
		expect(combined[0].count).toEqual(6);
		expect(combined[1].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(combined[1].count).toEqual(1);
		expect(combined[2].group).toEqual([{ '0': 4 }, { '1': 1 }]);
		expect(combined[2].count).toEqual(5);
		expect(combined[3].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(combined[3].count).toEqual(1);
		expect(combined[4].group).toEqual([{ '0': 4 }, { '1': 1 }]);
		expect(combined[4].count).toEqual(6);
		expect(combined[5].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(combined[5].count).toEqual(1);
		expect(combined[6].group).toEqual([{ '0': 4 }, { '1': 1 }]);
		expect(combined[6].count).toEqual(5);
		expect(combined[7].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(combined[7].count).toEqual(1);
		expect(combined[8].group).toEqual([{ '0': 4 }, { '1': 1 }]);
		expect(combined[8].count).toEqual(5);
		expect(combined[9].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(combined[9].count).toEqual(1);
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

	it('should work end-to-end for FINAL distribution', () => {
		const distribution = getFinalDistribution(12, 4, Operation.ADD);
		expect(distribution).toBeDefined();
		expect(distribution.length).toBeGreaterThan(0);
		expect(distribution[0].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(distribution[0].count).toEqual(4);
	});

	it('should work end-to-end for FINAL distribution with TO', () => {
		const distribution = getFinalDistribution(12, 4, Operation.ADD, ByOrTo.TO);
		expect(distribution).toBeDefined();
		expect(distribution.length).toBeGreaterThan(0);
		expect(distribution[0].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(distribution[0].count).toEqual(4);
	});

	it('should work end-to-end for FINAL distribution with TO and uneven distribution', () => {
		const distribution = getFinalDistribution(123, 32, Operation.ADD, ByOrTo.TO);
		//(k4, m) 6 times, k3, m, (k4, m) 5 times, k3, m, (k4, m) 6 times, k3, m, (k4, m) 5 times, k3, m, (k4, m) 5 times, k3, m

		expect(distribution).toBeDefined();
		expect(distribution.length).toBeGreaterThan(0);
		expect(distribution.length).toEqual(10);
		expect(distribution[0].group).toEqual([{ '0': 4 }, { '1': 1 }]);
		expect(distribution[0].count).toEqual(6);
		expect(distribution[1].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(distribution[1].count).toEqual(1);
		expect(distribution[2].group).toEqual([{ '0': 4 }, { '1': 1 }]);
		expect(distribution[2].count).toEqual(5);
		expect(distribution[3].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(distribution[3].count).toEqual(1);
		expect(distribution[4].group).toEqual([{ '0': 4 }, { '1': 1 }]);
		expect(distribution[4].count).toEqual(6);
		expect(distribution[5].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(distribution[5].count).toEqual(1);
		expect(distribution[6].group).toEqual([{ '0': 4 }, { '1': 1 }]);
		expect(distribution[6].count).toEqual(5);
		expect(distribution[7].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(distribution[7].count).toEqual(1);
		expect(distribution[8].group).toEqual([{ '0': 4 }, { '1': 1 }]);
		expect(distribution[8].count).toEqual(6);
		expect(distribution[9].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(distribution[9].count).toEqual(1);
	});

	it('should work end-to-end for FINAL distribution with BY', () => {
		const distribution = getFinalDistribution(12, 4, Operation.ADD, ByOrTo.BY);
		expect(distribution).toBeDefined();
		expect(distribution.length).toBeGreaterThan(0);
		expect(distribution[0].group).toEqual([{ '0': 3 }, { '1': 1 }]);
		expect(distribution[0].count).toEqual(4);
	});

	it('should work end-to-end for FINAL distribution with REMOVE', () => {
		const distribution = getFinalDistribution(12, 6, Operation.REMOVE);
		expect(distribution).toBeDefined();
		expect(distribution.length).toBeGreaterThan(0);
		expect(distribution[0].group).toEqual([{ '-1': 6 }]);
		expect(distribution[0].count).toEqual(1);
	});

	it('should work end-to-end for FINAL distribution with REMOVE and TO', () => {
		const distribution = getFinalDistribution(12, 8, Operation.REMOVE, ByOrTo.TO);
		expect(distribution).toBeDefined();
		expect(distribution.length).toBeGreaterThan(0);
		console.log(distribution);
		expect(distribution[0].group).toEqual([{ '0': 1 }, { '-1': 1 }]);
		expect(distribution[0].count).toEqual(4);
	});

	it('should work end-to-end for FINAL distribution with REMOVE and BY', () => {
		const distribution = getFinalDistribution(12, 4, Operation.REMOVE, ByOrTo.BY);
		expect(distribution).toBeDefined();
		expect(distribution.length).toBeGreaterThan(0);
		expect(distribution[0].group).toEqual([{ '0': 1 }, { '-1': 1 }]);
		expect(distribution[0].count).toEqual(4);
	});
});
