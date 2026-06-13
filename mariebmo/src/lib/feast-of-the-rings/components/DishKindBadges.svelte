<script lang="ts">
	import { KIND_LABELS, getKindClasses } from '$lib/feast-of-the-rings/labels';
	import type { FeastKind } from '$lib/feast-of-the-rings/types';

	interface Props {
		kinds: FeastKind[];
	}

	let { kinds }: Props = $props();
</script>

<div class="flex flex-wrap gap-1">
	{#each kinds as kind (kind)}
		<span class="rounded-full px-2 py-0.5 text-xs font-medium {getKindClasses(kind)}">
			{KIND_LABELS[kind]}
		</span>
	{/each}
</div>
