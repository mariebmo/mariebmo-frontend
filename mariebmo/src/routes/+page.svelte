<script>
	import { description } from '$lib/config';

	//import LargeLogo from '../routes/components/LargeLogo.svelte';
	import ProjectCard from '../routes/components/ProjectCard.svelte';

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
		/*
		{
			title: 'Blog',
			description: 'Blog about making this website and other projects.',
			icon: 'carbon:blog',
			color: 'sky',
			darkColor: 'sky',
			href: '/blog'
		},
		*/
		{
			title: 'Knitting Calculator',
			description: 'The calculator is used for even increases or decreases in knitting.',
			icon: 'carbon:user-favorite',
			bakcgorundColorClasses:
				'bg-orange-200 dark:bg-amber-800 hover:bg-orange-300 dark:hover:bg-amber-700',
			iconBackgroundColorClasses:
				'bg-orange-300 dark:bg-amber-700 text-orange-800 dark:text-amber-200',
			descriptionTextColorClasses: 'text-orange-950 dark:text-amber-100',
			href: '/knitting'
		}
	];
</script>

<div>
	<div id="projects-container">
		{#each projects as project}
			<ProjectCard
				header={project.title}
				description={project.description}
				icon={project.icon}
				bakcgorundColorClasses={project.bakcgorundColorClasses}
				iconBackgroundColorClasses={project.iconBackgroundColorClasses}
				descriptionTextColorClasses={project.descriptionTextColorClasses}
				link={project.href}
			/>
		{/each}
	</div>
</div>

<style>
	#projects-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}
</style>
