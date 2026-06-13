import type { SceneRole, Tier } from './types';

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

export function getTierClasses(tier: Tier): string {
	switch (tier) {
		case 'iconic':
			return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200';
		case 'suggested':
			return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200';
		case 'extra':
			return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
	}
}

export function getSceneRoleClasses(sceneRole: SceneRole): string {
	switch (sceneRole) {
		case 'consumed':
			return 'border-l-4 border-l-amber-500';
		case 'interaction':
			return 'border-l-4 border-l-emerald-500';
		case 'background':
			return 'border-l-4 border-l-gray-300 dark:border-l-gray-600 opacity-90';
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
