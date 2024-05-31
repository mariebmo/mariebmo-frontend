/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				magenta: {
					100: '#e9b8c9',
					200: '#dd9ab2',
					300: '#f27dbb',
					400: '#b12c80',
					500: '#a31a5d',
					600: '#7b1346',
					700: '#49142d',
					800: '#250d18',
					900: '#140d10'
				}
			}
		}
	},
	plugins: []
};
