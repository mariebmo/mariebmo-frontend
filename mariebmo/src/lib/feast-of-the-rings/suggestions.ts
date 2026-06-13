import type { Dish, DishSuggestion } from './types';

export function getStandardSuggestionId(dishId: string): string {
	return `${dishId}-standard`;
}

export function getStandardSuggestion(dish: Dish): DishSuggestion {
	return {
		id: getStandardSuggestionId(dish.id),
		name: 'Standard',
		description: 'The full spread as listed in the feast schedule.',
		ingredients: dish.ingredients,
		recipe: dish.recipe,
		baseServings: dish.baseServings
	};
}

export function getAllSuggestions(dish: Dish): DishSuggestion[] {
	return [getStandardSuggestion(dish), ...(dish.suggestions ?? [])];
}

export function getSuggestionById(dish: Dish, suggestionId: string): DishSuggestion | undefined {
	return getAllSuggestions(dish).find((suggestion) => suggestion.id === suggestionId);
}

export function getDefaultSuggestionId(dish: Dish): string {
	return getStandardSuggestionId(dish.id);
}

export function getSelectedSuggestion(
	dish: Dish,
	selectedSuggestionId: string | undefined
): DishSuggestion {
	const suggestions = getAllSuggestions(dish);
	const match = suggestions.find((suggestion) => suggestion.id === selectedSuggestionId);
	return match ?? suggestions[0];
}

export function formatSuggestionFoodItems(suggestion: DishSuggestion): string {
	return suggestion.ingredients.map((ingredient) => ingredient.name).join(', ');
}

export function getSuggestionBaseServings(dish: Dish, suggestion: DishSuggestion): number {
	return suggestion.baseServings ?? dish.baseServings;
}
