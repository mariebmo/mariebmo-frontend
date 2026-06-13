import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	redirect(301, '/feast-of-the-rings/watch/fellowship');
};
