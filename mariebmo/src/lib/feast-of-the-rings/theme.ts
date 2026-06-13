/** Shared feast UI palette — stone, wine rose, teal prep */
export const feastTheme = {
	watch: {
		solid: 'bg-rose-700 text-white hover:bg-rose-800',
		text: 'text-rose-700 dark:text-rose-400',
		textHover: 'hover:text-rose-800 dark:hover:text-rose-300',
		ring: 'ring-rose-400',
		border: 'border-rose-500',
		borderMuted: 'border-rose-300 dark:border-rose-700',
		surface: 'bg-rose-50 dark:bg-rose-950/30',
		surfaceText: 'text-rose-900 dark:text-rose-100',
		checkbox: 'text-rose-600 focus:ring-rose-500',
		badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
		mobileActive: 'text-rose-700 dark:text-rose-400'
	},
	plan: {
		solid: 'bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900',
		mobileActive: 'text-stone-900 underline decoration-2 underline-offset-4 dark:text-stone-100'
	},
	timeline: {
		track: 'bg-stone-200 dark:bg-stone-700/50',
		marker: 'bg-rose-500',
		markerGhost: 'bg-stone-300/70',
		markerRing: 'ring-rose-400',
		prepBar: 'bg-teal-400/90 dark:bg-teal-600/90',
		prepDot: 'bg-teal-600',
		prepBadge: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
		eatBadge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
		nextRow: 'bg-rose-50/80 dark:bg-rose-950/20',
		nextText: 'text-rose-800 dark:text-rose-300',
		timeText: 'text-rose-700 dark:text-rose-400'
	},
	filter: {
		badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200'
	},
	link: 'font-medium text-rose-700 hover:text-rose-800 dark:text-rose-400',
	selectedRing: 'ring-2 ring-rose-400',
	menuSelected: 'border-rose-500 bg-rose-50 dark:border-rose-600 dark:bg-rose-950/20'
} as const;
