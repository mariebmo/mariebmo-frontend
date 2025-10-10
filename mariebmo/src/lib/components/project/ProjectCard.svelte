<script lang="ts">
	import { ProjectCardColor } from './project';
	import type { Component } from 'svelte';

	interface Props {
		header?: string;
		description?: string;
		link?: string;
		icon?: string;
		color?: ProjectCardColor;
		filled?: boolean;
		expanded?: boolean;

		expandedContent?: Component;
	}

	let {
		header = 'Project',
		description = 'Description',
		link = '/',
		color = ProjectCardColor.PINK,
		icon = undefined,
		filled = false,
		expanded = false
	}: Props = $props();

	let cardClass = $derived(getCardClass(color));

	function getCardClass(color: ProjectCardColor): string {
		switch (color) {
			case ProjectCardColor.PINK:
				return `pink-card ${filled ? 'filled' : 'outline'}`;
			case ProjectCardColor.ORANGE:
				return `orange-card ${filled ? 'filled' : 'outline'}`;
			case ProjectCardColor.BLUE:
				return `blue-card ${filled ? 'filled' : 'outline'}`;
			case ProjectCardColor.GREEN:
				return `green-card ${filled ? 'filled' : 'outline'}`;
			case ProjectCardColor.RED:
				return `red-card ${filled ? 'filled' : 'outline'}`;
			case ProjectCardColor.YELLOW:
				return `yellow-card ${filled ? 'filled' : 'outline'}`;
			case ProjectCardColor.PURPLE:
				return `purple-card ${filled ? 'filled' : 'outline'}`;
			default:
				return `pink-card ${filled ? 'filled' : 'outline'}`;
		}
	}
</script>

<section>
	<a href={link}>
		<div class={`card ${cardClass}`}>
			<div class="flex flex-row gap-2 items-center">
				{#if icon}
					<span class="material-symbols-outlined">{icon}</span>
				{/if}
				<h2 class="text-2xl font-bold">{header}</h2>
			</div>

			<p class="text-sm">{description}</p>
		</div>
	</a>
</section>

<style>
	.card {
		@apply flex flex-col justify-center rounded-xl p-4 w-auto max-w-96 m-2;
	}

	.pink-card {
		&.filled {
			@apply bg-gradient-to-r from-pink-500 to-pink-400 text-white;
			&:hover {
				@apply bg-gradient-to-r from-pink-500/90 to-pink-400/90;
			}
		}
		&.outline {
			@apply border border-pink-500 text-pink-500 bg-gradient-to-r from-pink-500/5 to-pink-400/5;
			&:hover {
				@apply bg-gradient-to-r from-pink-500/10 to-pink-400/10;
			}
		}
	}

	.orange-card {
		&.filled {
			@apply bg-gradient-to-r from-orange-500 to-orange-400 text-white;
			&:hover {
				@apply bg-gradient-to-r from-orange-500/90 to-orange-400/90;
			}
		}
		&.outline {
			@apply border border-orange-500 text-orange-500 bg-gradient-to-r from-orange-500/10 to-orange-400/10;
			&:hover {
				@apply bg-gradient-to-r from-orange-500/20 to-orange-400/20;
			}
		}
	}

	.blue-card {
		&.filled {
			@apply bg-gradient-to-r from-blue-500 to-blue-400 text-white;
			&:hover {
				@apply bg-gradient-to-r from-blue-500/90 to-blue-400/90;
			}
		}
		&.outline {
			@apply border border-blue-500 text-blue-500 bg-gradient-to-r from-blue-500/10 to-blue-400/10;
			&:hover {
				@apply bg-gradient-to-r from-blue-500/20 to-blue-400/20;
			}
		}
	}

	.green-card {
		&.filled {
			@apply bg-gradient-to-r from-green-500 to-green-400 text-white;
			&:hover {
				@apply bg-gradient-to-r from-green-500/90 to-green-400/90;
			}
		}
		&.outline {
			@apply border border-green-500 text-green-500 bg-gradient-to-r from-green-500/10 to-green-400/10;
			&:hover {
				@apply bg-gradient-to-r from-green-500/20 to-green-400/20;
			}
		}
	}

	.red-card {
		&.filled {
			@apply bg-gradient-to-r from-red-500 to-red-400 text-white;
			&:hover {
				@apply bg-gradient-to-r from-red-500/90 to-red-400/90;
			}
		}
		&.outline {
			@apply border border-red-500 text-red-500 bg-gradient-to-r from-red-500/10 to-red-400/10;
			&:hover {
				@apply bg-gradient-to-r from-red-500/20 to-red-400/20;
			}
		}
	}

	.yellow-card {
		&.filled {
			@apply bg-gradient-to-r from-yellow-500 to-yellow-400 text-white;
			&:hover {
				@apply bg-gradient-to-r from-yellow-500/90 to-yellow-400/90;
			}
		}
		&.outline {
			@apply border border-yellow-500 text-yellow-500 bg-gradient-to-r from-yellow-500/10 to-yellow-400/10;
			&:hover {
				@apply bg-gradient-to-r from-yellow-500/20 to-yellow-400/20;
			}
		}
	}

	.purple-card {
		&.filled {
			@apply bg-gradient-to-r from-purple-500 to-purple-400 text-white;
			&:hover {
				@apply bg-gradient-to-r from-purple-500/90 to-purple-400/90;
			}
		}
		&.outline {
			@apply border border-purple-500 text-purple-500 bg-gradient-to-r from-purple-500/10 to-purple-400/10;
			&:hover {
				@apply bg-gradient-to-r from-purple-500/20 to-purple-400/20;
			}
		}
	}
</style>
