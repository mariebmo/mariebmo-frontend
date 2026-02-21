<script lang="ts">
	import MetaTitle from '$lib/components/meta-title.svelte';
	import BackButton from '$lib/components/buttons/BackButton.svelte';
	import { CardColor, getCardClasses } from '$lib/utils/cardStyles';
	import { experienceProjects } from '$lib/data/experienceProjects';
	import type { ExperienceProject } from '$lib/data/experienceProjects';

	const cardClasses = getCardClasses({
		color: CardColor.WHITE,
		variant: 'filled',
		rounded: 'lg'
	});

	let expandedId: string | null = null;

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
</script>

<MetaTitle title="Experience | Marie B. Mo" />

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-6">
		<BackButton href="/about" label="Back to About" />
	</div>

	<div class="p-8 sm:p-12 {cardClasses}">
		<!-- Header -->
		<div class="flex flex-col items-center text-center">
			<h1 class="mb-2 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
				Experience
			</h1>
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

		<!-- Project list: expandable cards -->
		<ul class="space-y-3" role="list">
			{#each experienceProjects as project, i (project.headline)}
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
							aria-label={isExpanded ? `Collapse ${project.headline}` : `Expand ${project.headline}`}
							tabindex="0"
						>
							<span class="min-w-0 flex-1 font-semibold text-gray-900 dark:text-white">
								{project.headline}
							</span>
							<span class="flex flex-wrap gap-1.5">
								{#each project.tags as tag (tag)}
									<span
										class="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-200"
									>
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

						<!-- Expanded content -->
						<div
							id="expanded-{safeId}"
							role="region"
							aria-labelledby="trigger-{safeId}"
							class="overflow-hidden transition-all duration-200"
							class:h-0={!isExpanded}
							class:opacity-0={!isExpanded}
						>
							<div
								class="border-t border-gray-200 px-4 py-4 dark:border-gray-600"
								class:invisible={!isExpanded}
							>
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
				</li>
			{/each}
		</ul>
	</div>
</div>
