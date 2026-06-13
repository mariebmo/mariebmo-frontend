<script lang="ts">
	import type { TierFilter } from '$lib/feast-of-the-rings/types';
	import { TIER_LABELS } from '$lib/feast-of-the-rings/labels';

	interface Props {
		tierFilter: TierFilter;
		onchange: (filter: TierFilter) => void;
	}

	let { tierFilter, onchange }: Props = $props();

	const options: { value: TierFilter; label: string }[] = [
		{ value: 'all', label: 'All tiers' },
		{ value: 'iconic', label: TIER_LABELS.iconic },
		{ value: 'suggested', label: TIER_LABELS.suggested },
		{ value: 'extra', label: TIER_LABELS.extra }
	];

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		onchange(target.value as TierFilter);
	}
</script>

<label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
	<span class="font-medium">Show</span>
	<select
		value={tierFilter}
		onchange={handleChange}
		class="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
		aria-label="Filter by tier"
	>
		{#each options as option (option.value)}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</label>
