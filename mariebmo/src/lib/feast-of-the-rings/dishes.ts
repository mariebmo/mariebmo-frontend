import { FELLOWSHIP_DISHES } from './data/fellowship';
import { TWO_TOWERS_DISHES } from './data/two-towers';
import { RETURN_OF_THE_KING_DISHES } from './data/return-of-the-king';
import type { Dish, Edition, FilmId, Tier } from './types';

export const ALL_DISHES: Dish[] = [
	...FELLOWSHIP_DISHES,
	...TWO_TOWERS_DISHES,
	...RETURN_OF_THE_KING_DISHES
];

export function getDishById(id: string): Dish | undefined {
	return ALL_DISHES.find((dish) => dish.id === id);
}

export function getDishTimestamp(dish: Dish, edition: Edition): number | null {
	return dish.timestamps[edition];
}

export function getDishesForFilm(filmId: FilmId, edition: Edition): Dish[] {
	return ALL_DISHES.filter((dish) => {
		if (dish.filmId !== filmId) return false;
		return getDishTimestamp(dish, edition) !== null;
	});
}

export function sortDishesByTimestamp(dishes: Dish[], edition: Edition): Dish[] {
	return [...dishes].sort(
		(a, b) => (getDishTimestamp(a, edition) ?? 0) - (getDishTimestamp(b, edition) ?? 0)
	);
}

export function getIconicDishIdsForFilms(filmIds: FilmId[], edition: Edition): string[] {
	return ALL_DISHES.filter(
		(dish) =>
			filmIds.includes(dish.filmId) &&
			dish.tier === 'iconic' &&
			getDishTimestamp(dish, edition) !== null
	).map((dish) => dish.id);
}

export function filterDishesByTier(dishes: Dish[], tierFilter: Tier | 'all'): Dish[] {
	if (tierFilter === 'all') return dishes;
	return dishes.filter((dish) => dish.tier === tierFilter);
}

export function dishCountForFilm(filmId: FilmId, edition: Edition): number {
	return getDishesForFilm(filmId, edition).length;
}
