<script lang="ts">
	interface Props {
		basePath: string;
		label?: string;
	}
	let { basePath, label = 'Back to Hub' }: Props = $props();
</script>

<nav
	class="border-b border-amber-200/80 bg-amber-100/80 dark:border-slate-700 dark:bg-slate-800/80"
	aria-label="Breadcrumb"
>
	<div class="mx-auto max-w-5xl px-4 py-3 sm:px-6">
		<a
			href={basePath}
			class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
			aria-label="Back to bookclub hub"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 19l-7-7 7-7"
				/>
			</svg>
			{label}
		</a>
	</div>
</nav>
