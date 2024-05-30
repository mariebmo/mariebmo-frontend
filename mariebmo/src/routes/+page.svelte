<script>
	import LargeLogo from '../routes/components/LargeLogo.svelte';
	import ProjectCard from '../routes/components/ProjectCard.svelte';

	var projects = [
		{
			title: 'Knitting Calculator',
			description: 'A calculator to evenly distribute stitches when decreasing or increasing in knitting.',
			route: '/knitting',
			image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff'
		}
	];
</script>

<div>
	<h1>Projects</h1>
	{#each projects as project}
		<ProjectCard title={project.title} description={project.description} route={project.route} image={project.image}/>
	{/each}

</div>
