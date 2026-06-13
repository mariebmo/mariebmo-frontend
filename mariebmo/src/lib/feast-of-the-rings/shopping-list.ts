import { getDishById } from './dishes';
import { getSelectedSuggestion, getSuggestionBaseServings } from './suggestions';
import type { Ingredient, ShoppingListItem } from './types';

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

export function buildShoppingList(
	dishIds: string[],
	headcount: number,
	selectedSuggestions: Record<string, string> = {}
): ShoppingListItem[] {
	const merged = new Map<string, ShoppingListItem>();

	for (const dishId of dishIds) {
		const dish = getDishById(dishId);
		if (!dish) continue;

		const suggestion = getSelectedSuggestion(dish, selectedSuggestions[dishId]);
		const baseServings = getSuggestionBaseServings(dish, suggestion);

		for (const ingredient of suggestion.ingredients) {
			const key = ingredientKey(ingredient);
			const scaledAmount = roundAmount(scaleAmount(ingredient.amount, headcount, baseServings));
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
