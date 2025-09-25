<script lang="ts">
	import KnittingActionChecklist from './KnittingActionChecklistElement.svelte';
	import { knittingCalculations } from './knitting.svelte';
</script>

<div>
	<div class="flex flex-col">
		{#if knittingCalculations?.actions}
			{#each knittingCalculations.actions as action, i}
				<KnittingActionChecklist {action} />
			{/each}
		{/if}
	</div>
</div>
