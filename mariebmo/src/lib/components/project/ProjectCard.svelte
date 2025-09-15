<script lang="ts">
	import { ProjectCardColor } from './project';

	interface Props {
		header?: string;
		description?: string;
		link?: string;
		icon?: string;
		color?: ProjectCardColor;
	}

	let {
		header = 'Project',
		description = 'Description',
		link = '/',
		icon = 'ic:round-light-mode',
		color = ProjectCardColor.RED
	}: Props = $props();
</script>

<section
	class="flex flex-col max-w-4xl w-full flex-1 justify-center antialiased p-4"
	id="knitting-container"
>
	<a class="h-full" href={link}>
		<!-- Card -->
		<div
			class:element-background-color-red={color === ProjectCardColor.RED}
			class:element-background-color-blue={color === ProjectCardColor.BLUE}
			class:element-background-color-green={color === ProjectCardColor.GREEN}
			class:element-background-color-yellow={color === ProjectCardColor.YELLOW}
			class:element-background-color-purple={color === ProjectCardColor.PURPLE}
			class:element-background-color-pink={color === ProjectCardColor.PINK}
			class:element-background-color-orange={color === ProjectCardColor.ORANGE}
			class="mx-auto shadow-lg rounded-lg element-background-color"
		>
			<div class="px-6 py-5">
				<div>
					<div class="flex flex-row w-full">
						<div
							class:element-icon-color-red={color === ProjectCardColor.RED}
							class:element-icon-color-blue={color === ProjectCardColor.BLUE}
							class:element-icon-color-green={color === ProjectCardColor.GREEN}
							class:element-icon-color-yellow={color === ProjectCardColor.YELLOW}
							class:element-icon-color-purple={color === ProjectCardColor.PURPLE}
							class:element-icon-color-pink={color === ProjectCardColor.PINK}
							class:element-icon-color-orange={color === ProjectCardColor.ORANGE}
							class="fill-current p-1 mr-4 rounded-full"
						>
							<span class="material-symbols-outlined">{icon}</span>
						</div>

						<!-- Title -->

						<h2
							class="text-2xl max-w-xl w-full leading-snug font-extrabold dark:text-gray-50 text-gray-900 truncate mb-1 sm:mb-0"
						>
							{header}
						</h2>
					</div>
					<!-- Icon -->

					<!-- Card content -->
					<!-- Paragraph -->
					<div
						class:element-description-text-color-red={color === ProjectCardColor.RED}
						class:element-description-text-color-blue={color === ProjectCardColor.BLUE}
						class:element-description-text-color-green={color === ProjectCardColor.GREEN}
						class:element-description-text-color-yellow={color === ProjectCardColor.YELLOW}
						class:element-description-text-color-purple={color === ProjectCardColor.PURPLE}
						class:element-description-text-color-pink={color === ProjectCardColor.PINK}
						class:element-description-text-color-orange={color === ProjectCardColor.ORANGE}
						class="max-w-md"
					>
						<p class="mb-2">{description}</p>
					</div>
				</div>
			</div>
		</div>
	</a>
</section>

<style lang="postcss">
	.element-background-color-red {
		@apply bg-mariebmo-red-200;
	}

	.element-icon-color-red {
		@apply text-mariebmo-red-800;
	}

	.element-description-text-color-red {
		@apply text-mariebmo-red-950;
	}
</style>
