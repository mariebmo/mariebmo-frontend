<script lang="ts">
	import { knittingActionsStore } from '$lib/stores/knittingActionStore';
	import type { KnittingActions } from './interfaces';

	let actions: KnittingActions | null = null;

	knittingActionsStore.subscribe((value) => {
		actions = value;
	});
</script>

<div>
	<p>{actions?.fullWritten}</p>
</div>
