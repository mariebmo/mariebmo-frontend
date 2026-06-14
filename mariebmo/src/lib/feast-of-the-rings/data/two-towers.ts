import type { Dish } from '../types';
import { timestamps } from '../schedule-utils';

export const TWO_TOWERS_DISHES: Dish[] = [
	{
		id: 'ttt-lembas-1',
		filmId: 'two-towers',
		name: 'Lembas bread',
		scene: 'What have we got to eat',
		kinds: ['food'],
		sceneRole: 'interaction',
		tier: 'suggested',
		timestamps: timestamps('two-towers', 1, '0:08'),
		prepLeadTimeSeconds: 0,
		baseServings: 4,
		ingredients: [{ name: 'Shortbread cookies', amount: 8, unit: 'piece' }]
	},
	{
		id: 'ttt-orc-draught',
		filmId: 'two-towers',
		name: 'Orc draught',
		scene: 'Give him some Medicine',
		kinds: ['drink'],
		sceneRole: 'consumed',
		tier: 'extra',
		timestamps: timestamps('two-towers', 1, '0:17'),
		prepLeadTimeSeconds: 0,
		baseServings: 2,
		ingredients: [{ name: 'Whisky', amount: 2, unit: 'shot' }]
	},
	{
		id: 'ttt-lembas-2',
		filmId: 'two-towers',
		name: 'Lembas bread',
		scene: 'Is it Tasty?',
		kinds: ['food'],
		sceneRole: 'consumed',
		tier: 'extra',
		timestamps: timestamps('two-towers', 1, '0:43'),
		prepLeadTimeSeconds: 0,
		baseServings: 4,
		ingredients: [{ name: 'Shortbread cookies', amount: 4, unit: 'piece' }]
	},
	{
		id: 'ttt-ent-draught',
		filmId: 'two-towers',
		name: 'Ent draught',
		scene: 'I\'ve always been taller than you',
		kinds: ['drink'],
		sceneRole: 'consumed',
		tier: 'suggested',
		timestamps: timestamps('two-towers', 1, '1:09'),
		prepLeadTimeSeconds: 0,
		baseServings: 2,
		ingredients: [{ name: 'Mint tea', amount: 2, unit: 'cup' }]
	},
	{
		id: 'ttt-theodins-halls',
		filmId: 'two-towers',
		name: 'Meduseld feast',
		scene: 'Théoden\'s Halls',
		kinds: ['food', 'drink'],
		sceneRole: 'background',
		tier: 'iconic',
		timestamps: timestamps('two-towers', 1, '1:29'),
		prepLeadTimeSeconds: 0,
		baseServings: 6,
		ingredients: [
			{ name: 'Tomato soup', amount: 1, unit: 'pot' },
			{ name: 'Swiss cheese', amount: 200, unit: 'g' },
			{ name: 'Sourdough bread', amount: 1, unit: 'loaf' },
			{ name: 'Roasted chicken', amount: 1, unit: 'piece' },
			{ name: 'Apple cider', amount: 1, unit: 'bottle' }
		],
		suggestions: [
			{
				id: 'ttt-theodins-halls-nibble',
				name: 'Nibble',
				description: 'One item from the scene — keep it light.',
				ingredients: [{ name: 'Tomato soup', amount: 1, unit: 'pot' }]
			},
			{
				id: 'ttt-theodins-halls-vegetarian',
				name: 'Vegetarian spread',
				description: 'Soup, cheese, bread, and cider — no meat.',
				dietary: ['vegetarian'],
				ingredients: [
					{ name: 'Tomato soup', amount: 1, unit: 'pot' },
					{ name: 'Swiss cheese', amount: 200, unit: 'g' },
					{ name: 'Sourdough bread', amount: 1, unit: 'loaf' },
					{ name: 'Apple cider', amount: 1, unit: 'bottle' }
				]
			}
		]
	},
	{
		id: 'ttt-rabbit-stew',
		filmId: 'two-towers',
		name: 'Rabbit & potato stew',
		scene: 'Po-ta-toes',
		kinds: ['food'],
		sceneRole: 'interaction',
		tier: 'iconic',
		timestamps: timestamps('two-towers', 1, '1:41'),
		prepLeadTimeSeconds: 3600,
		baseServings: 6,
		ingredients: [
			{ name: 'Rabbit', amount: 1, unit: 'piece' },
			{ name: 'Potatoes', amount: 6, unit: 'piece' },
			{ name: 'Carrots', amount: 3, unit: 'piece' },
			{ name: 'Onion', amount: 2, unit: 'piece' }
		]
	},
	{
		id: 'ttt-helms-deep-soup',
		filmId: 'two-towers',
		name: 'Fatty fish soup',
		scene: 'Road to Helm\'s Deep',
		kinds: ['food'],
		sceneRole: 'interaction',
		tier: 'suggested',
		timestamps: timestamps('two-towers', 2, '0:01'),
		prepLeadTimeSeconds: 2700,
		baseServings: 6,
		ingredients: [
			{ name: 'Oily fish (mackerel or sardines)', amount: 400, unit: 'g' },
			{ name: 'Fish stock', amount: 1, unit: 'litre' },
			{ name: 'Potatoes', amount: 4, unit: 'piece' }
		]
	},
	{
		id: 'ttt-helms-deep-provisions',
		filmId: 'two-towers',
		name: 'Helm\'s Deep provisions',
		scene: 'Helm\'s Deep',
		kinds: ['food'],
		sceneRole: 'consumed',
		tier: 'suggested',
		timestamps: timestamps('two-towers', 2, '0:15'),
		prepLeadTimeSeconds: 0,
		baseServings: 4,
		ingredients: [
			{ name: 'Potatoes', amount: 4, unit: 'piece' },
			{ name: 'Garlic', amount: 4, unit: 'clove' }
		]
	},
	{
		id: 'ttt-for-gondor',
		filmId: 'two-towers',
		name: 'Ale',
		scene: 'For Gondor!',
		kinds: ['drink'],
		sceneRole: 'consumed',
		tier: 'suggested',
		timestamps: timestamps('two-towers', 2, '0:33'),
		prepLeadTimeSeconds: 0,
		baseServings: 4,
		ingredients: [{ name: 'Ale', amount: 4, unit: 'pint' }]
	},
	{
		id: 'ttt-isengard-store',
		filmId: 'two-towers',
		name: 'Isengard store room',
		scene: 'Isengard Store Room',
		kinds: ['food', 'drink'],
		sceneRole: 'background',
		tier: 'suggested',
		timestamps: timestamps('two-towers', 2, '1:39'),
		prepLeadTimeSeconds: 0,
		baseServings: 6,
		ingredients: [
			{ name: 'Red wine', amount: 1, unit: 'bottle' },
			{ name: 'Apples', amount: 4, unit: 'piece' },
			{ name: 'Smoked ham', amount: 300, unit: 'g' },
			{ name: 'Carrots', amount: 6, unit: 'piece' },
			{ name: 'Squash', amount: 1, unit: 'piece' },
			{ name: 'Cauliflower', amount: 1, unit: 'head' },
			{ name: 'Cabbage', amount: 1, unit: 'head' },
			{ name: 'Pickled vegetables', amount: 1, unit: 'jar' }
		]
	}
];
