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
		},

		{
			title: 'Blog',
			description: 'Blog about making this website and other projects.',
			icon: 'edit_square',
			color: ProjectCardColor.GREEN,
			link: '/blog',
			showWhenExpanded: null
		},

		{
			title: 'Projects',
			description: 'Projects I have worked on.',
			icon: 'select_window',
			color: ProjectCardColor.BLUE,
			link: '/projects',
			showWhenExpanded: null
		},

		{
			title: 'Resume',
			description: 'My resume.',
			icon: 'contract',
			color: ProjectCardColor.PURPLE,
			link: '/resume',
			showWhenExpanded: null
		},

		{
			title: 'About',
			description: 'About me.',
			icon: 'account_circle',
			color: ProjectCardColor.ORANGE,
			link: '/about',
			showWhenExpanded: null
		},

		{
			title: 'Contact',
			description: 'Contact me.',
			icon: 'contact_page',
			color: ProjectCardColor.YELLOW,
			link: '/contact',
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
