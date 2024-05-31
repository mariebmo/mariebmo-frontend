import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		proxy: {
			'/api/attensi-aoc' : 'https://adventofcode.com/2023/leaderboard/private/view/1247755.json'
		}
	}
});
