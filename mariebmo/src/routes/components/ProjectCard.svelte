<script>
	export let header = 'Project';
	export let description = 'Description';
	export let link = '/';
	export let icon = 'ic:round-light-mode';
	export let bakcgorundColorClasses = '';
	export let iconBackgroundColorClasses = '';
	export let descriptionTextColorClasses = '';
</script>

<section class="flex flex-col flex-1 justify-center antialiased p-4" id="knitting-container">
	<a class="h-full" href={link}>
		<!-- Card -->
		<div class="max-w-2xl mx-auto shadow-lg rounded-lg {bakcgorundColorClasses}">
			<div class="px-6 py-5">
				<div class="flex items-start">
					<!-- Icon -->
					<div class="fill-current p-1 mr-4 rounded-full {iconBackgroundColorClasses}">
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
							<div class="max-w-md {descriptionTextColorClasses}">
								<p class="mb-2">{description}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</a>
</section>
