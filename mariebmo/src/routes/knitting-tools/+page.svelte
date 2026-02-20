<script lang="ts">
	import { CardColor, getCardClasses } from '$lib';

	interface Tool {
		title: string;
		description: string;
		icon: string;
		link: string;
		color: CardColor;
		iconColor: string;
	}

	const tools: Tool[] = [
		{
			title: 'Calculator',
			description: 'Calculate even increases or decreases in knitting patterns.',
			icon: 'calculate',
			link: '/knitting-tools/calculator',
			color: CardColor.ORANGE,
			iconColor: 'text-orange-600 dark:text-orange-400'
		},
		{
			title: 'Row Counter',
			description: 'Count the number of rows in your knitting pattern.',
			icon: 'add',
			link: '/knitting-tools/counter',
			color: CardColor.PINK,
			iconColor: 'text-pink-600 dark:text-pink-400'
		}
	];
</script>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Header -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
			Knitting Tools
		</h1>
		<p class="text-lg text-gray-600 dark:text-gray-400">Utilities for your knitting projects</p>
	</div>

	<!-- Tools List -->
	<div class="space-y-6">
		{#each tools as tool (tool.link)}
			<a href={tool.link} class="group block">
				<div
					class="flex items-center gap-6 p-6 {getCardClasses({
						color: tool.color,
						variant: 'outline',
						rounded: 'lg'
					})} hover:-translate-y-1"
				>
					<div class="flex-shrink-0">
						<div
							class="flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-gray-800 sm:h-16 sm:w-16"
						>
							<span class="material-symbols-outlined text-3xl sm:text-4xl {tool.iconColor}">
								{tool.icon}
							</span>
						</div>
					</div>
					<div class="min-w-0 flex-1">
						<h2 class="mb-1 text-xl font-semibold sm:text-2xl">
							{tool.title}
						</h2>
						<p class="text-gray-700 dark:text-gray-300">
							{tool.description}
						</p>
					</div>
					<div class="flex-shrink-0">
						<span
							class="material-symbols-outlined text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-gray-600 dark:group-hover:text-gray-300"
						>
							arrow_forward
						</span>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
