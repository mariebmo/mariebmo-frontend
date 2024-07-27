<script lang="ts">
	import KnittingActionChecklist from './KnittingActionChecklist.svelte';
	import type { KnittingActions } from './interfaces';
	export let actions: KnittingActions;
</script>

<div
	class="flex flex-col p-5 fill-current text-amber-800 dark:text-orange-200 bg-orange-300 dark:bg-amber-700 rounded-sm"
>
	<div class="flex flex-col">
		{#if actions.actions}
			{#each actions.actions as action, i}
				<KnittingActionChecklist {action} />
			{/each}
		{/if}
	</div>
</div>
