<script lang="ts">
	export let title: string;
	export let entries: Array<{
		title: string;
		company?: string;
		location?: string;
		period: string;
		description?: string;
		bullets?: string[];
		metaLabel?: string;
		meta?: string;
		thesisTitle?: string;
		thesisDescription?: string;
	}>;
	/** Full Tailwind classes for the timeline dot, e.g. 'bg-sky-500 ring-2 ring-sky-100' */
	export let dotClass: string;
	/** When true, use tighter spacing between entries (space-y-3) */
	export let compact = false;
</script>

<section>
	<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
		{title}
	</h2>
	<div class="mt-4 border-l border-slate-200 pl-5 {compact ? 'space-y-3' : 'space-y-6'}">
		{#each entries as entry (entry.title + entry.period)}
			<article class="relative pl-4">
				<div
					class="absolute left-[-0.6rem] top-2 h-2 w-2 rounded-full {dotClass}"
					aria-hidden="true"
				></div>
				<header>
					<h3 class="font-semibold text-slate-900">{entry.title}</h3>
					{#if entry.company}
						<p class="text-slate-600">
							{entry.company}
							{#if entry.location}&middot; {entry.location}{/if}
						</p>
					{/if}
					<p class="text-[0.8rem] text-slate-500">{entry.period}</p>
				</header>
				{#if entry.description}
					<p class="mt-3 text-slate-700">{entry.description}</p>
				{/if}
				{#if entry.thesisTitle || entry.thesisDescription}
					<p class="mt-1 text-slate-700">
						{#if entry.thesisTitle}
							<span class="font-semibold">{entry.thesisTitle}</span>
						{/if}
						{#if entry.thesisDescription}
							{entry.thesisDescription}
						{/if}
					</p>
				{/if}
				{#if entry.bullets?.length}
					<ul class="mt-3 list-inside list-disc space-y-1">
						{#each entry.bullets as bullet (bullet)}
							<li>{bullet}</li>
						{/each}
					</ul>
				{/if}
				{#if entry.meta}
					<p class="mt-2 text-xs text-slate-500">
						<span class="font-semibold text-slate-600">{entry.metaLabel}</span>
						{entry.meta}
					</p>
				{/if}
			</article>
		{/each}
	</div>
</section>
