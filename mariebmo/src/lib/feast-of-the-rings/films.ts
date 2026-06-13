import type { Edition, Film, FilmId } from './types';

export const FILMS: Film[] = [
	{
		id: 'fellowship',
		title: 'The Fellowship of the Ring',
		shortTitle: 'Fellowship',
		slug: 'fellowship',
		curated: true,
		runtimes: { theatrical: 10680, extended: 13680 }
	},
	{
		id: 'two-towers',
		title: 'The Two Towers',
		shortTitle: 'Two Towers',
		slug: 'two-towers',
		curated: true,
		runtimes: { theatrical: 10740, extended: 13740 }
	},
	{
		id: 'return-of-the-king',
		title: 'The Return of the King',
		shortTitle: 'Return of the King',
		slug: 'return-of-the-king',
		curated: true,
		runtimes: { theatrical: 12000, extended: 15000 }
	}
];

export function getFilmRuntime(filmId: FilmId, edition: Edition): number {
	const film = FILMS.find((entry) => entry.id === filmId);
	return film?.runtimes[edition] ?? 13680;
}

export function getFilmBySlug(slug: string): Film | undefined {
	return FILMS.find((film) => film.slug === slug);
}

export function getFilmById(id: FilmId): Film | undefined {
	return FILMS.find((film) => film.id === id);
}

export function isFilmId(value: string): value is FilmId {
	return FILMS.some((film) => film.id === value);
}
