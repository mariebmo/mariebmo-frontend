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
	<div
		class="mt-8 bg-white dark:bg-amber-900 rounded-2xl shadow-lg border border-amber-200 dark:border-amber-700 overflow-hidden mx-2 sm:mx-0"
	>
		<!-- Tab Navigation -->
		<div
			class="flex bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-b border-amber-200 dark:border-amber-700 relative"
			role="tablist"
			aria-label="Knitting pattern views"
			tabindex="0"
			onkeydown={handleArrowKeys}
		>
			{#each tabs as tab (tab.id)}
				<button
					class="flex-1 flex items-center justify-center gap-2 px-2 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-300 bg-transparent border-none cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset relative overflow-hidden flex-col sm:flex-row {activeTabId ===
					tab.id
						? 'bg-white text-amber-900 '
						: ''}"
					class:rounded-tl-2xl={tab.id === 'checklist'}
					class:rounded-tr-2xl={tab.id === 'visual'}
					role="tab"
					tabindex={activeTabId === tab.id ? 0 : -1}
					aria-selected={activeTabId === tab.id}
					aria-controls="panel-{tab.id}"
					onclick={() => selectTab(tab.id)}
					onkeydown={(e: KeyboardEvent) => handleKeyDown(e, tab.id)}
				>
					<span
						class="material-symbols-outlined text-lg sm:text-xl relative z-10 transition-transform duration-200 {activeTabId ===
						tab.id
							? 'scale-110'
							: 'hover:scale-110'}">{tab.icon}</span
					>
					<span class="hidden sm:inline relative z-10 font-medium">{tab.label}</span>
					<span class="sm:hidden relative z-10 font-medium text-xs">{tab.label}</span>
				</button>
			{/each}
		</div>

		<!-- Tab Content -->
		<div
			class="p-4 sm:p-6 bg-gradient-to-br from-white to-amber-50 dark:from-amber-900 dark:to-orange-900"
		>
			{#each tabs as tab (tab.id)}
				<div
					id="panel-{tab.id}"
					class={activeTabId === tab.id ? 'block' : 'hidden'}
					role="tabpanel"
					aria-labelledby="tab-{tab.id}"
					aria-hidden={activeTabId !== tab.id}
				>
					{#if activeTabId === tab.id}
						{@const Component = tab.component}
						<Component />
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}
