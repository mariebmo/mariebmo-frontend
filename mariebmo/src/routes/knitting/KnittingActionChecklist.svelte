<script lang="ts">
	import KnittingActionChecklistElement from './KnittingActionChecklistElement.svelte';
	import { knittingCalculations } from './knitting.svelte';

	$inspect(knittingCalculations.actions);
</script>

<div>
	<div class="flex flex-col">
		{#each knittingCalculations.actions as action, index (index)}
			<KnittingActionChecklistElement {action} />
		{/each}
	</div>
</div>
