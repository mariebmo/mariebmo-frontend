<script lang="ts">
	interface Props {
		title?: string;
	}

	let { title = 'Marie B. Mo' }: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
