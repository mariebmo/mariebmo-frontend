<script lang="ts">
	import { knittingCalculations } from './knitting.svelte';

	let fullWrittenText = $derived(knittingCalculations.fullWritten);
</script>

<div class="p-4 sm:p-6">
	{#if knittingCalculations.actions.length === 0}
		<div class="text-center py-8">
			<div class="text-gray-500 dark:text-gray-400 mb-4">
				<span class="material-symbols-outlined text-4xl">article</span>
			</div>
			<p class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
				No pattern calculated yet
			</p>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Enter your knitting parameters above to generate a pattern
			</p>
		</div>
	{:else}
		<div class="max-w-4xl mx-auto">
			<div
				class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 shadow-sm"
			>
				<div class="flex items-start gap-3">
					<span class="material-symbols-outlined text-amber-500 dark:text-amber-400 flex-shrink-0">
						article
					</span>
					<div
						class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base"
					>
						{fullWrittenText || 'No full written output yet.'}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
