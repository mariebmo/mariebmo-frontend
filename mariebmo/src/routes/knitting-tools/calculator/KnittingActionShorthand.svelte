<script lang="ts">
	import type { KnittingAction } from './interfaces';
	import { knittingCalculations } from './knitting.svelte';

	let shorthandOutput = $derived(printShorthand(knittingCalculations.actions));

	const colors = [
		'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200',
		'bg-emerald-100 dark:bg-emerald-900 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200',
		'bg-amber-100 dark:bg-amber-900 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200',
		'bg-rose-100 dark:bg-rose-900 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200',
		'bg-violet-100 dark:bg-violet-900 border-violet-300 dark:border-violet-700 text-violet-800 dark:text-violet-200',
		'bg-cyan-100 dark:bg-cyan-900 border-cyan-300 dark:border-cyan-700 text-cyan-800 dark:text-cyan-200'
	];

	// Pre-compute color assignments for all actions
	let actionColorMap = $derived.by(() => {
		const map = new Map<string, number>();
		let nextColorIndex = 0;

		for (const action of knittingCalculations.actions) {
			const actionKey = `${action.actions.join(',')}-${action.count}`;
			if (!map.has(actionKey)) {
				map.set(actionKey, nextColorIndex);
				nextColorIndex = (nextColorIndex + 1) % colors.length;
			}
		}

		return map;
	});

	function printShorthand(actionArr: KnittingAction[]): string {
		let output = '';

		for (let i = 0; i < actionArr.length; i++) {
			let action = actionArr[i];

			if (action.count > 1) {
				output += '(' + action.actions.join(', ') + ') ' + action.count + ' times, ';
			} else {
				output += action.actions.join(', ') + ', ';
			}
		}

		output = output.replace(/(, )$/, '');
		return output;
	}

	function getActionColor(action: KnittingAction): string {
		const actionKey = `${action.actions.join(',')}-${action.count}`;
		const colorIndex = actionColorMap.get(actionKey) ?? 0;
		return colors[colorIndex];
	}
</script>

<div class="p-4 sm:p-6">
	{#if knittingCalculations.actions.length === 0}
		<div class="text-center py-8">
			<div class="text-gray-500 dark:text-gray-400 mb-4">
				<span class="material-symbols-outlined text-4xl">code</span>
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
			<!-- Compact one-line view -->
			<div
				class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 shadow-sm mb-6"
			>
				<div class="flex items-start gap-3">
					<span
						class="material-symbols-outlined text-indigo-500 dark:text-indigo-400 flex-shrink-0"
					>
						short_text
					</span>
					<p
						class="text-gray-700 dark:text-gray-300 leading-relaxed break-words font-mono text-sm sm:text-base"
					>
						{shorthandOutput}
					</p>
				</div>
			</div>

			<!-- Badge-style view -->
			<div class="flex flex-wrap gap-2">
				{#each knittingCalculations.actions as action, index}
					{#if action.count > 1}
						<div
							class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 {getActionColor(
								action
							)} shadow-sm"
						>
							<span class="font-semibold">({action.actions.join(', ')})</span>
							<span class="px-2 py-0.5 rounded-full bg-white/50 dark:bg-black/20 text-xs font-bold">
								×{action.count}
							</span>
						</div>
					{:else}
						<div
							class="inline-flex items-center px-3 py-2 rounded-lg border-2 {getActionColor(
								action
							)} shadow-sm"
						>
							<span class="font-semibold">{action.actions.join(', ')}</span>
						</div>
					{/if}
				{/each}
			</div>

			<div
				class="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mt-6"
			>
				<div class="text-center text-sm text-gray-600 dark:text-gray-400">
					<span class="font-medium">Tip:</span> Each colored segment represents one action in your pattern
				</div>
			</div>
		</div>
	{/if}
</div>
