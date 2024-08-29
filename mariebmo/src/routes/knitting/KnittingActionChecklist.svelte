<script lang="ts">
	import { knittingActionsStore } from '$lib/stores/knittingActionStore';
	import KnittingActionChecklist from './KnittingActionChecklistElement.svelte';
	import type { KnittingActions } from './interfaces';

  let actions: KnittingActions | null = {
		actions: [],
		fullWritten: '',
		visualize: ''
	};

	knittingActionsStore.subscribe((value) => {
		actions = value;
	});
</script>

<div>
	<div class="flex flex-col">
		{#if actions?.actions}
			{#each actions.actions as action, i}
				<KnittingActionChecklist {action} />
			{/each}
		{/if}
	</div>
</div>
