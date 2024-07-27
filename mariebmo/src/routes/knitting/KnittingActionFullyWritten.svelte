<script lang="ts">
	import type { KnittingActions } from './interfaces';

	export let actions: KnittingActions;
</script>

<div
	class="flex flex-col p-5 fill-current text-amber-800 dark:text-orange-200 bg-orange-300 dark:bg-amber-700 rounded-sm"
>
	<p>{actions.fullWritten}</p>
</div>
