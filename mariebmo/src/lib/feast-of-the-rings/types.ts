export type FilmId = 'fellowship' | 'two-towers' | 'return-of-the-king';

export type Edition = 'theatrical' | 'extended';

export type SceneRole = 'consumed' | 'interaction' | 'background';

export type Tier = 'iconic' | 'suggested' | 'extra';

export type TierFilter = Tier | 'all';

export type WatchEmptyScope = 'all' | 'none';

export interface Ingredient {
	name: string;
	amount: number;
	unit: string;
}

export interface DishTimestamps {
	theatrical: number | null;
	extended: number | null;
}

export interface Dish {
	id: string;
	filmId: FilmId;
	name: string;
	scene: string;
	sceneRole: SceneRole;
	tier: Tier;
	timestamps: DishTimestamps;
	prepLeadTimeSeconds: number;
	baseServings: number;
	ingredients: Ingredient[];
	recipe?: string;
	extendedOnly?: boolean;
}

export interface FilmRuntimes {
	theatrical: number;
	extended: number;
}

export interface Film {
	id: FilmId;
	title: string;
	shortTitle: string;
	slug: string;
	curated: boolean;
	runtimes: FilmRuntimes;
}

export interface FeastPlan {
	selectedFilmIds: FilmId[];
	selectedDishIds: string[];
	headcount: number;
	edition: Edition;
	tierFilter: TierFilter;
}

export interface ShoppingListItem {
	name: string;
	amount: number;
	unit: string;
}
