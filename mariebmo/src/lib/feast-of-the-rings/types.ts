export type FilmId = 'fellowship' | 'two-towers' | 'return-of-the-king';

export type Edition = 'theatrical' | 'extended';

export type SceneRole = 'consumed' | 'interaction' | 'background';

export type Tier = 'iconic' | 'suggested' | 'extra';

export type TierFilter = Tier | 'all';

export type FeastKind = 'food' | 'drink';

export type FilmStep = 'plan' | 'menu' | 'watch';

export type KindFilter = FeastKind | 'all';

export type DishViewMode = 'cards' | 'list';

export type FeastKinds = FeastKind[];

export interface Ingredient {
	name: string;
	amount: number;
	unit: string;
}

export type DietaryTag = 'vegetarian' | 'vegan';

export interface DishSuggestion {
	id: string;
	name: string;
	description?: string;
	dietary?: DietaryTag[];
	ingredients: Ingredient[];
	recipe?: string;
	baseServings?: number;
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
	kinds: FeastKinds;
	sceneRole: SceneRole;
	tier: Tier;
	timestamps: DishTimestamps;
	prepLeadTimeSeconds: number;
	baseServings: number;
	ingredients: Ingredient[];
	recipe?: string;
	extendedOnly?: boolean;
	/** Path to a screenshot of the food in the scene, e.g. `/feast-of-the-rings/scenes/fotr-weathertop.jpg` */
	sceneImage?: string;
	/** Alternative ways to serve this beat — nibble, vegetarian, full feast, etc. Standard is always derived from `ingredients`. */
	suggestions?: DishSuggestion[];
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
	/** dishId → chosen suggestion id */
	selectedSuggestions: Record<string, string>;
	headcount: number;
	edition: Edition;
	tierFilter: TierFilter;
}

export interface ShoppingListItem {
	name: string;
	amount: number;
	unit: string;
}
