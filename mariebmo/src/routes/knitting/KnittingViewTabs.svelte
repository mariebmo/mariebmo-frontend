<script lang="ts">
	import KnittingActionVisual from './KnittingActionVisual.svelte';
	import KnittingActionShorthand from './KnittingActionShorthand.svelte';
	import KnittingActionFullyWritten from './KnittingActionFullyWritten.svelte';
	import KnittingActionChecklist from './KnittingActionChecklist.svelte';
	import { knittingCalculations } from './knitting.svelte';
	import { getSavedActiveTab, saveActiveTab, isValidTabId } from '../../lib/utils/localStorage';
	import { onMount } from 'svelte';

	interface Tab {
		id: string;
		label: string;
		icon: string;
		component: any;
	}

	const tabs: Tab[] = [
		{
			id: 'checklist',
			label: 'Checklist',
			icon: 'checklist',
			component: KnittingActionChecklist
		},
		{
			id: 'shorthand',
			label: 'Shorthand',
			icon: 'short_text',
			component: KnittingActionShorthand
		},
		{
			id: 'written',
			label: 'Full Written',
			icon: 'description',
			component: KnittingActionFullyWritten
		},
		{
			id: 'visual',
			label: 'Visual',
			icon: 'visibility',
			component: KnittingActionVisual
		}
	];

	let activeTabId = $state('visual');

	// Get valid tab IDs for validation
	const validTabIds = tabs.map((tab) => tab.id);

	function selectTab(tabId: string) {
		if (!isValidTabId(tabId, validTabIds)) {
			console.warn(`Invalid tab ID: ${tabId}. Falling back to 'visual'.`);
			tabId = 'visual';
		}

		activeTabId = tabId;

		// Save to localStorage
		const saved = saveActiveTab(tabId);
		if (!saved) {
			console.warn('Failed to save active tab to localStorage');
		}
	}

	// Load saved tab state on mount
	onMount(() => {
		const savedTabId = getSavedActiveTab();
		if (isValidTabId(savedTabId, validTabIds)) {
			activeTabId = savedTabId;
		} else {
			// If saved tab is invalid, save the default
			saveActiveTab('visual');
		}
	});

	function handleKeyDown(event: KeyboardEvent, tabId: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectTab(tabId);
		}
	}

	function handleArrowKeys(event: KeyboardEvent) {
		const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
		let newIndex = currentIndex;

		if (event.key === 'ArrowLeft') {
			newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
		} else if (event.key === 'ArrowRight') {
			newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
		}

		if (newIndex !== currentIndex) {
			event.preventDefault();
			selectTab(tabs[newIndex].id);
		}
	}

	// Only show tabs if there are knitting calculations to display
	const shouldShowTabs = $derived(
		knittingCalculations.actions.length > 0 ||
			knittingCalculations.visualize ||
			knittingCalculations.fullWritten
	);
</script>

{#if shouldShowTabs}
	<div class="knitting-tabs-container">
		<!-- Tab Navigation -->
		<div
			class="tab-navigation"
			role="tablist"
			aria-label="Knitting pattern views"
			onkeydown={handleArrowKeys}
		>
			{#each tabs as tab (tab.id)}
				<button
					class="tab-button"
					class:active={activeTabId === tab.id}
					role="tab"
					tabindex={activeTabId === tab.id ? 0 : -1}
					aria-selected={activeTabId === tab.id}
					aria-controls="panel-{tab.id}"
					onclick={() => selectTab(tab.id)}
					onkeydown={(e: KeyboardEvent) => handleKeyDown(e, tab.id)}
				>
					<span class="material-symbols-outlined tab-icon">{tab.icon}</span>
					<span class="tab-label">{tab.label}</span>
				</button>
			{/each}
		</div>

		<!-- Tab Content -->
		<div class="tab-content">
			{#each tabs as tab (tab.id)}
				<div
					id="panel-{tab.id}"
					class="tab-panel"
					class:active={activeTabId === tab.id}
					role="tabpanel"
					aria-labelledby="tab-{tab.id}"
					aria-hidden={activeTabId !== tab.id}
				>
					{#if activeTabId === tab.id}
						<svelte:component this={tab.component} />
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style lang="postcss">
	.knitting-tabs-container {
		@apply mt-6 bg-white dark:bg-amber-900 rounded-lg shadow-sm border border-amber-200 dark:border-amber-700 overflow-hidden;
	}

	.tab-navigation {
		@apply flex bg-amber-50 dark:bg-amber-950 border-b border-amber-200 dark:border-amber-700;
	}

	.tab-button {
		@apply flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-amber-700 dark:text-amber-300 bg-transparent border-none cursor-pointer transition-all duration-200 hover:bg-amber-100 dark:hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset;
	}

	.tab-button.active {
		@apply bg-white dark:bg-amber-900 text-amber-900 dark:text-amber-100 shadow-sm border-b-2 border-amber-600 dark:border-amber-400;
	}

	.tab-icon {
		@apply text-lg;
	}

	.tab-label {
		@apply hidden sm:inline;
	}

	.tab-content {
		@apply p-4;
	}

	.tab-panel {
		@apply hidden;
	}

	.tab-panel.active {
		@apply block;
	}

	/* Mobile responsive adjustments */
	@media (max-width: 640px) {
		.tab-button {
			@apply flex-col gap-1 px-2 py-2 text-xs;
		}

		.tab-icon {
			@apply text-base;
		}

		.tab-label {
			@apply inline text-xs;
		}
	}
</style>
