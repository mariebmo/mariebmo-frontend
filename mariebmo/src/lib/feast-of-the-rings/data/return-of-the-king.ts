import type { Dish } from '../types';
import { timestamps } from '../schedule-utils';

export const RETURN_OF_THE_KING_DISHES: Dish[] = [
	{
		id: 'rotk-lembas',
		filmId: 'return-of-the-king',
		name: 'Lembas bread',
		scene: 'For the Journey Home',
		kinds: ['food'],
		sceneRole: 'interaction',
		tier: 'suggested',
		timestamps: timestamps('return-of-the-king', 1, '0:08'),
		prepLeadTimeSeconds: 0,
		baseServings: 4,
		ingredients: [{ name: 'Shortbread cookies', amount: 8, unit: 'piece' }]
	},
	{
		id: 'rotk-isengard-store',
		filmId: 'return-of-the-king',
		name: 'Isengard provisions',
		scene: 'Isengard Store Room',
		kinds: ['food', 'drink'],
		sceneRole: 'background',
		tier: 'suggested',
		timestamps: timestamps('return-of-the-king', 1, '0:10'),
		prepLeadTimeSeconds: 0,
		baseServings: 6,
		ingredients: [
			{ name: 'Bread', amount: 1, unit: 'loaf' },
			{ name: 'Wine', amount: 1, unit: 'bottle' },
			{ name: 'Salted pork', amount: 300, unit: 'g' }
		]
	},
	{
		id: 'rotk-edoras-drinking',
		filmId: 'return-of-the-king',
		name: 'Edoras celebration',
		scene: 'Edoras Drinking Contest',
		kinds: ['food', 'drink'],
		sceneRole: 'consumed',
		tier: 'iconic',
		timestamps: timestamps('return-of-the-king', 1, '0:19'),
		prepLeadTimeSeconds: 0,
		baseServings: 6,
		ingredients: [
			{ name: 'Ale', amount: 8, unit: 'pint' },
			{ name: 'Cheese', amount: 200, unit: 'g' },
			{ name: 'Cured meats', amount: 300, unit: 'g' },
			{ name: 'Bread', amount: 1, unit: 'loaf' }
		]
	},
	{
		id: 'rotk-faramir-feast',
		filmId: 'return-of-the-king',
		name: 'Denethor\'s table',
		scene: 'The Sacrifice of Faramir',
		kinds: ['food', 'drink'],
		sceneRole: 'background',
		tier: 'iconic',
		timestamps: timestamps('return-of-the-king', 1, '1:31'),
		prepLeadTimeSeconds: 1800,
		baseServings: 6,
		ingredients: [
			{ name: 'Roasted chicken', amount: 1, unit: 'piece' },
			{ name: 'Cherry tomatoes', amount: 200, unit: 'g' },
			{ name: 'Grapes', amount: 300, unit: 'g' },
			{ name: 'Cheese', amount: 200, unit: 'g' },
			{ name: 'Bread', amount: 1, unit: 'loaf' },
			{ name: 'Wine', amount: 1, unit: 'bottle' }
		],
		suggestions: [
			{
				id: 'rotk-faramir-feast-nibble',
				name: 'Tomatoes only',
				description: 'Denethor\'s cherry tomatoes — a single symbolic bite.',
				ingredients: [{ name: 'Cherry tomatoes', amount: 200, unit: 'g' }]
			},
			{
				id: 'rotk-faramir-feast-vegetarian',
				name: 'Vegetarian spread',
				description: 'Tomatoes, grapes, cheese, bread, and wine.',
				dietary: ['vegetarian'],
				ingredients: [
					{ name: 'Cherry tomatoes', amount: 200, unit: 'g' },
					{ name: 'Grapes', amount: 300, unit: 'g' },
					{ name: 'Cheese', amount: 200, unit: 'g' },
					{ name: 'Bread', amount: 1, unit: 'loaf' },
					{ name: 'Wine', amount: 1, unit: 'bottle' }
				]
			}
		]
	},
	{
		id: 'rotk-shire-return',
		filmId: 'return-of-the-king',
		name: 'Return to the Shire',
		scene: 'Return to the Shire',
		kinds: ['food', 'drink'],
		sceneRole: 'consumed',
		tier: 'iconic',
		timestamps: timestamps('return-of-the-king', 2, '1:41'),
		prepLeadTimeSeconds: 0,
		baseServings: 8,
		ingredients: [
			{ name: 'Pumpkin pie', amount: 1, unit: 'piece' },
			{ name: 'Root beer', amount: 4, unit: 'bottle' }
		]
	}
];
