<script lang="ts">
	interface Props {
		slug: string;
		onSlugChange: (v: string) => void;
		onGoToJoin: () => void;
	}
	let { slug, onSlugChange, onGoToJoin }: Props = $props();
</script>

<section
	class="mb-10 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
>
	<h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
		Join a club
	</h2>
	<div class="flex flex-wrap gap-2">
		<input
			type="text"
			value={slug}
			oninput={(e) => onSlugChange(e.currentTarget.value)}
			placeholder="Invite slug (e.g. my-club)"
			class="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500"
			aria-label="Invite slug"
		/>
		<button
			type="button"
			onclick={onGoToJoin}
			disabled={!slug.trim()}
			class="rounded-lg bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-600 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500"
		>
			Go to join
		</button>
	</div>
</section>
