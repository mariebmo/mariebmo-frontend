<script lang="ts">
	import CvTimelineSection from '$lib/components/cv/CvTimelineSection.svelte';
	import { generateCvPdf } from '$lib/cv/generateCvPdf';
	import {
		contact,
		links,
		interests,
		certificates,
		courses,
		experience,
		education,
		internships,
		activities
	} from '$lib/data/cvData';

	async function imgToBase64(imgEl: HTMLImageElement): Promise<string | null> {
		return new Promise((resolve) => {
			try {
				const canvas = document.createElement('canvas');
				canvas.width = imgEl.naturalWidth || imgEl.width;
				canvas.height = imgEl.naturalHeight || imgEl.height;
				const ctx = canvas.getContext('2d');
				if (!ctx) {
					resolve(null);
					return;
				}
				ctx.drawImage(imgEl, 0, 0);
				resolve(canvas.toDataURL('image/jpeg', 0.92));
			} catch {
				resolve(null);
			}
		});
	}

	let pdfGenerating = false;

	async function generatePdf() {
		if (typeof window === 'undefined') return;
		if (pdfGenerating) return;
		pdfGenerating = true;
		try {
			const photoEl = document.querySelector('.print-cv-root img') as HTMLImageElement | null;
			const photoData = photoEl ? await imgToBase64(photoEl) : null;
			await generateCvPdf({
				contact,
				links,
				interests,
				certificates,
				courses,
				experience,
				education,
				internships,
				activities,
				photoData
			});
		} finally {
			pdfGenerating = false;
		}
	}
</script>

<div class="print-cv-root mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
	<section
		class="relative overflow-hidden rounded-3xl bg-white/90 shadow-xl ring-1 ring-slate-200 dark:ring-amber-900 backdrop-blur"
	>
		<div
			class="pointer-events-none absolute inset-x-[-10%] -top-40 h-64 bg-gradient-to-br from-amber-50 via-orange-50 to-transparent opacity-80 dark:from-amber-900/40 dark:via-orange-900/40"
			aria-hidden="true"
		></div>

		<!-- Header -->
		<header
			class="relative border-b border-amber-200/60 bg-amber-400 px-6 py-6 text-slate-900 shadow-sm sm:px-10 sm:py-8 dark:bg-amber-700 dark:border-amber-900 dark:text-white"
		>
			<div class="flex flex-col gap-4 sm:flex-row sm:justify-between">
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
						Curriculum Vitae
					</p>
					<h1 class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
						{contact.name}
					</h1>
					<p class="mt-1 text-sm text-slate-800 dark:text-slate-100 sm:text-base">
						{contact.title}
					</p>
					<p class="mt-3 text-xs text-slate-700 dark:text-slate-100 sm:text-sm">
						Fullstackutvikler basert i Oslo. Fokus på verktøyutvikling, AI-drevne workflows og
						brukersentrerte løsninger for innholdsproduksjon.
					</p>
				</div>

				<div class="flex print:hidden h-full items-start">
					<button
						type="button"
						on:click={generatePdf}
						disabled={pdfGenerating}
						aria-label={pdfGenerating ? 'Laster ned PDF…' : 'Last ned CV som PDF'}
						class="print:hidden truncate align-top justify-start rounded-full border border-amber-500 dark:border-amber-800 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 shadow-sm ring-slate-300 transition hover:bg-white hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
					>
						{pdfGenerating ? 'Laster ned…' : 'Last ned som PDF'}
					</button>
				</div>
			</div>
		</header>

		<!-- Content -->
		<div
			class="relative grid gap-8 px-6 py-8 text-sm text-slate-800 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)]"
		>
			<!-- Sidebar -->
			<aside
				class="space-y-8 rounded-2xl bg-slate-50/80 p-4 text-sm text-slate-700 ring-1 ring-slate-100 lg:p-6"
			>
				<section>
					<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
						Personalia
					</h2>
					<div class="mt-3 space-y-1">
						<img
							src="/mariebmo.png"
							width="148"
							height="148"
							class="rounded-lg object-cover"
							alt="Marie Blichfeldt Mo"
							fetchpriority="high"
						/>
						<p>
							<a
								href="/cdn-cgi/l/email-protection#97ecf4f8f9e3f6f4e3b9f2faf6fefbea"
								class="hover:text-slate-900">{contact.email}</a
							>
						</p>

						{#each contact.addressLines as line (line)}
							<p>{line}</p>
						{/each}

						{#if contact.notes?.length}
							<div class="w-full h-1 border-b"></div>
							<ul class="list-inside list-disc space-y-0.5 text-xs text-slate-600">
								{#each contact.notes as note (note)}
									<li>{note}</li>
								{/each}
							</ul>
						{/if}
					</div>
				</section>

				<section>
					<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Lenker</h2>
					<ul class="mt-3 space-y-1">
						{#each links as link (link.href)}
							<li>
								<a
									href={link.href}
									class="inline-flex items-center gap-1 text-sky-700 hover:text-sky-900 hover:underline"
									target="_blank"
									rel="noreferrer"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
									<span>{link.label}</span>
								</a>
							</li>
						{/each}
					</ul>
				</section>

				<section>
					<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
						Interesser
					</h2>
					<ul class="mt-3 flex flex-wrap gap-2">
						{#each interests as interest (interest)}
							<li
								class="rounded-full bg-blue-50 border-blue-300 border px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
							>
								{interest}
							</li>
						{/each}
					</ul>
				</section>

				<section>
					<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
						Sertifikater
					</h2>
					<ul class="mt-3 space-y-2">
						{#each certificates as cert (cert.name)}
							<li>
								<p class="font-medium text-slate-800">{cert.name}</p>
								<p class="text-xs text-slate-500">{cert.date}</p>
							</li>
						{/each}
					</ul>
				</section>

				<section>
					<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Kurs</h2>
					<ul class="mt-3 space-y-2">
						{#each courses as course (course.name)}
							<li>
								<p class="font-medium text-slate-800">{course.name}</p>
								<p class="text-xs text-slate-500">{course.date}</p>
							</li>
						{/each}
					</ul>
				</section>
			</aside>

			<!-- Main column -->
			<main class="space-y-10 text-sm text-slate-800">
				<CvTimelineSection
					title="Yrkeserfaring"
					entries={experience}
					dotClass="bg-sky-500 ring-2 ring-sky-100"
				/>
				<CvTimelineSection
					title="Utdanning"
					entries={education}
					dotClass="bg-violet-500 ring-2 ring-violet-100"
				/>
				<CvTimelineSection
					title="Praksisplasser"
					entries={internships}
					dotClass="bg-emerald-500 ring-2 ring-emerald-100"
					compact
				/>
				<CvTimelineSection
					title="Utenomfaglige aktiviteter"
					entries={activities}
					dotClass="bg-amber-500 ring-2 ring-amber-100"
					compact
				/>

				<section>
					<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
						Referanser
					</h2>
					<p class="mt-3 text-slate-700">Referanser oppgis på forespørsel.</p>
				</section>
			</main>
		</div>
	</section>
</div>
