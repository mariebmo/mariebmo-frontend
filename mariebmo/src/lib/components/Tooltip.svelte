<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		description?: string;
		placement?: 'top' | 'bottom';
		class?: string;
		onclick?: () => void;
		children: Snippet;
	}

	let {
		label,
		description,
		placement = 'top',
		class: className = '',
		onclick,
		children
	}: Props = $props();

	const placementClasses = placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';
</script>

{#if onclick}
	<button
		type="button"
		class="group/tooltip relative inline-flex {className}"
		aria-label="{label}{description ? ` · ${description}` : ''}"
		onpointerdown={(event) => event.stopPropagation()}
		{onclick}
	>
		{@render children()}
		<span
			role="tooltip"
			class="pointer-events-none absolute left-1/2 z-50 w-max max-w-52 -translate-x-1/2 rounded-lg bg-stone-900 px-2.5 py-1.5 text-left text-white opacity-0 shadow-lg transition-opacity group-hover/tooltip:opacity-100 group-focus-visible/tooltip:opacity-100 dark:bg-stone-100 dark:text-stone-900 {placementClasses}"
		>
			<span class="block text-xs font-medium">{label}</span>
			{#if description}
				<span class="mt-0.5 block text-[10px] opacity-80">{description}</span>
			{/if}
		</span>
	</button>
{:else}
	<span class="group/tooltip relative inline-flex {className}">
		{@render children()}
		<span
			role="tooltip"
			class="pointer-events-none absolute left-1/2 z-50 w-max max-w-52 -translate-x-1/2 rounded-lg bg-stone-900 px-2.5 py-1.5 text-left text-white opacity-0 shadow-lg transition-opacity group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 dark:bg-stone-100 dark:text-stone-900 {placementClasses}"
		>
			<span class="block text-xs font-medium">{label}</span>
			{#if description}
				<span class="mt-0.5 block text-[10px] opacity-80">{description}</span>
			{/if}
		</span>
	</span>
{/if}
