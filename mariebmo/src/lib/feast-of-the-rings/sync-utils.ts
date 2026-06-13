import { getDishTimestamp } from './dishes';
import type { Dish, Edition } from './types';

export interface SyncStatus {
	nextDish: Dish | null;
	secondsUntilNext: number | null;
	prepDish: Dish | null;
}

export function getSyncStatus(
	dishes: Dish[],
	edition: Edition,
	elapsedSeconds: number
): SyncStatus {
	const upcoming = dishes.filter((dish) => {
		const timestamp = getDishTimestamp(dish, edition);
		return timestamp !== null && timestamp > elapsedSeconds;
	});

	const nextDish = upcoming[0] ?? null;
	const nextTimestamp = nextDish ? getDishTimestamp(nextDish, edition) : null;
	const secondsUntilNext =
		nextTimestamp !== null ? nextTimestamp - elapsedSeconds : null;

	const prepDish =
		dishes.find((dish) => {
			if (dish.prepLeadTimeSeconds <= 0) return false;
			const timestamp = getDishTimestamp(dish, edition);
			if (timestamp === null) return false;
			const prepStart = timestamp - dish.prepLeadTimeSeconds;
			return elapsedSeconds >= prepStart && elapsedSeconds < timestamp;
		}) ?? null;

	return { nextDish, secondsUntilNext, prepDish };
}
