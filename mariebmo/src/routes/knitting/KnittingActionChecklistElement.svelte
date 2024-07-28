<script lang="ts">
	import type { KnittingAction } from './interfaces';

	export let action: KnittingAction;

	interface SubAction {
		action: string;
		selected: boolean;
	}

	let subActions: SubAction[] = [];
	let icon: HTMLElement;

	for (let i = 0; i < action.count; i++) {
		subActions.push({ action: action.actions.join(', '), selected: false });
	}

	$: allSelected = subActions.every((subAction) => subAction.selected);
	let expanded = false;

	function toggleExpanded() {
		expanded = !expanded;

		if (icon) {
			if (expanded) {
				icon.style.transform = 'rotate(90deg)';
			} else {
				icon.style.transform = 'rotate(0deg)';
			}
		}
	}

	function toggleAll() {
		if (allSelected) {
			subActions.forEach((subAction) => {
				subAction.selected = false;
			});
		} else {
			subActions.forEach((subAction) => {
				subAction.selected = true;
			});
		}
	}
</script>

<div>
	<div class="flex flex-row align-middle">
		<input
			type="checkbox"
			class="accent-amber-600 dark:accent-amber-900 checkbox checkbox-large"
			bind:checked={allSelected}
			on:click={toggleAll}
		/>
		<p class:completed={allSelected} class="ml-2 align-middle">
			{action.actions.join(', ')}
			{#if action.count > 1}
				<span class="font-bold">(x{action.count})</span>
			{/if}
		</p>

		{#if action.count > 1}
			<button
				on:click={toggleExpanded}
				class="dropdown-icon-btn ml-2 mt-1 bg-amber-600 dark:bg-amber-800"
			>
				<iconify-icon icon="gridicons:dropdown" class="icon" bind:this={icon} />
			</button>
		{/if}
	</div>

	{#if expanded}
		<div class="flex flex-col mb-3 mt-2">
			{#each subActions as subAction, i}
				<div class="flex flex-row ml-5 my-0.5">
					<input
						type="checkbox"
						class="accent-amber-600 dark:accent-amber-900 checkbox"
						bind:checked={subAction.selected}
					/>
					<p class:completed={subAction.selected} class="ml-2">{subAction.action}</p>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.dropdown-icon-btn {
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 5px;
	}

	.icon {
		font-size: 1.2rem;
		rotate: 270deg;
	}

	.checkbox {
		border: none;
		border-radius: 5px;
		width: 1.1rem;
		height: 1.1rem;
	}

	.checkbox-large {
		width: 1.2rem;
		height: 1.2rem;
	}

	.completed {
		text-decoration: line-through;
	}
</style>
