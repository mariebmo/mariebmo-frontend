export enum CardColor {
	PINK = 'pink',
	ORANGE = 'orange',
	BLUE = 'blue',
	GREEN = 'green',
	RED = 'red',
	YELLOW = 'yellow',
	PURPLE = 'purple',
	WHITE = 'white'
}

export type CardVariant = 'filled' | 'outline';

interface CardStyleOptions {
	color?: CardColor;
	variant?: CardVariant;
	hover?: boolean;
	shadow?: boolean;
	rounded?: 'sm' | 'md' | 'lg' | 'xl';
}

export function getCardClasses(options: CardStyleOptions = {}): string {
	const {
		color = CardColor.PINK,
		variant = 'outline',
		hover = true,
		shadow = true,
		rounded = 'lg'
	} = options;

	const baseClasses = [`rounded-${rounded}`, 'transition-all', 'duration-200'];

	if (shadow) {
		baseClasses.push('shadow-md');
		if (hover) {
			baseClasses.push('hover:shadow-lg');
		}
	}

	const colorClasses = getColorClasses(color, variant, hover);

	return [...baseClasses, ...colorClasses].join(' ');
}

function getColorClasses(color: CardColor, variant: CardVariant, hover: boolean): string[] {
	const classes: string[] = [];

	switch (color) {
		case CardColor.PINK:
			if (variant === 'filled') {
				classes.push('bg-gradient-to-r', 'from-pink-500', 'to-pink-400', 'text-white');
				if (hover) {
					classes.push('hover:from-pink-600', 'hover:to-pink-500');
				}
			} else {
				classes.push(
					'border',
					'border-pink-500',
					'text-pink-500',
					'bg-gradient-to-r',
					'from-pink-500/5',
					'to-pink-400/5'
				);
				if (hover) {
					classes.push('hover:from-pink-500/10', 'hover:to-pink-400/10');
				}
			}
			break;

		case CardColor.ORANGE:
			if (variant === 'filled') {
				classes.push('bg-gradient-to-r', 'from-orange-500', 'to-orange-400', 'text-white');
				if (hover) {
					classes.push('hover:from-orange-600', 'hover:to-orange-500');
				}
			} else {
				classes.push(
					'border',
					'border-orange-500',
					'text-orange-500',
					'bg-gradient-to-r',
					'from-orange-500/10',
					'to-orange-400/10'
				);
				if (hover) {
					classes.push('hover:from-orange-500/20', 'hover:to-orange-400/20');
				}
			}
			break;

		case CardColor.BLUE:
			if (variant === 'filled') {
				classes.push('bg-gradient-to-r', 'from-blue-500', 'to-blue-400', 'text-white');
				if (hover) {
					classes.push('hover:from-blue-600', 'hover:to-blue-500');
				}
			} else {
				classes.push(
					'border',
					'border-blue-500',
					'text-blue-500',
					'bg-gradient-to-r',
					'from-blue-500/10',
					'to-blue-400/10'
				);
				if (hover) {
					classes.push('hover:from-blue-500/20', 'hover:to-blue-400/20');
				}
			}
			break;

		case CardColor.GREEN:
			if (variant === 'filled') {
				classes.push('bg-gradient-to-r', 'from-green-500', 'to-green-400', 'text-white');
				if (hover) {
					classes.push('hover:from-green-600', 'hover:to-green-500');
				}
			} else {
				classes.push(
					'border',
					'border-green-500',
					'text-green-500',
					'bg-gradient-to-r',
					'from-green-500/10',
					'to-green-400/10'
				);
				if (hover) {
					classes.push('hover:from-green-500/20', 'hover:to-green-400/20');
				}
			}
			break;

		case CardColor.RED:
			if (variant === 'filled') {
				classes.push('bg-gradient-to-r', 'from-red-500', 'to-red-400', 'text-white');
				if (hover) {
					classes.push('hover:from-red-600', 'hover:to-red-500');
				}
			} else {
				classes.push(
					'border',
					'border-red-500',
					'text-red-500',
					'bg-gradient-to-r',
					'from-red-500/10',
					'to-red-400/10'
				);
				if (hover) {
					classes.push('hover:from-red-500/20', 'hover:to-red-400/20');
				}
			}
			break;

		case CardColor.YELLOW:
			if (variant === 'filled') {
				classes.push('bg-gradient-to-r', 'from-yellow-500', 'to-yellow-400', 'text-white');
				if (hover) {
					classes.push('hover:from-yellow-600', 'hover:to-yellow-500');
				}
			} else {
				classes.push(
					'border',
					'border-yellow-500',
					'text-yellow-500',
					'bg-gradient-to-r',
					'from-yellow-500/10',
					'to-yellow-400/10'
				);
				if (hover) {
					classes.push('hover:from-yellow-500/20', 'hover:to-yellow-400/20');
				}
			}
			break;

		case CardColor.PURPLE:
			if (variant === 'filled') {
				classes.push('bg-gradient-to-r', 'from-purple-500', 'to-purple-400', 'text-white');
				if (hover) {
					classes.push('hover:from-purple-600', 'hover:to-purple-500');
				}
			} else {
				classes.push(
					'border',
					'border-purple-500',
					'text-purple-500',
					'bg-gradient-to-r',
					'from-purple-500/10',
					'to-purple-400/10'
				);
				if (hover) {
					classes.push('hover:from-purple-500/20', 'hover:to-purple-400/20');
				}
			}
			break;

		case CardColor.WHITE:
			if (variant === 'filled') {
				classes.push('bg-white', 'text-gray-900', 'dark:bg-gray-800', 'dark:text-white');
			} else {
				classes.push(
					'border',
					'border-gray-300',
					'text-gray-900',
					'bg-white',
					'dark:border-gray-600',
					'dark:bg-gray-800',
					'dark:text-white'
				);
			}
			break;
	}

	return classes;
}
