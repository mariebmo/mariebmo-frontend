<script>
	export let header = 'Project';
	export let description = 'Description';
	export let link = '/';
	export let icon = 'ic:round-light-mode';
	export let color = '';
	export let darkColor = '';
</script>

<section class="flex flex-col justify-center antialiased p-4" id="knitting-container">
	<a class="h-full" href={link}>
		<!-- Card -->
		<div
			class="max-w-2xl mx-auto dark:bg-{darkColor}-800 bg-{color}-200 shadow-lg rounded-lg hover:bg-{color}-300 dark:hover:bg-{darkColor}-700"
		>
			<div class="px-6 py-5">
				<div class="flex items-start">
					<!-- Icon -->
					<div
						class="fill-current text-{color}-800 dark:text-{darkColor}-200 p-1 mr-4 bg-{color}-300 dark:bg-{darkColor}-700 rounded-full"
					>
						<iconify-icon {icon} width="30" />
					</div>

					<!-- Card content -->
					<div class="flex-grow truncate">
						<!-- Card header -->
						<div class="w-full sm:flex justify-between items-center mb-3">
							<!-- Title -->
							<h2
								class="text-2xl leading-snug font-extrabold dark:text-gray-50 text-gray-900 truncate mb-1 sm:mb-0"
							>
								{header}
							</h2>
						</div>
						<!-- Card body -->
						<div class="flex items-end justify-between whitespace-normal">
							<!-- Paragraph -->
							<div class="max-w-md dark:text-{darkColor}-100 text-{color}-950">
								<p class="mb-2">{description}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</a>
</section>
