<script lang="ts">
	import type { KnittingAction } from './interfaces';

	let { action }: { action: KnittingAction } = $props();

	interface ActionTree {
		action: string;
		subActions: SubAction[];
		count: number;
		isDone: boolean;
	}

	interface SubAction {
		action: string;
		isDone: boolean;
	}

	let isExpanded = $state(false);
	let actionTree = $state(createInitialActionTree());

	function createInitialActionTree(): ActionTree {
		return {
			action: '',
			subActions: [],
			count: 0,
			isDone: false
		};
	}

	function createActionString(actions: string[]): string {
		return actions.join(', ');
	}

	function createSubActions(count: number, actionString: string): SubAction[] {
		return Array.from({ length: count }, () => ({
			action: actionString,
			isDone: false
		}));
	}

	// Initialize actionTree when action changes
	$effect(() => {
		const actionString = createActionString(action.actions);
		actionTree = {
			action: actionString,
			subActions: createSubActions(action.count, actionString),
			count: action.count,
			isDone: false
		};
	});

	// Derived state to check if all sub-actions are completed
	let allSubActionsCompleted = $derived(
		actionTree.subActions.length > 0 && actionTree.subActions.every((sub) => sub.isDone)
	);

	// Effect to sync main action with sub-actions
	$effect(() => {
		if (actionTree.count > 1) {
			actionTree.isDone = allSubActionsCompleted;
		}
	});

	function toggleMainAction() {
		actionTree.isDone = !actionTree.isDone;
		// When toggling main action, sync all sub-actions
		if (hasMultipleActions) {
			syncSubActionsWithMain();
		}
	}

	function syncSubActionsWithMain() {
		actionTree.subActions.forEach((sub) => {
			sub.isDone = actionTree.isDone;
		});
	}

	function toggleSubAction(index: number) {
		if (index < 0 || index >= actionTree.subActions.length) {
			console.warn('Invalid sub-action index:', index);
			return;
		}

		actionTree.subActions[index].isDone = !actionTree.subActions[index].isDone;
		// Trigger reactivity by reassigning the array
		actionTree.subActions = [...actionTree.subActions];
	}

	function toggleExpanded() {
		isExpanded = !isExpanded;
	}

	function handleKeyDown(event: KeyboardEvent, callback: () => void) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			callback();
		}
	}

	// Computed properties
	const hasMultipleActions = $derived(actionTree.count > 1);
</script>

<div class="knitting-action-card">
	<!-- Main action row -->
	<div class="main-action-row">
		<input
			type="checkbox"
			class="main-checkbox"
			checked={actionTree.isDone}
			onchange={toggleMainAction}
			aria-label="Mark action as complete"
		/>

		<div class="action-content">
			<p class="action-text" class:completed={actionTree.isDone}>
				{actionTree.action}
				{#if hasMultipleActions}
					<span class="count-badge">×{actionTree.count}</span>
				{/if}
			</p>
		</div>

		{#if hasMultipleActions}
			<button
				class="expand-button"
				onclick={toggleExpanded}
				aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
				tabindex="0"
				onkeydown={(e) => handleKeyDown(e, toggleExpanded)}
			>
				<span class="material-symbols-outlined expand-icon" class:rotated={isExpanded}>
					expand_more
				</span>
			</button>
		{/if}
	</div>

	<!-- Expanded sub-actions -->
	{#if isExpanded && hasMultipleActions}
		<div class="sub-actions-container">
			<div class="sub-actions-header">
				<span class="sub-actions-title">Individual repetitions:</span>
			</div>
			{#each actionTree.subActions as subAction, index (index)}
				<button
					class="sub-action-row w-full"
					onclick={() => toggleSubAction(index)}
					tabindex="0"
					onkeydown={(e) => handleKeyDown(e, () => toggleSubAction(index))}
				>
					<input
						type="checkbox"
						class="sub-checkbox"
						checked={subAction.isDone}
						aria-label="Mark repetition {index + 1} as complete"
						tabindex="-1"
						readonly
					/>
					<p class="sub-action-text" class:completed={subAction.isDone}>
						{subAction.action}
					</p>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.knitting-action-card {
		@apply bg-white dark:bg-amber-900 rounded-lg shadow-sm border border-amber-200 dark:border-amber-700 mb-3 overflow-hidden transition-all duration-200 hover:shadow-md;
	}

	.main-action-row {
		@apply flex items-center p-4 gap-3;
	}

	.main-checkbox {
		@apply w-5 h-5 rounded border-2 border-amber-400 dark:border-amber-600 text-amber-600 dark:text-amber-400 focus:ring-2 focus:ring-amber-500 focus:ring-offset-0 transition-colors duration-200;
		accent-color: rgb(217 119 6); /* amber-600 */
	}

	.action-content {
		@apply flex-1;
	}

	.action-text {
		@apply text-gray-900 dark:text-amber-50 font-medium text-base leading-relaxed transition-all duration-200;
	}

	.action-text.completed {
		@apply line-through text-gray-500 dark:text-amber-300 opacity-75;
	}

	.count-badge {
		@apply inline-block ml-2 px-2 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-sm font-semibold rounded-full;
	}

	.expand-button {
		@apply w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-800 hover:bg-amber-200 dark:hover:bg-amber-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1;
	}

	.expand-icon {
		@apply text-amber-700 dark:text-amber-300 text-lg transition-transform duration-200;
	}

	.expand-icon.rotated {
		@apply rotate-180;
	}

	.sub-actions-container {
		@apply border-t border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950;
	}

	.sub-actions-header {
		@apply px-4 py-2 border-b border-amber-200 dark:border-amber-700;
	}

	.sub-actions-title {
		@apply text-sm font-medium text-amber-700 dark:text-amber-300 uppercase tracking-wide;
	}

	.sub-action-row {
		@apply flex items-center p-3 pl-8 gap-3 hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors duration-150 text-left border-none bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset;
	}

	.sub-checkbox {
		@apply w-4 h-4 rounded border border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 focus:ring-2 focus:ring-amber-500 focus:ring-offset-0 transition-colors duration-200;
		accent-color: rgb(217 119 6); /* amber-600 */
	}

	.sub-action-text {
		@apply text-gray-800 dark:text-amber-100 text-sm transition-all duration-200;
	}

	.sub-action-text.completed {
		@apply line-through text-gray-500 dark:text-amber-400 opacity-75;
	}
</style>
