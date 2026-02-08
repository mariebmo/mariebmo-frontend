<script lang="ts">
	import { socials } from '$lib/config';
	import { CardColor, getCardClasses } from '$lib/utils/cardStyles';

	const cardClasses = getCardClasses({
		color: CardColor.WHITE,
		variant: 'filled',
		rounded: 'lg'
	});
</script>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="p-8 sm:p-12 {cardClasses}">
		<!-- Header Section -->
		<div class="flex flex-col items-center text-center">
			<img
				src="https://avatars.githubusercontent.com/u/23049454?v=4"
				alt="Marie Blichfeldt Mo - Software Engineer"
				class="mb-6 h-40 w-40 rounded-full border-4 border-gray-200 object-cover shadow-md transition-transform hover:scale-105 dark:border-gray-700 sm:h-48 sm:w-48"
			/>

			<h1 class="mb-2 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">About Me</h1>
			<div class="mb-6 h-1 w-20 rounded-full bg-gray-200 dark:bg-gray-700 my-4"></div>
		</div>

		<!-- Content Section -->
		<div class="mb-8 space-y-4 text-center text-gray-700 dark:text-gray-300 sm:text-lg">
			<p class="leading-relaxed">
				Hello! I'm <span class="font-semibold text-gray-900 dark:text-white"
					>Marie Blichfeldt Mo</span
				>, a software engineer based in <span class="font-medium">Oslo, Norway</span>.
			</p>
			<p class="leading-relaxed">
				I'm currently working as a senior software tools engineer at
				<a
					href="https://www.attensi.com"
					class="font-semibold text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-700 hover:decoration-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
					target="_blank"
					rel="noopener noreferrer"
				>
					Attensi
				</a>.
			</p>
		</div>

		<!-- Socials Section -->
		<div class="border-t border-gray-200 pt-8 dark:border-gray-700">
			<h2 class="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
				Connect With Me
			</h2>

			<div class="flex flex-wrap justify-center gap-4">
				{#each socials as social}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-600 dark:bg-gray-700"
						aria-label={`Visit my ${social.name} profile`}
						tabindex="0"
					>
						<i
							class="{social.icon} text-2xl text-gray-700 transition-colors group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400"
						></i>
						<span class="font-medium text-gray-900 dark:text-white">
							{social.name}
						</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
