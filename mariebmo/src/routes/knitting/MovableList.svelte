<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import KnittingActionFullyWritten from './KnittingActionFullyWritten.svelte';
	import KnittingActionShorthand from './KnittingActionShorthand.svelte';
	import KnittingActionVisual from './KnittingActionVisual.svelte';
	import KnittingActionChecklist from './KnittingActionChecklist.svelte';
	import { flip } from 'svelte/animate';
	import { SvelteComponent } from 'svelte';

	const flipDurationMs = 200;

	interface ComponentItem {
		id: string;
		component: typeof SvelteComponent<any, any, any>;
		visible: boolean;
		name: string;
	}

	let components: ComponentItem[] = [
		{ id: 'actionVisual', component: KnittingActionVisual, visible: true, name: 'Visual' },
		{
			id: 'actionToggleList',
			component: KnittingActionChecklist,
			visible: true,
			name: 'Checklist'
		},
		{
			id: 'actionWritten',
			component: KnittingActionFullyWritten,
			visible: true,
			name: 'Fully Written'
		},
		{ id: 'actionShorthand', component: KnittingActionShorthand, visible: true, name: 'Shorthand' }
	];

	let dragDisabled = true;

	const handleConsider = (e: CustomEvent) => {
		components = e.detail.items;
	};
	const handleFinalize = (e: CustomEvent) => {
		components = e.detail.items;
		// Ensure dragging is stopped on drag finish
		dragDisabled = true;
	};

	const startDrag = () => {
		dragDisabled = false;
	};
	const stopDrag = () => {
		dragDisabled = true;
	};
</script>

<div
	class="w-full"
	use:dndzone={{ items: components, dragDisabled, flipDurationMs }}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	{#each components as { id, component: Component, visible, name }, index (id)}
		<div animate:flip={{ duration: flipDurationMs }} class="mt-2 mb-2 w-full">
			<div
				class:even={index % 2 === 0}
				class:odd={index % 2 !== 0}
				class="flex py-3 flex-col justify-between items-center w-full fill-current text-amber-800 dark:text-orange-200 bg-orange-300 dark:bg-amber-700 rounded-sm"
			>
				<div class="flex flex-row justify-between items-center w-full">
					<!-- Drag handle -->

					<button
						class="drag-handle handle h-full w-10 pt-5 pl-5 pb-5 pr-5 mr-5"
						on:mousedown={startDrag}
						on:touchstart={startDrag}
						on:mouseup={stopDrag}
						on:touchend={stopDrag}
					>
						<span class="material-symbols-outlined"> drag_indicator </span>
					</button>

					<!-- Component -->
					<div class="flex-grow">
						{#if visible}
							<svelte:component this={Component} />
						{:else}
							<p>{name} is hidden</p>
						{/if}
					</div>

					<!-- Show/Hide button -->
					<div class="ml-5 pr-5">
						{#if visible}
							<button
								on:click={() =>
									(components = components.map((c) =>
										c.id === id ? { ...c, visible: false } : c
									))}
							>
								<span class="material-symbols-outlined"> visibility </span>
							</button>
						{:else}
							<button
								on:click={() =>
									(components = components.map((c) => (c.id === id ? { ...c, visible: true } : c)))}
							>
								<span class="material-symbols-outlined"> visibility_off </span>
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.drag-handle {
		cursor: grab;
	}

	.drag-handle:active {
		cursor: grabbing;
	}
</style>
