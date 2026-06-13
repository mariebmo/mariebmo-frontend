<script lang="ts">
	import type { Dish } from '$lib/feast-of-the-rings/types';

	interface Props {
		dish: Dish;
		variant?: 'card' | 'list';
	}

	let { dish, variant = 'card' }: Props = $props();
</script>

{#if dish.sceneImage}
	<img
		src={dish.sceneImage}
		alt="Scene from {dish.scene} — {dish.name}"
		class="w-full object-cover
			{variant === 'card' ? 'aspect-video rounded-t-xl' : 'h-14 w-20 shrink-0 rounded-lg'}"
	/>
{:else}
	<div
		class="flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-900/60 dark:text-gray-500
			{variant === 'card' ? 'aspect-video rounded-t-xl' : 'h-14 w-20 shrink-0 rounded-lg'}"
		aria-hidden="true"
	>
		<span class="material-symbols-outlined {variant === 'card' ? 'text-4xl' : 'text-2xl'}">
			{dish.kinds.includes('drink') && !dish.kinds.includes('food') ? 'local_bar' : 'restaurant'}
		</span>
	</div>
{/if}
