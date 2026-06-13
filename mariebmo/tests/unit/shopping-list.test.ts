import { describe, it, expect } from 'vitest';
import { buildShoppingList, formatShoppingListForClipboard } from '../../src/lib/feast-of-the-rings/shopping-list';

describe('buildShoppingList', () => {
	it('merges ingredients with the same unit', () => {
		const items = buildShoppingList(['fotr-bilbo-birthday', 'fotr-prancing-pony'], 4);
		const ale = items.find((item) => item.name === 'Ale');

		expect(ale).toEqual({ name: 'Ale', amount: 6, unit: 'pint' });
	});

	it('scales ingredients by headcount', () => {
		const items = buildShoppingList(['fotr-prancing-pony'], 8);
		const ale = items.find((item) => item.name === 'Ale');

		expect(ale).toEqual({ name: 'Ale', amount: 8, unit: 'pint' });
	});
});

describe('formatShoppingListForClipboard', () => {
	it('formats items as plain text lines', () => {
		const text = formatShoppingListForClipboard([
			{ name: 'Apple', amount: 2, unit: 'piece' },
			{ name: 'Butter', amount: 200.5, unit: 'g' }
		]);

		expect(text).toBe('2 piece Apple\n200.5 g Butter');
	});
});
