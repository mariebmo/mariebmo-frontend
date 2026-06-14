import { describe, it, expect } from 'vitest';
import { buildShoppingList, formatShoppingListForClipboard, scaleIngredients } from '../../src/lib/feast-of-the-rings/shopping-list';

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

	it('uses selected suggestion ingredients instead of the default dish list', () => {
		const items = buildShoppingList(['ttt-theodins-halls'], 6, {
			'ttt-theodins-halls': 'ttt-theodins-halls-nibble'
		});

		expect(items).toEqual([{ name: 'Tomato soup', amount: 1, unit: 'pot' }]);
	});

	it('scales ingredients for a single dish', () => {
		const items = scaleIngredients(
			[{ name: 'Ale', amount: 4, unit: 'pint' }],
			8,
			4
		);

		expect(items).toEqual([{ name: 'Ale', amount: 8, unit: 'pint' }]);
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
