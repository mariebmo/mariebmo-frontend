import type { Dish } from '../types';
import { timestamps } from '../schedule-utils';

export const FELLOWSHIP_DISHES: Dish[] = [
	{
		id: 'fotr-concerning-hobbits-cupcake',
		filmId: 'fellowship',
		name: 'Strawberry cupcake',
		scene: 'Concerning Hobbits',
		kinds: ['food'],
		sceneRole: 'consumed',
		tier: 'iconic',
		timestamps: timestamps('fellowship', 1, '0:10', true),
		prepLeadTimeSeconds: 0,
		baseServings: 4,
		extendedOnly: true,
		ingredients: [
			{ name: 'Cupcakes', amount: 4, unit: 'piece' },
			{ name: 'Strawberry frosting', amount: 200, unit: 'g' }
		]
	},
	{
		id: 'fotr-very-old-friends',
		filmId: 'fellowship',
		name: 'Gandalf\'s tea spread',
		scene: 'Very Old Friends',
		kinds: ['food', 'drink'],
		sceneRole: 'interaction',
		tier: 'iconic',
		timestamps: timestamps('fellowship', 1, '0:15'),
		prepLeadTimeSeconds: 0,
		baseServings: 4,
		ingredients: [
			{ name: 'Cold chicken', amount: 400, unit: 'g' },
			{ name: 'Cheddar cheese', amount: 200, unit: 'g' },
			{ name: 'Boiled eggs', amount: 4, unit: 'piece' },
			{ name: 'Toast', amount: 8, unit: 'slice' },
			{ name: 'Muffins', amount: 4, unit: 'piece' },
			{ name: 'Warm tea', amount: 1, unit: 'pot' }
		]
	},
	{
		id: 'fotr-bilbo-birthday',
		filmId: 'fellowship',
		name: 'Birthday party spread',
		scene: 'Bilbo\'s Birthday',
		kinds: ['food', 'drink'],
		sceneRole: 'background',
		tier: 'iconic',
		timestamps: timestamps('fellowship', 1, '0:20'),
		prepLeadTimeSeconds: 0,
		baseServings: 8,
		ingredients: [
			{ name: 'Birthday cake', amount: 1, unit: 'piece' },
			{ name: 'Oranges', amount: 4, unit: 'piece' },
			{ name: 'Ale', amount: 4, unit: 'pint' }
		]
	},
	{
		id: 'fotr-to-the-bottle',
		filmId: 'fellowship',
		name: 'Ale',
		scene: 'To the bottle I go',
		kinds: ['drink'],
		sceneRole: 'consumed',
		tier: 'suggested',
		timestamps: timestamps('fellowship', 1, '0:35'),
		prepLeadTimeSeconds: 0,
		baseServings: 2,
		ingredients: [{ name: 'Ale', amount: 2, unit: 'pint' }]
	},
	{
		id: 'fotr-the-ring',
		filmId: 'fellowship',
		name: 'Apple slices & tea',
		scene: 'The Ring',
		kinds: ['food', 'drink'],
		sceneRole: 'consumed',
		tier: 'suggested',
		timestamps: timestamps('fellowship', 1, '0:37'),
		prepLeadTimeSeconds: 0,
		baseServings: 4,
		ingredients: [
			{ name: 'Apple', amount: 2, unit: 'piece' },
			{ name: 'Tea', amount: 1, unit: 'pot' }
		]
	},
	{
		id: 'fotr-camping',
		filmId: 'fellowship',
		name: 'Campfire sausage & pork',
		scene: 'Camping',
		kinds: ['food'],
		sceneRole: 'interaction',
		tier: 'suggested',
		timestamps: timestamps('fellowship', 1, '0:45'),
		prepLeadTimeSeconds: 600,
		baseServings: 4,
		ingredients: [
			{ name: 'Sausage', amount: 4, unit: 'piece' },
			{ name: 'Pork', amount: 400, unit: 'g' }
		]
	},
	{
		id: 'fotr-farmer-maggot',
		filmId: 'fellowship',
		name: 'Carrots',
		scene: 'Farmer Maggot',
		kinds: ['food'],
		sceneRole: 'consumed',
		tier: 'extra',
		timestamps: timestamps('fellowship', 1, '0:52'),
		prepLeadTimeSeconds: 0,
		baseServings: 4,
		ingredients: [{ name: 'Carrots', amount: 4, unit: 'piece' }]
	},
	{
		id: 'fotr-prancing-pony',
		filmId: 'fellowship',
		name: 'Ale & bread',
		scene: 'The Prancing Pony',
		kinds: ['food', 'drink'],
		sceneRole: 'consumed',
		tier: 'iconic',
		timestamps: timestamps('fellowship', 1, '1:00'),
		prepLeadTimeSeconds: 0,
		baseServings: 4,
		ingredients: [
			{ name: 'Ale', amount: 4, unit: 'pint' },
			{ name: 'Bread', amount: 1, unit: 'loaf' }
		]
	},
	{
		id: 'fotr-second-breakfast',
		filmId: 'fellowship',
		name: 'Second breakfast',
		scene: '2nd Breakfast',
		kinds: ['food'],
		sceneRole: 'consumed',
		tier: 'iconic',
		timestamps: timestamps('fellowship', 1, '1:07'),
		prepLeadTimeSeconds: 0,
		baseServings: 4,
		ingredients: [
			{ name: 'Sausage', amount: 4, unit: 'piece' },
			{ name: 'Bread', amount: 1, unit: 'loaf' }
		]
	},
	{
		id: 'fotr-weathertop',
		filmId: 'fellowship',
		name: 'Weathertop breakfast',
		scene: 'Weathertop',
		kinds: ['food'],
		sceneRole: 'interaction',
		tier: 'iconic',
		timestamps: timestamps('fellowship', 1, '1:11'),
		prepLeadTimeSeconds: 900,
		baseServings: 4,
		ingredients: [
			{ name: 'Tomato', amount: 4, unit: 'piece' },
			{ name: 'Breakfast sausage', amount: 8, unit: 'piece' },
			{ name: 'Bacon', amount: 200, unit: 'g' }
		]
	},
	{
		id: 'fotr-ring-goes-south',
		filmId: 'fellowship',
		name: 'Brautwurst & French loaf',
		scene: 'The Ring Goes South',
		kinds: ['food'],
		sceneRole: 'consumed',
		tier: 'suggested',
		timestamps: timestamps('fellowship', 2, '0:05'),
		prepLeadTimeSeconds: 600,
		baseServings: 4,
		ingredients: [
			{ name: 'Brautwurst', amount: 4, unit: 'piece' },
			{ name: 'French loaf', amount: 1, unit: 'loaf' }
		]
	},
	{
		id: 'fotr-lembas',
		filmId: 'fellowship',
		name: 'Lembas bread',
		scene: 'Farewell to Lothlórien',
		kinds: ['food'],
		sceneRole: 'interaction',
		tier: 'iconic',
		timestamps: timestamps('fellowship', 2, '1:02'),
		prepLeadTimeSeconds: 0,
		baseServings: 8,
		ingredients: [{ name: 'Shortbread cookies', amount: 16, unit: 'piece' }],
		recipe: 'Use shortbread cookies as lembas — one bite is enough for a long journey.'
	}
];
