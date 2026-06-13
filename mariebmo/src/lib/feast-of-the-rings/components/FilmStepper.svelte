<script lang="ts">
	import { feastTheme } from '$lib/feast-of-the-rings/theme';
	import type { FilmStep } from '$lib/feast-of-the-rings/types';

	interface Props {
		step: FilmStep;
		onchange: (step: FilmStep) => void;
	}

	let { step, onchange }: Props = $props();

	const steps: { id: FilmStep; label: string }[] = [
		{ id: 'plan', label: 'Plan' },
		{ id: 'menu', label: 'Menu' },
		{ id: 'watch', label: 'Watch' }
	];

	function stepButtonClass(isActive: boolean, isWatch: boolean): string {
		if (!isActive) {
			return 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200';
		}

		if (isWatch) {
			return feastTheme.watch.solid;
		}

		return feastTheme.plan.solid;
	}

	function mobileActiveClass(entryId: FilmStep): string {
		if (entryId === 'watch') return feastTheme.watch.mobileActive;
		return feastTheme.plan.mobileActive;
	}
</script>

<nav aria-label="Film steps">
	<ol class="flex items-center justify-center gap-1.5 sm:hidden">
		{#each steps as entry, index (entry.id)}
			<li class="flex items-center gap-1.5">
				{#if index > 0}
					<span class="text-stone-300 dark:text-stone-600" aria-hidden="true">→</span>
				{/if}
				<button
					type="button"
					class="rounded-md px-2 py-1 text-sm font-semibold transition-colors
						{step === entry.id ? mobileActiveClass(entry.id) : 'text-gray-500 dark:text-gray-400'}"
					aria-current={step === entry.id ? 'step' : undefined}
					onclick={() => onchange(entry.id)}
				>
					{entry.label}
				</button>
			</li>
		{/each}
	</ol>

	<div
		class="hidden grid-cols-3 gap-1 rounded-xl border border-stone-200 bg-stone-100 p-1 dark:border-stone-700 dark:bg-stone-800/80 sm:grid"
		role="tablist"
		aria-label="Film steps"
	>
		{#each steps as entry (entry.id)}
			<button
				type="button"
				role="tab"
				class="rounded-lg px-4 py-3 text-sm font-semibold transition-colors
					{stepButtonClass(step === entry.id, entry.id === 'watch')}"
				aria-selected={step === entry.id}
				onclick={() => onchange(entry.id)}
			>
				{entry.label}
			</button>
		{/each}
	</div>
</nav>
