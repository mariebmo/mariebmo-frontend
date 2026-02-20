<script lang="ts">
	import { ProjectCardColor } from './project';
	import { CardColor, getCardClasses } from '$lib/utils/cardStyles';
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
		expanded: _expanded = false
	}: Props = $props();

	function mapProjectColorToCardColor(projectColor: ProjectCardColor): CardColor {
		switch (projectColor) {
			case ProjectCardColor.PINK:
				return CardColor.PINK;
			case ProjectCardColor.ORANGE:
				return CardColor.ORANGE;
			case ProjectCardColor.BLUE:
				return CardColor.BLUE;
			case ProjectCardColor.GREEN:
				return CardColor.GREEN;
			case ProjectCardColor.RED:
				return CardColor.RED;
			case ProjectCardColor.YELLOW:
				return CardColor.YELLOW;
			case ProjectCardColor.PURPLE:
				return CardColor.PURPLE;
			default:
				return CardColor.PINK;
		}
	}

	let cardClasses = $derived(
		getCardClasses({
			color: mapProjectColorToCardColor(color),
			variant: filled ? 'filled' : 'outline',
			rounded: 'xl'
		})
	);
</script>

<section>
	<a href={link}>
		<div class="m-2 flex w-auto max-w-96 flex-col justify-center p-4 {cardClasses}">
			<div class="flex flex-row items-center gap-2">
				{#if icon}
					<span class="material-symbols-outlined">{icon}</span>
				{/if}
				<h2 class="text-2xl font-bold">{header}</h2>
			</div>

			<p class="text-sm">{description}</p>
		</div>
	</a>
</section>
