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

<div>
	<div class="w-full flex flex-col items-center justify-center gap-4">
		<ProjectCard
			header="About"
			description="Senior Software Engineer, still don't know what I'm doing"
			icon="favorite"
			color={ProjectCardColor.PINK}
			link="/about"
		/>

		{#each projects as project}
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

<style>
</style>
