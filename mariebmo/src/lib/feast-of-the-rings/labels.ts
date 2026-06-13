import type { FeastKind, SceneRole, Tier } from './types';

export const KIND_LABELS: Record<FeastKind, string> = {
	food: 'Food',
	drink: 'Drink'
};

export const TIER_LABELS: Record<Tier, string> = {
	iconic: 'Iconic',
	suggested: 'Suggested',
	extra: 'Extra'
};

export const SCENE_ROLE_LABELS: Record<SceneRole, string> = {
	consumed: 'Consumed',
	interaction: 'Interaction',
	background: 'Background'
};

export function getKindClasses(kind: FeastKind): string {
	switch (kind) {
		case 'food':
			return 'bg-orange-100 text-orange-900 dark:bg-orange-950/50 dark:text-orange-200';
		case 'drink':
			return 'bg-violet-100 text-violet-900 dark:bg-violet-950/50 dark:text-violet-200';
	}
}

export function getTierClasses(tier: Tier): string {
	switch (tier) {
		case 'iconic':
			return 'bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200';
		case 'suggested':
			return 'bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-200';
		case 'extra':
			return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
	}
}

export function getSceneRoleClasses(sceneRole: SceneRole): string {
	switch (sceneRole) {
		case 'consumed':
			return 'border-l-4 border-l-rose-500';
		case 'interaction':
			return 'border-l-4 border-l-teal-500';
		case 'background':
			return 'border-l-4 border-l-stone-300 dark:border-l-stone-600 opacity-90';
	}
}

export function getSceneRoleSizeClasses(sceneRole: SceneRole): string {
	switch (sceneRole) {
		case 'consumed':
			return 'text-lg font-semibold';
		case 'interaction':
			return 'text-base font-medium';
		case 'background':
			return 'text-sm font-normal text-gray-600 dark:text-gray-400';
	}
}
