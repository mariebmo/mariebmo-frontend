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

	$: console.log(expanded);
	$: console.log(subActions);
</script>

<div class="mb-3">
	<div class="flex flex-row align-middle">
		<input
			type="checkbox"
			class="checkbox checkbox-large"
			bind:checked={allSelected}
			on:click={toggleAll}
		/>
		{#if allSelected}
			<p class="ml-2 line-through">
				{action.actions} <span class="font-bold">(x{action.count})</span>
			</p>
		{:else}
			<p class="ml-2">{action.actions} (x{action.count})</p>
		{/if}

		{#if action.count > 1}
			<button on:click={toggleExpanded} class="dropdown-icon-btn ml-2">
				<iconify-icon icon="gridicons:dropdown" class="icon" bind:this={icon} />
			</button>
		{/if}
	</div>

	{#if expanded}
		<div class="flex flex-col">
			{#each subActions as subAction, i}
				<div class="flex flex-row ml-5">
					<input type="checkbox" class="checkbox" bind:checked={subAction.selected} />
					{#if subAction.selected}
						<p class="ml-2 line-through">{subAction.action}</p>
					{:else}
						<p class="ml-2">{subAction.action}</p>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.dropdown-icon-btn {
		background-color: #92410e8d;
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
		background-color: #92410e8d;
		accent-color: #92410e8d;
	}

	.checkbox-large {
		width: 1.2rem;
		height: 1.2rem;
	}
</style>
