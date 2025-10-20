const mariebmoColors = {
	transparent: 'transparent',
	current: 'currentColor',
	'mariebmo-orange': {
		50: '#FCF8F8',
		100: '#FFD4C0',
		200: '#FFCAB4',
		300: '#fff',
		400: '#fff',
		500: '#fff',
		600: '#D7691A',
		700: '#CE5700',
		800: '#fff',
		900: '#fff',
		950: '#662B00'
	},
	'mariebmo-blue': {
		50: '#F2FAFF',
		100: '#D0EEFF',
		200: '#C6EAFF',
		300: '#fff',
		400: '#fff',
		500: '#fff',
		600: '#217AFF',
		700: '#0066FF',
		800: '#fff',
		900: '#fff',
		950: '#053172'
	},
	'mariebmo-green': {
		50: '#F4FFF2',
		100: '#D2F6B4',
		200: '#C8F4A7',
		300: '#fff',
		400: '#fff',
		500: '#fff',
		600: '#19D241',
		700: '#00BF29',
		800: '#fff',
		900: '#fff',
		950: '#066219'
	},
	'mariebmo-red': {
		50: '#FFF2F2',
		100: '#FFD2D2',
		200: '#FFC8C8',
		300: '#fff',
		400: '#fff',
		500: '#fff',
		600: '#D21919',
		700: '#BF0000',
		800: '#fff',
		900: '#fff',
		950: '#661919'
	},
	'mariebmo-yellow': {
		50: '#FFFAF2',
		100: '#FFEEC8',
		200: '#FFE8BE',
		300: '#fff',
		400: '#fff',
		500: '#fff',
		600: '#FFD219',
		700: '#FFBF00',
		800: '#fff',
		900: '#fff',
		950: '#726619'
	},
	'mariebmo-purple': {
		50: '#F9EBFE',
		100: '#EFC0FF',
		200: '#EBB4FF',
		300: '#fff',
		400: '#fff',
		500: '#fff',
		600: '#9D26BB',
		700: '#940BB7',
		800: '#fff',
		900: '#fff',
		950: '#500862'
	},
	'mariebmo-gray': {
		0: '#FFFFFF',
		50: '#F9F3F3',
		100: '#E4E4E4',
		200: '#C8C8C8',
		300: '#fff',
		400: '#fff',
		500: '#fff',
		600: '#7C7C7C',
		700: '#6B6B6B',
		800: '#fff',
		900: '#fff',
		950: '#2C2B2B',
		1000: '#000000'
	},
	'mariebmo-pink': {
		50: '#FFEFF9',
		100: '#FDD0EB',
		200: '#FCC6E6',
		300: '#fff',
		400: '#fff',
		500: '#fff',
		600: '#F233A6',
		700: '#E8008B',
		800: '#fff',
		900: '#fff',
		950: '#740045'
	}
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				...mariebmoColors
			}
		}
	}
};
