<script lang="ts">
	interface Props {
		helpHref: string;
	}
	let { helpHref }: Props = $props();
</script>

<a
	href={helpHref}
	class="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white shadow-lg transition hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-slate-600 dark:hover:bg-slate-500 dark:focus:ring-offset-slate-900"
	aria-label="Help"
	tabindex="0"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
</a>
