import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-auto';

export default {
	kit: {
		adapter: adapter({
			// see the 'Deployment configuration' section below
		})
	},

	preprocess: [vitePreprocess({})]
};
