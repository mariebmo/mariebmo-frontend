import { browser } from '$app/environment';
import {
	ALL_DISHES,
	filterDishesByTier,
	getDishesForFilm,
	getIconicDishIdsForFilms,
	sortDishesByTimestamp
} from './dishes';
import { getDefaultSuggestionId } from './suggestions';
import type { Dish, Edition, FeastPlan, FilmId, TierFilter } from './types';

const STORAGE_KEY = 'feast-of-the-rings-plan';

const DEFAULT_PLAN: FeastPlan = {
	selectedFilmIds: ['fellowship'],
	selectedDishIds: [],
	selectedSuggestions: {},
	headcount: 4,
	edition: 'extended',
	tierFilter: 'all'
};

function normalizePlan(raw: Partial<FeastPlan>): FeastPlan {
	return {
		selectedFilmIds: raw.selectedFilmIds ?? DEFAULT_PLAN.selectedFilmIds,
		selectedDishIds: raw.selectedDishIds ?? DEFAULT_PLAN.selectedDishIds,
		selectedSuggestions: raw.selectedSuggestions ?? {},
		headcount: raw.headcount ?? DEFAULT_PLAN.headcount,
		edition: raw.edition ?? DEFAULT_PLAN.edition,
		tierFilter: raw.tierFilter ?? DEFAULT_PLAN.tierFilter
	};
}

function loadPlan(): FeastPlan {
	if (!browser) {
		return {
			...DEFAULT_PLAN,
			selectedDishIds: getIconicDishIdsForFilms(['fellowship'], 'extended')
		};
	}

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) {
			return {
				...DEFAULT_PLAN,
				selectedDishIds: getIconicDishIdsForFilms(['fellowship'], DEFAULT_PLAN.edition)
			};
		}
		return normalizePlan(JSON.parse(stored) as Partial<FeastPlan>);
	} catch {
		return {
			...DEFAULT_PLAN,
			selectedDishIds: getIconicDishIdsForFilms(['fellowship'], DEFAULT_PLAN.edition)
		};
	}
}

function savePlan(plan: FeastPlan): void {
	if (!browser) return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
	} catch (error) {
		console.warn('Failed to save feast plan:', error);
	}
}

function pruneSuggestions(plan: FeastPlan): void {
	const next: Record<string, string> = {};

	for (const dishId of plan.selectedDishIds) {
		const dish = ALL_DISHES.find((entry) => entry.id === dishId);
		if (!dish) continue;

		next[dishId] = plan.selectedSuggestions[dishId] ?? getDefaultSuggestionId(dish);
	}

	plan.selectedSuggestions = next;
}

function createFeastPlanStore() {
	let plan = $state<FeastPlan>(loadPlan());
	pruneSuggestions(plan);

	function persist() {
		savePlan(plan);
	}

	function setEdition(edition: Edition) {
		plan.edition = edition;
		plan.selectedDishIds = plan.selectedDishIds.filter((id) => {
			const dish = ALL_DISHES.find((entry) => entry.id === id);
			if (!dish) return false;
			return dish.timestamps[edition] !== null;
		});
		pruneSuggestions(plan);
		persist();
	}

	function setHeadcount(headcount: number) {
		plan.headcount = Math.max(1, headcount);
		persist();
	}

	function setTierFilter(tierFilter: TierFilter) {
		plan.tierFilter = tierFilter;
		persist();
	}

	function toggleFilm(filmId: FilmId) {
		const isSelected = plan.selectedFilmIds.includes(filmId);

		if (isSelected) {
			plan.selectedFilmIds = plan.selectedFilmIds.filter((id) => id !== filmId);
			plan.selectedDishIds = plan.selectedDishIds.filter((id) => {
				const dish = ALL_DISHES.find((entry) => entry.id === id);
				return dish?.filmId !== filmId;
			});
		} else {
			plan.selectedFilmIds = [...plan.selectedFilmIds, filmId];
			const iconicIds = getIconicDishIdsForFilms([filmId], plan.edition);
			plan.selectedDishIds = [...new Set([...plan.selectedDishIds, ...iconicIds])];
		}

		pruneSuggestions(plan);
		persist();
	}

	function selectTrilogy() {
		const allFilmIds: FilmId[] = ['fellowship', 'two-towers', 'return-of-the-king'];
		plan.selectedFilmIds = allFilmIds;
		const iconicIds = getIconicDishIdsForFilms(allFilmIds, plan.edition);
		plan.selectedDishIds = [...new Set([...plan.selectedDishIds, ...iconicIds])];
		pruneSuggestions(plan);
		persist();
	}

	function toggleDish(dishId: string) {
		if (plan.selectedDishIds.includes(dishId)) {
			plan.selectedDishIds = plan.selectedDishIds.filter((id) => id !== dishId);
		} else {
			plan.selectedDishIds = [...plan.selectedDishIds, dishId];
			const dish = ALL_DISHES.find((entry) => entry.id === dishId);
			if (dish) {
				plan.selectedSuggestions[dishId] = getDefaultSuggestionId(dish);
			}
		}

		pruneSuggestions(plan);
		persist();
	}

	function setSuggestion(dishId: string, suggestionId: string) {
		if (!plan.selectedDishIds.includes(dishId)) return;

		plan.selectedSuggestions[dishId] = suggestionId;
		persist();
	}

	function isDishSelected(dishId: string): boolean {
		return plan.selectedDishIds.includes(dishId);
	}

	function getPlannedDishesForFilm(filmId: FilmId): Dish[] {
		const dishes = getDishesForFilm(filmId, plan.edition).filter((dish) =>
			plan.selectedDishIds.includes(dish.id)
		);
		return sortDishesByTimestamp(dishes, plan.edition);
	}

	function hasPlannedDishesForFilm(filmId: FilmId): boolean {
		return getPlannedDishesForFilm(filmId).length > 0;
	}

	function getVisibleDishesForFilm(filmId: FilmId): Dish[] {
		const dishes = filterDishesByTier(getDishesForFilm(filmId, plan.edition), plan.tierFilter);
		return sortDishesByTimestamp(dishes, plan.edition);
	}

	function getVisibleDishesForPlan(): Dish[] {
		const dishes = ALL_DISHES.filter(
			(dish) =>
				plan.selectedFilmIds.includes(dish.filmId) &&
				dish.timestamps[plan.edition] !== null
		);
		return sortDishesByTimestamp(filterDishesByTier(dishes, plan.tierFilter), plan.edition);
	}

	return {
		get plan() {
			return plan;
		},
		setEdition,
		setHeadcount,
		setTierFilter,
		toggleFilm,
		selectTrilogy,
		toggleDish,
		setSuggestion,
		isDishSelected,
		getPlannedDishesForFilm,
		hasPlannedDishesForFilm,
		getVisibleDishesForFilm,
		getVisibleDishesForPlan
	};
}

export const feastPlan = createFeastPlanStore();
