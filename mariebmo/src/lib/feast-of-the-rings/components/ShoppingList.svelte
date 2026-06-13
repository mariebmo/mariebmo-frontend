<script lang="ts">
	import { buildShoppingList, formatShoppingListForClipboard } from '$lib/feast-of-the-rings/shopping-list';
	import type { ShoppingListItem } from '$lib/feast-of-the-rings/types';

	interface Props {
		dishIds: string[];
		headcount: number;
	}

	let { dishIds, headcount }: Props = $props();

	let copied = $state(false);

	const items = $derived(buildShoppingList(dishIds, headcount));

	async function copyToClipboard(listItems: ShoppingListItem[]) {
		const text = formatShoppingListForClipboard(listItems);
		if (!text) return;

		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			copied = false;
		}
	}
</script>

<section class="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
	<div class="mb-4 flex items-center justify-between gap-4">
		<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Shopping list</h2>
		<button
			type="button"
			class="rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
			disabled={items.length === 0}
			onclick={() => copyToClipboard(items)}
		>
			{copied ? 'Copied!' : 'Copy list'}
		</button>
	</div>

	{#if items.length === 0}
		<p class="text-sm text-gray-500 dark:text-gray-400">Select dishes to build your list.</p>
	{:else}
		<ul class="space-y-2" role="list">
			{#each items as item (item.name + item.unit)}
				<li class="flex justify-between gap-4 text-sm text-gray-700 dark:text-gray-300">
					<span>{item.name}</span>
					<span class="font-mono whitespace-nowrap">
						{item.amount % 1 === 0 ? item.amount : item.amount.toFixed(2)}
						{item.unit}
					</span>
				</li>
			{/each}
		</ul>
	{/if}
</section>
