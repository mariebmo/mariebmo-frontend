<script lang="ts">
	import { feastTheme } from '$lib/feast-of-the-rings/theme';
	import { TIER_LABELS } from '$lib/feast-of-the-rings/labels';
	import type { TierFilter, KindFilter, DishViewMode } from '$lib/feast-of-the-rings/types';

	interface Props {
		tierFilter: TierFilter;
		kindFilter: KindFilter;
		viewMode: DishViewMode;
		dishCount: number;
		onTierChange: (filter: TierFilter) => void;
		onKindChange: (filter: KindFilter) => void;
		onViewChange: (mode: DishViewMode) => void;
	}

	let {
		tierFilter,
		kindFilter,
		viewMode,
		dishCount,
		onTierChange,
		onKindChange,
		onViewChange
	}: Props = $props();

	const activeFilterCount = $derived(
		(tierFilter !== 'all' ? 1 : 0) + (kindFilter !== 'all' ? 1 : 0) + (viewMode !== 'cards' ? 1 : 0)
	);

	const tierOptions: { value: TierFilter; label: string }[] = [
		{ value: 'all', label: 'All tiers' },
		{ value: 'iconic', label: TIER_LABELS.iconic },
		{ value: 'suggested', label: TIER_LABELS.suggested },
		{ value: 'extra', label: TIER_LABELS.extra }
	];
</script>

<div class="flex items-center justify-between gap-4">
	<p class="text-sm text-gray-600 dark:text-gray-400">
		{dishCount} dish{dishCount === 1 ? '' : 'es'}
	</p>

	<details class="relative">
		<summary
			class="flex cursor-pointer list-none items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 [&::-webkit-details-marker]:hidden"
		>
			<span class="material-symbols-outlined text-base" aria-hidden="true">filter_list</span>
			Filters
			{#if activeFilterCount > 0}
				<span class="rounded-full px-1.5 py-0.5 text-xs font-semibold {feastTheme.filter.badge}">
					{activeFilterCount}
				</span>
			{/if}
		</summary>

		<div
			class="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="space-y-4">
				<div>
					<label
						for="filter-tier"
						class="mb-1.5 block text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
					>
						Tier
					</label>
					<select
						id="filter-tier"
						value={tierFilter}
						onchange={(event) => onTierChange(event.currentTarget.value as TierFilter)}
						class="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
					>
						{#each tierOptions as option (option.value)}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</div>

				<fieldset>
					<legend
						class="mb-1.5 block text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
					>
						Kind
					</legend>
					<div class="flex flex-wrap gap-1.5">
						{#each ['all', 'food', 'drink'] as option (option)}
							<button
								type="button"
								class="rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors
									{kindFilter === option
									? feastTheme.plan.solid
									: 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}"
								aria-pressed={kindFilter === option}
								onclick={() => onKindChange(option as KindFilter)}
							>
								{option}
							</button>
						{/each}
					</div>
				</fieldset>

				<fieldset>
					<legend
						class="mb-1.5 block text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
					>
						View
					</legend>
					<div class="flex gap-1.5">
						<button
							type="button"
							class="flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors
								{viewMode === 'cards'
								? feastTheme.plan.solid
								: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}"
							aria-pressed={viewMode === 'cards'}
							onclick={() => onViewChange('cards')}
						>
							<span class="material-symbols-outlined text-sm" aria-hidden="true">grid_view</span>
							Cards
						</button>
						<button
							type="button"
							class="flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors
								{viewMode === 'list'
								? feastTheme.plan.solid
								: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}"
							aria-pressed={viewMode === 'list'}
							onclick={() => onViewChange('list')}
						>
							<span class="material-symbols-outlined text-sm" aria-hidden="true">view_list</span>
							List
						</button>
					</div>
				</fieldset>
			</div>
		</div>
	</details>
</div>
