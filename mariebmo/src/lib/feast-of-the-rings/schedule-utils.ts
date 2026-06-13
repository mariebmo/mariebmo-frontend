import type { Edition, FilmId } from './types';

/** Seconds from film start (disc 1) to opening narration sync point. */
interface FilmSyncConfig {
	narrationOffset: number;
	disc2Start: number;
}

const SYNC_CONFIG: Record<FilmId, Record<Edition, FilmSyncConfig>> = {
	fellowship: {
		extended: { narrationOffset: 655, disc2Start: 7190 },
		theatrical: { narrationOffset: 0, disc2Start: 6240 }
	},
	'two-towers': {
		extended: { narrationOffset: 420, disc2Start: 7070 },
		theatrical: { narrationOffset: 0, disc2Start: 6180 }
	},
	'return-of-the-king': {
		extended: { narrationOffset: 390, disc2Start: 7620 },
		theatrical: { narrationOffset: 0, disc2Start: 6720 }
	}
};

/**
 * Converts disc-relative watch times (from the marathon feast schedule)
 * to seconds from opening narration — the app's sync anchor.
 *
 * Schedule times assume playback starts at the beginning of each disc.
 * Press Play at "The world is changed…" (etc.) and nudge if your copy differs.
 */
export function discTimeToTimestamp(
	filmId: FilmId,
	edition: Edition,
	disc: 1 | 2,
	secondsFromDiscStart: number
): number {
	const config = SYNC_CONFIG[filmId][edition];
	const absolute = disc === 1 ? secondsFromDiscStart : config.disc2Start + secondsFromDiscStart;
	return Math.max(0, absolute - config.narrationOffset);
}

/** Parse H:MM or H:MM:SS disc schedule time into total seconds from disc start. */
export function parseDiscTime(time: string): number {
	const parts = time.split(':').map(Number);
	if (parts.length === 2) {
		return parts[0] * 3600 + parts[1] * 60;
	}
	return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

export function discTimestamp(
	filmId: FilmId,
	edition: Edition,
	disc: 1 | 2,
	time: string
): number {
	return discTimeToTimestamp(filmId, edition, disc, parseDiscTime(time));
}

/** Build extended + theatrical timestamp pair; theatrical null when extended-only scene. */
export function timestamps(
	filmId: FilmId,
	disc: 1 | 2,
	time: string,
	extendedOnly = false
): { theatrical: number | null; extended: number } {
	const extended = discTimestamp(filmId, 'extended', disc, time);
	return {
		extended,
		theatrical: extendedOnly ? null : discTimestamp(filmId, 'theatrical', disc, time)
	};
}
