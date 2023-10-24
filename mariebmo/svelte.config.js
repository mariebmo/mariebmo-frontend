import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: adapter({
			// see the 'Deployment configuration' section below
		})
	},

	preprocess: [vitePreprocess({})]
};
