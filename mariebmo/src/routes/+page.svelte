<script lang="ts">
	import { ProjectCardColor } from '$lib/components/project/project';
	import ProjectCard from '../lib/components/project/ProjectCard.svelte';

	function showDiv() {
		var div = document.getElementById('is-expanded-div');
		if (div) {
			if (div.style.display === 'none') {
				div.style.display = 'block';
			} else {
				div.style.display = 'none';
			}
		}
	}

	let projects = [
		{
			title: 'Knitting Calculator',
			description: 'The calculator is used for even increases or decreases in knitting.',
			icon: 'favorite',
			color: ProjectCardColor.RED,
			link: '/knitting',
			showWhenExpanded: null
		}
	];
</script>

<div>
	<div class="w-full flex flex-col">
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
