import { error } from '@sveltejs/kit';
import { getFilmBySlug } from '$lib/feast-of-the-rings/films';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const film = getFilmBySlug(params.film);

	if (!film) {
		error(404, 'Film not found');
	}

	if (!film.curated) {
		error(404, 'This film is not yet curated');
	}

	return { film };
};
