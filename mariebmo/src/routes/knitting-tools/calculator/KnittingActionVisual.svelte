<script lang="ts">
	import { knittingCalculations } from './knitting.svelte';
	import { KnitSymbol } from './interfaces';

	function parseVisualSymbols(visualString: string) {
		// Split by spaces to get groups, then split each group into individual symbols
		const groups = visualString.split(' ').filter((s) => s.length > 0);
		const symbols: string[] = [];

		groups.forEach((group) => {
			// Split each group into individual characters
			symbols.push(...group.split(''));
		});

		return symbols;
	}

	function getSymbolStyle(symbol: string): string {
		switch (symbol) {
			case KnitSymbol.KNIT:
				return 'bg-blue-500 dark:bg-blue-600 text-white border-blue-600 dark:border-blue-700';
			case KnitSymbol.INCREASE:
				return 'bg-green-500 dark:bg-green-600 text-white border-green-600 dark:border-green-700';
			case KnitSymbol.DECREASE:
				return 'bg-red-500 dark:bg-red-600 text-white border-red-600 dark:border-red-700';
			default:
				return 'bg-gray-400 dark:bg-gray-600 text-white border-gray-500 dark:border-gray-700';
		}
	}

	function getSymbolLabel(symbol: string): string {
		switch (symbol) {
			case KnitSymbol.KNIT:
				return 'Knit';
			case KnitSymbol.INCREASE:
				return 'Increase';
			case KnitSymbol.DECREASE:
				return 'Decrease';
			default:
				return 'Unknown';
		}
	}

	let symbols = $derived(parseVisualSymbols(knittingCalculations.visualize));
	let symbolCounts = $derived(() => {
		const counts = {
			[KnitSymbol.KNIT]: 0,
			[KnitSymbol.INCREASE]: 0,
			[KnitSymbol.DECREASE]: 0
		};
		symbols.forEach((symbol) => {
			if (symbol in counts) {
				counts[symbol as keyof typeof counts]++;
			}
		});
		return counts;
	});
</script>

<div class="p-4 sm:p-6">
	{#if knittingCalculations.actions.length === 0}
		<div class="text-center py-8">
			<div class="text-gray-500 dark:text-gray-400 mb-4">
				<span class="material-symbols-outlined text-4xl">grid_on</span>
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
			<!-- Legend -->
			<div
				class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm mb-6"
			>
				<div class="flex items-center gap-2 mb-3">
					<span class="material-symbols-outlined text-teal-500 dark:text-teal-400">info</span>
					<span class="font-medium text-gray-700 dark:text-gray-300">Legend</span>
				</div>
				<div class="flex flex-wrap gap-3 text-sm">
					<div class="flex items-center gap-2">
						<div
							class="w-8 h-8 rounded-lg flex items-center justify-center font-bold {getSymbolStyle(
								KnitSymbol.KNIT
							)} border-2"
						>
							{KnitSymbol.KNIT}
						</div>
						<span class="text-gray-700 dark:text-gray-300">
							Knit ({symbolCounts()[KnitSymbol.KNIT]})
						</span>
					</div>
					<div class="flex items-center gap-2">
						<div
							class="w-8 h-8 rounded-lg flex items-center justify-center font-bold {getSymbolStyle(
								KnitSymbol.INCREASE
							)} border-2"
						>
							{KnitSymbol.INCREASE}
						</div>
						<span class="text-gray-700 dark:text-gray-300">
							Increase ({symbolCounts()[KnitSymbol.INCREASE]})
						</span>
					</div>
					<div class="flex items-center gap-2">
						<div
							class="w-8 h-8 rounded-lg flex items-center justify-center font-bold {getSymbolStyle(
								KnitSymbol.DECREASE
							)} border-2"
						>
							{KnitSymbol.DECREASE}
						</div>
						<span class="text-gray-700 dark:text-gray-300">
							Decrease ({symbolCounts()[KnitSymbol.DECREASE]})
						</span>
					</div>
				</div>
			</div>

			<!-- Visual Grid -->
			<div
				class="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700"
			>
				<div class="flex flex-wrap gap-2 justify-center items-center">
					{#each symbols as symbol, index (index)}
						<div
							class="w-5 h-5 sm:w-5 sm:h-5 rounded-lg flex items-center justify-center font-bold text-lg sm:text-sm {getSymbolStyle(
								symbol
							)} border-2 shadow-sm hover:shadow-md hover:scale-110 transform transition-all duration-200"
							role="img"
							aria-label="{getSymbolLabel(symbol)} stitch {index + 1}"
							title={getSymbolLabel(symbol)}
						>
							{symbol}
						</div>
					{/each}
				</div>
			</div>

			<div
				class="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 rounded-lg p-4 border border-amber-200 dark:border-amber-700 mt-6"
			>
				<div class="flex items-center gap-2 text-amber-700 dark:text-amber-300 text-sm">
					<span class="material-symbols-outlined">lightbulb</span>
					<span>
						Total stitches: <span class="font-bold">{symbols.length}</span> | Each square represents
						one stitch
					</span>
				</div>
			</div>
		</div>
	{/if}
</div>
