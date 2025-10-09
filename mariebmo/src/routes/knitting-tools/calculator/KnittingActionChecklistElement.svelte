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
		const completedCount = action.completedRepetitions || 0;
		return Array.from({ length: count }, (_, index) => ({
			action: actionString,
			isDone: index < completedCount
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

<div
	class="bg-white dark:bg-amber-900 rounded-xl border border-amber-200 dark:border-amber-700 mb-4 overflow-hidden mx-2 sm:mx-0"
>
	<!-- Main action row -->
	<div class="flex items-center p-3 sm:p-5 gap-3 sm:gap-4 relative">
		<input
			type="checkbox"
			class="w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 border-amber-400 dark:border-amber-600 text-amber-600 dark:text-amber-400 focus:ring-4 focus:ring-amber-200 dark:focus:ring-amber-800 focus:ring-offset-0 cursor-pointer hover:border-amber-500 dark:hover:border-amber-500 checked:bg-amber-500 dark:checked:bg-amber-600 checked:border-amber-500 dark:checked:border-amber-600"
			style="accent-color: rgb(217 119 6);"
			checked={actionTree.isDone}
			onchange={toggleMainAction}
			aria-label="Mark action as complete"
		/>

		<div class="flex-1 min-w-0">
			<p
				class="text-gray-900 dark:text-amber-50 font-semibold text-sm sm:text-lg leading-relaxed break-words {actionTree.isDone
					? 'line-through text-gray-500 dark:text-amber-300 opacity-60'
					: ''}"
			>
				{actionTree.action}
				{#if hasMultipleActions}
					<span
						class="inline-block ml-2 sm:ml-3 px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800 dark:to-orange-800 text-amber-800 dark:text-amber-200 text-xs sm:text-sm font-bold rounded-full shadow-sm border border-amber-200 dark:border-amber-600"
						>×{actionTree.count}</span
					>
				{/if}
			</p>
		</div>

		{#if hasMultipleActions}
			<button
				class="w-8 h-8 sm:w-10 sm:h-10 border border-amber-200 dark:border-amber-700 flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800 dark:to-orange-800 hover:from-amber-200 hover:to-orange-200 dark:hover:from-amber-700 dark:hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-700 focus:ring-offset-2 touch-manipulation"
				onclick={toggleExpanded}
				aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
				tabindex="0"
				onkeydown={(e) => handleKeyDown(e, toggleExpanded)}
			>
				<span
					class="material-symbols-outlined text-amber-700 dark:text-amber-300 text-lg sm:text-xl {isExpanded
						? 'rotate-180'
						: ''}"
				>
					expand_more
				</span>
			</button>
		{/if}
	</div>

	<!-- Expanded sub-actions -->
	{#if isExpanded && hasMultipleActions}
		<div
			class="border-t border-amber-200 dark:border-amber-700 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950"
		>
			<div
				class="px-3 py-2 sm:px-5 sm:py-3 border-b border-amber-200 dark:border-amber-700 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800 dark:to-orange-800"
			>
				<span
					class="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider flex items-center gap-2"
				>
					Individual repetitions:
				</span>
			</div>
			{#each actionTree.subActions as subAction, index (index)}
				<button
					class="w-full flex items-center p-3 pl-6 sm:p-4 sm:pl-10 gap-3 sm:gap-4 hover:bg-amber-100 dark:hover:bg-amber-900 text-left border-none bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset relative touch-manipulation"
					class:rounded-b-xl={index === actionTree.subActions.length - 1}
					onclick={() => toggleSubAction(index)}
					tabindex="0"
					onkeydown={(e) => handleKeyDown(e, () => toggleSubAction(index))}
				>
					<input
						type="checkbox"
						class="w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 focus:ring-3 focus:ring-amber-200 dark:focus:ring-amber-800 focus:ring-offset-0 cursor-pointer hover:border-amber-400 dark:hover:border-amber-500 checked:bg-amber-500 dark:checked:bg-amber-600 checked:border-amber-500 dark:checked:border-amber-600"
						style="accent-color: rgb(217 119 6);"
						checked={subAction.isDone}
						aria-label="Mark repetition {index + 1} as complete"
						tabindex="-1"
						readonly
					/>
					<p
						class="text-gray-800 dark:text-amber-100 text-sm sm:text-base font-medium break-words {subAction.isDone
							? 'line-through text-gray-500 dark:text-amber-400 opacity-70'
							: ''}"
					>
						{subAction.action}
					</p>
				</button>
			{/each}
		</div>
	{/if}
</div>
