<script lang="ts">
	import MetaTitle from '$lib/components/meta-title.svelte';
	import BackButton from '$lib/components/buttons/BackButton.svelte';
	import { CardColor, getCardClasses } from '$lib/utils/cardStyles';
	import { experienceProjects, TAG_DEVICON_MAP } from '$lib/data/experienceProjects';
	import type { ExperienceProject } from '$lib/data/experienceProjects';

	const cardClasses = getCardClasses({
		color: CardColor.WHITE,
		variant: 'filled',
		rounded: 'lg'
	});

	const allTags = $derived(
		[...new Set(experienceProjects.flatMap((p) => p.tags))].sort((a, b) =>
			a.localeCompare(b, undefined, { sensitivity: 'base' })
		)
	);

	let selectedTag = $state<string | null>(null);
	let expandedId = $state<string | null>(null);

	const filteredProjects = $derived(
		selectedTag
			? experienceProjects.filter((p) => p.tags.includes(selectedTag as string))
			: experienceProjects
	);

	function toggleExpanded(project: ExperienceProject) {
		const id = project.headline;
		expandedId = expandedId === id ? null : id;
	}

	function handleKeydown(event: KeyboardEvent, project: ExperienceProject) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleExpanded(project);
		}
	}

	function selectTag(tag: string | null) {
		selectedTag = selectedTag === tag ? null : tag;
	}

	function handleTagKeydown(event: KeyboardEvent, tag: string | null) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectTag(tag);
		}
	}

	function getTagIconClass(tag: string): string | undefined {
		return TAG_DEVICON_MAP[tag];
	}
</script>

<MetaTitle title="Experience | Marie B. Mo" />

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-6">
		<BackButton href="/about" label="Back to About" />
	</div>

	<div class="p-8 sm:p-12 {cardClasses}">
		<!-- Header -->
		<div class="flex flex-col items-center text-center">
			<h1 class="mb-2 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">Experience</h1>
			<div class="mb-6 h-1 w-20 rounded-full bg-gray-200 dark:bg-gray-700 my-4"></div>
			<p class="mb-8 max-w-2xl text-gray-600 dark:text-gray-400">
				Educational projects and exams from
				<a
					href="https://github.com/mariebmo-edu"
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
				>
					github.com/mariebmo-edu
				</a>
				— Høyskolen Kristiania (Programming) and more.
			</p>
		</div>

		<!-- Tag filter -->
		<div class="mb-8">
			<h2
				class="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
			>
				Filter by tag
			</h2>
			<div class="flex flex-wrap gap-2">
				<button
					type="button"
					onclick={() => selectTag(null)}
					onkeydown={(e) => handleTagKeydown(e, null)}
					class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors {selectedTag ===
					null
						? 'border-blue-500 bg-blue-500 text-white dark:border-blue-400 dark:bg-blue-600 dark:text-white'
						: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}"
					aria-pressed={selectedTag === null}
					aria-label="Show all projects"
					tabindex="0"
				>
					All
				</button>
				{#each allTags as tag (tag)}
					{@const isSelected = selectedTag === tag}
					{@const iconClass = getTagIconClass(tag)}
					<button
						type="button"
						onclick={() => selectTag(tag)}
						onkeydown={(e) => handleTagKeydown(e, tag)}
						class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors {isSelected
							? 'border-blue-500 bg-blue-500 text-white dark:border-blue-400 dark:bg-blue-600 dark:text-white'
							: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}"
						aria-pressed={isSelected}
						aria-label={isSelected ? `Filter by ${tag}, currently selected` : `Filter by ${tag}`}
						tabindex="0"
					>
						{#if iconClass}
							<i class="{iconClass} colored text-base" aria-hidden="true"></i>
						{/if}
						<span>{tag}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Project list: expandable cards -->
		{#if filteredProjects.length === 0}
			<p
				class="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-8 text-center text-gray-500 dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-400"
			>
				No projects match the selected tag. Try another filter or show all.
			</p>
		{:else}
			<ul class="space-y-3" role="list">
				{#each filteredProjects as project, i (project.headline)}
					{@const isExpanded = expandedId === project.headline}
					{@const safeId = `experience-${i}`}
					<li>
						<div
							class="rounded-xl border border-gray-200 bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 {isExpanded
								? 'ring-2 ring-blue-500/20 ring-offset-2 dark:ring-offset-gray-900'
								: ''}"
						>
							<!-- Clickable header row -->
							<button
								type="button"
								class="flex w-full flex-wrap items-center gap-2 px-4 py-4 text-left sm:flex-nowrap sm:gap-4"
								onclick={() => toggleExpanded(project)}
								onkeydown={(e) => handleKeydown(e, project)}
								aria-expanded={isExpanded}
								aria-controls="expanded-{safeId}"
								id="trigger-{safeId}"
								aria-label={isExpanded
									? `Collapse ${project.headline}`
									: `Expand ${project.headline}`}
								tabindex="0"
							>
								<span class="min-w-0 flex-1 font-semibold text-gray-900 dark:text-white">
									{project.headline}
								</span>
								<span class="flex flex-wrap gap-2">
									{#each project.tags as tag (tag)}
										{@const iconClass = getTagIconClass(tag)}
										<span
											class="inline-flex items-center gap-1 rounded-full bg-gray-200 py-1.5 px-2 text-xs font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-200"
										>
											{#if iconClass}
												<i class="{iconClass} colored text-sm" aria-hidden="true"></i>
											{/if}
											{tag}
										</span>
									{/each}
								</span>
								<span
									class="material-symbols-outlined shrink-0 text-2xl text-gray-500 transition-transform dark:text-gray-400"
									class:rotate-180={isExpanded}
									aria-hidden="true"
								>
									expand_more
								</span>
							</button>

							<!-- Expanded content: grid 0fr/1fr so height animates and content is visible -->
							<div
								id="expanded-{safeId}"
								role="region"
								aria-labelledby="trigger-{safeId}"
								class="grid transition-[grid-template-rows] duration-200 ease-out"
								style="grid-template-rows: {isExpanded ? '1fr' : '0fr'}"
							>
								<div class="min-h-0 overflow-hidden">
									<div class="border-t border-gray-200 px-4 py-4 dark:border-gray-600">
										<p class="mb-3 text-sm text-gray-700 dark:text-gray-300">
											{project.description}
										</p>
										<p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
											<strong class="text-gray-800 dark:text-gray-200">How it's built:</strong>
											{project.howItIsBuilt}
										</p>
										<a
											href={project.repoUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
											aria-label={`Open repository: ${project.headline}`}
										>
											<span class="material-symbols-outlined text-lg">open_in_new</span>
											View on GitHub
										</a>
									</div>
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
