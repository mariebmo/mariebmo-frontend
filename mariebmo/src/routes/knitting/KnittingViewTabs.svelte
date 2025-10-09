<script lang="ts">
	import KnittingActionVisual from './KnittingActionVisual.svelte';
	import KnittingActionShorthand from './KnittingActionShorthand.svelte';
	import KnittingActionFullyWritten from './KnittingActionFullyWritten.svelte';
	import KnittingActionChecklist from './KnittingActionChecklist.svelte';
	import KnittingActionInteractive from './KnittingActionInteractive.svelte';
	import { knittingCalculations } from './knitting.svelte';
	import { getSavedActiveTab, saveActiveTab, isValidTabId } from '../../lib/utils/localStorage';
	import { onMount, onDestroy } from 'svelte';

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
			id: 'interactive',
			label: 'Interactive',
			icon: 'play_arrow',
			component: KnittingActionInteractive
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
	let isFullscreen = $state(false);

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

		// Add global keyboard listener for Escape key
		document.addEventListener('keydown', handleFullscreenKeyDown);
	});

	onDestroy(() => {
		document.removeEventListener('keydown', handleFullscreenKeyDown);
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

	function toggleFullscreen() {
		isFullscreen = !isFullscreen;
	}

	function exitFullscreen() {
		isFullscreen = false;
	}

	function handleFullscreenKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			exitFullscreen();
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
	{#if isFullscreen}
		<!-- Fullscreen Mode -->
		<div class="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
			<!-- Fullscreen Header -->
			<div
				class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-b border-amber-200 dark:border-amber-700"
			>
				<div class="flex items-center gap-3">
					<button
						class="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-700 transition-all duration-200 touch-manipulation"
						onclick={exitFullscreen}
						tabindex="0"
						aria-label="Exit fullscreen mode"
					>
						<span class="material-symbols-outlined text-lg">arrow_back</span>
					</button>
					<div>
						<h2 class="text-lg font-bold text-gray-900 dark:text-gray-100">
							{tabs.find((tab) => tab.id === activeTabId)?.label || 'Knitting Pattern'}
						</h2>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							Press Escape or click back to exit fullscreen
						</p>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<!-- Tab switcher in fullscreen -->
					<div class="flex gap-1">
						{#each tabs as tab (tab.id)}
							<button
								class="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 {activeTabId ===
								tab.id
									? 'bg-amber-500 text-white'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'}"
								onclick={() => selectTab(tab.id)}
								tabindex="0"
								aria-label="Switch to {tab.label} view"
							>
								<span class="material-symbols-outlined text-lg">{tab.icon}</span>
							</button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Fullscreen Content -->
			<div class="flex-1 overflow-auto">
				{#each tabs as tab (tab.id)}
					{#if activeTabId === tab.id}
						{@const Component = tab.component}
						<Component />
					{/if}
				{/each}
			</div>
		</div>
	{:else}
		<!-- Fullscreen Toggle Button -->
		<div class="flex justify-center py-4 w-full">
			<button
				class="flex items-center w-full px-4 py-2 gap-2 justify-center bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-700 transition-all duration-200 touch-manipulation"
				onclick={toggleFullscreen}
				tabindex="0"
				aria-label="Enter fullscreen mode"
			>
				<span class="material-symbols-outlined text-sm">fullscreen</span>
				<p>Fullscreen</p>
			</button>
		</div>

		<!-- Normal Mode -->
		<div
			class=" bg-white dark:bg-amber-900 rounded-2xl shadow-sm border border-amber-200 dark:border-amber-700 overflow-hidden mx-2 sm:mx-0"
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
							? 'bg-amber-200 text-amber-900 dark:text-amber-100 dark:bg-amber-800'
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
{/if}
