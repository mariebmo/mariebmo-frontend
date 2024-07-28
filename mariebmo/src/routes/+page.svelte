<script>
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

		/*
		{
			title: 'Blog',
			description: 'Blog about making this website and other projects.',
			icon: 'carbon:blog',
			bakcgorundColorClasses:
				'bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700',
			iconBackgroundColorClasses: 'bg-blue-300 dark:bg-blue-700 text-blue-800 dark:text-blue-200',
			descriptionTextColorClasses: 'text-blue-950 dark:text-blue-100',
			href: '/blog'
		},

		{
			title: 'Projects',
			description: 'Projects I have worked on.',
			icon: 'carbon:projects',
			bakcgorundColorClasses:
				'bg-green-200 dark:bg-green-800 hover:bg-green-300 dark:hover:bg-green-700',
			iconBackgroundColorClasses:
				'bg-green-300 dark:bg-green-700 text-green-800 dark:text-green-200',
			descriptionTextColorClasses: 'text-green-950 dark:text-green-100',
			href: '/projects'
		},

		{
			title: 'Resume',
			description: 'My resume.',
			icon: 'carbon:resume',
			bakcgorundColorClasses:
				'bg-purple-200 dark:bg-purple-800 hover:bg-purple-300 dark:hover:bg-purple-700',
			iconBackgroundColorClasses:
				'bg-purple-300 dark:bg-purple-700 text-purple-800 dark:text-purple-200',
			descriptionTextColorClasses: 'text-purple-950 dark:text-purple-100',
			href: '/resume'
		},

		{
			title: 'About',
			description: 'About me.',
			icon: 'carbon:user-profile',
			bakcgorundColorClasses: 'bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700',
			iconBackgroundColorClasses: 'bg-red-300 dark:bg-red-700 text-red-800 dark:text-red-200',
			descriptionTextColorClasses: 'text-red-950 dark:text-red-100',
			href: '/about'
		},

		{
			title: 'Contact',
			description: 'Contact me.',
			icon: 'carbon:contact',
			bakcgorundColorClasses:
				'bg-yellow-200 dark:bg-yellow-800 hover:bg-yellow-300 dark:hover:bg-yellow-700',
			iconBackgroundColorClasses:
				'bg-yellow-300 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200',
			descriptionTextColorClasses: 'text-yellow-950 dark:text-yellow-100',
			href: '/contact'
		}
		*/
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
