import { getDishTimestamp } from './dishes';
import type { Dish, Edition, SceneRole } from './types';

export function getPositionPercent(timestamp: number, runtimeSeconds: number): number {
	if (runtimeSeconds <= 0) return 0;
	return Math.min(100, Math.max(0, (timestamp / runtimeSeconds) * 100));
}

export function getSecondsFromPercent(percent: number, runtimeSeconds: number): number {
	if (runtimeSeconds <= 0) return 0;
	const clampedPercent = Math.min(100, Math.max(0, percent));
	return (clampedPercent / 100) * runtimeSeconds;
}

export function getSecondsFromTrackClientX(
	clientX: number,
	trackElement: HTMLElement,
	runtimeSeconds: number
): number {
	const rect = trackElement.getBoundingClientRect();
	if (rect.width <= 0) return 0;
	const percent = ((clientX - rect.left) / rect.width) * 100;
	return getSecondsFromPercent(percent, runtimeSeconds);
}

export function getPrepStartSeconds(dish: Dish, edition: Edition): number | null {
	const eatAt = getDishTimestamp(dish, edition);
	if (eatAt === null) return null;
	if (dish.prepLeadTimeSeconds <= 0) return eatAt;
	return Math.max(0, eatAt - dish.prepLeadTimeSeconds);
}

export function getMarkerSizeClasses(sceneRole: SceneRole): string {
	switch (sceneRole) {
		case 'consumed':
			return 'h-4 w-4';
		case 'interaction':
			return 'h-3.5 w-3.5';
		case 'background':
			return 'h-3 w-3';
	}
}

export function getMarkerColorClasses(sceneRole: SceneRole, isSelected: boolean): string {
	if (!isSelected) {
		return 'bg-gray-300 ring-gray-400 dark:bg-gray-600 dark:ring-gray-500';
	}

	switch (sceneRole) {
		case 'consumed':
			return 'bg-amber-500 ring-amber-600';
		case 'interaction':
			return 'bg-emerald-500 ring-emerald-600';
		case 'background':
			return 'bg-gray-400 ring-gray-500 dark:bg-gray-500 dark:ring-gray-400';
	}
}
