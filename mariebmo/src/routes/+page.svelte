<script lang="ts">
	import { ProjectCardColor } from '$lib/components/project/project';
	import ProjectCard from '../lib/components/project/ProjectCard.svelte';

	let projects = [
		{
			title: 'Knitting Utilities',
			description: 'Utilities used for knitting, such as calculators and row counters.',
			icon: 'favorite',
			color: ProjectCardColor.RED,
			link: '/knitting-tools',
			showWhenExpanded: null
		}
	];
</script>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Hero Section -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">Welcome</h1>
		<p class="text-lg text-gray-600 dark:text-gray-400">Explore my projects and tools</p>
	</div>

	<!-- Projects Grid -->
	<div class="flex w-full flex-col items-center justify-center gap-4">
		<ProjectCard
			header="About"
			description="Senior Software Engineer, previous 3D-artist, current knitting enthusiast"
			icon="favorite"
			color={ProjectCardColor.PINK}
			link="/about"
		/>

		{#each projects as project (project.link)}
			<ProjectCard
				header={project.title}
				description={project.description}
				icon={project.icon}
				color={project.color}
				link={project.link}
			/>
		{/each}
	</div>
</div>
