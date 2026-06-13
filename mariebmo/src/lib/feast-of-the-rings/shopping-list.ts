import { getDishById } from './dishes';
import type { Dish, Ingredient, ShoppingListItem } from './types';

function scaleAmount(amount: number, headcount: number, baseServings: number): number {
	if (baseServings <= 0) return amount;
	return amount * (headcount / baseServings);
}

function roundAmount(amount: number): number {
	return Math.round(amount * 100) / 100;
}

function ingredientKey(ingredient: Ingredient): string {
	return `${ingredient.name.toLowerCase()}::${ingredient.unit.toLowerCase()}`;
}

export function buildShoppingList(dishIds: string[], headcount: number): ShoppingListItem[] {
	const merged = new Map<string, ShoppingListItem>();

	for (const dishId of dishIds) {
		const dish = getDishById(dishId);
		if (!dish) continue;

		for (const ingredient of dish.ingredients) {
			const key = ingredientKey(ingredient);
			const scaledAmount = roundAmount(scaleAmount(ingredient.amount, headcount, dish.baseServings));
			const existing = merged.get(key);

			if (existing) {
				existing.amount = roundAmount(existing.amount + scaledAmount);
			} else {
				merged.set(key, {
					name: ingredient.name,
					amount: scaledAmount,
					unit: ingredient.unit
				});
			}
		}
	}

	return [...merged.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function formatShoppingListForClipboard(items: ShoppingListItem[]): string {
	if (items.length === 0) return '';

	return items
		.map((item) => {
			const amount =
				item.amount % 1 === 0 ? String(item.amount) : item.amount.toFixed(2).replace(/\.?0+$/, '');
			return `${amount} ${item.unit} ${item.name}`;
		})
		.join('\n');
}

export function getScaledIngredients(dish: Dish, headcount: number): Ingredient[] {
	return dish.ingredients.map((ingredient) => ({
		...ingredient,
		amount: roundAmount(scaleAmount(ingredient.amount, headcount, dish.baseServings))
	}));
}
