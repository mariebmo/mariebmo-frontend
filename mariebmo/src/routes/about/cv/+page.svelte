<script lang="ts">
	import CvTimelineSection from '$lib/components/cv/CvTimelineSection.svelte';
	import { generateCvPdf } from '$lib/cv/generateCvPdf';

	type Link = {
		label: string;
		href: string;
	};

	type Course = {
		name: string;
		date: string;
	};

	type TimelineEntry = {
		title: string;
		company?: string;
		location?: string;
		period: string;
		description?: string;
		bullets?: string[];
		metaLabel?: string;
		meta?: string;
		thesisTitle?: string;
		thesisDescription?: string;
	};

	const contact = {
		name: 'Marie Blichfeldt Mo',
		title: 'Senior tools software utvikler & 3D-grafiker',
		addressLines: ['Oslo, Norge'],
		email: 'mariebmo@proton.me',
		notes: ['Førerkort klasse B', 'Båtførerbevis']
	};

	const links: Link[] = [
		{ label: 'github.com/mariebmo', href: 'https://github.com/mariebmo' },
		{ label: 'linkedin.com/in/mariebmo/', href: 'https://linkedin.com/in/mariebmo/' },
		{ label: 'artstation.com/mariestigen', href: 'https://artstation.com/mariestigen' }
	];

	const interests = [
		'Brettspill & gaming',
		'Bøker',
		'Håndarbeid',
		'TTRPG (D&D)',
		'Mat',
		'Programmering'
	];

	const certificates = [
		{
			name: 'Microsoft Certified: Azure AI Fundamentals',
			date: 'mars 2021'
		}
	];

	const courses: Course[] = [
		{ name: 'Grunnkurs i Arbeidsmiljø', date: 'aug 2020' },
		{ name: 'Alkoholloven og skjenkeproblematikk', date: 'jan 2019' },
		{ name: 'Forebygging og håndtering av seksuell trakassering', date: 'jan 2019' }
	];

	const experience: TimelineEntry[] = [
		{
			title: 'Senior Tools Software Engineer',
			company: 'Attensi',
			location: 'Oslo',
			period: 'mai 2025 – d.d.',
			description:
				'Bygget en lettvekts webløsning fra bunnen i Svelte, som komplementerer den eksisterende WPF-klienten, med fokus på brukeropplevelse for kunder. Koblet løsningen mot en eksisterende .NET-backend via WebSockets og REST-endepunkter. Jobbet tett med stakeholders og bruk av Scrum i leveransen. Jobbet på en AI-først-løsning for autogenerering av opplæringsinnhold av høy kvalitet med bruk av Flowise, med veiledning fra brukeren. Sentral i kommunikasjon og implementasjon av API-er fra ulike teknologi-team i Attensi. Ledet pilotprosjekt for å onboarde designere til kodeprosjekter med Cursor og kodegenerering, og jobbet tett med designere i Figma.',
			metaLabel: 'Teknologi:',
			meta: 'Svelte, TypeScript, Tailwind, .NET, C#, MongoDB, WebSockets, REST API, AWS, Sentry, Grafana, Figma, Scrum, Flowise'
		},
		{
			title: 'Tools engineer',
			company: 'Attensi',
			location: 'Oslo',
			period: 'nov 2020 – mai 2025',
			description:
				'Gradvis overgang fra Art-teamet til Tools-teamet i Attensi frem til 2022. Ansvar for å lage verktøy for Attensis Creator-plattform. Utviklet og forbedret verktøy for innholdsproduksjon med stort fokus på effektivitet og kvalitetssikring av brukerarbeid ved bruk av AI. Creator-plattformen er bygget på .NET med MongoDB-database og WPF-frontend, og implementerer Unity-previews ved bruk av C# for Unity.',
			metaLabel: 'Teknologi:',
			meta: '.NET, C#, MongoDB, WebSockets, REST API, AWS, Scrum, Unity'
		},
		{
			title: 'Karakterartist',
			company: 'Attensi',
			location: 'Oslo',
			period: 'sep 2018 – juni 2022',
			description:
				'3D-generalist med spisskompetanse innen karakterdesign: modellering, unwrapping, teksturering, animasjon, motion capture, facial capture og optimalisering for real-time i Unity. Produserte over 500 karakterer for Attensi-produkter.',
			metaLabel: 'Verktøy:',
			meta: '3DS Max, Maya, ZBrush, Unity, Photoshop, Illustrator, Substance Designer, Substance Painter'
		},
		{
			title: 'Studentveileder',
			company: 'Høyskolen Kristiania',
			location: 'Oslo',
			period: 'jan 2021 – juni 2023',
			description:
				'Veileder for alle førsteklassefag: Kreativt Webprosjekt, Digital Teknologi, Intro til Programmering, Databaser, Objektorientert Programmering, Algoritmer og Datastrukturer, Informasjonssikkerhet.'
		},
		{
			title: 'Støttekontakt',
			company: 'Oslo Kommune, Bydel Nordre Aker',
			location: 'Oslo',
			period: 'jan 2017 – sep 2019'
		}
	];

	const education: TimelineEntry[] = [
		{
			title: 'Bachelor, Programmering',
			company: 'Høyskolen Kristiania',
			location: 'Oslo',
			period: 'aug 2020 – juni 2023',
			description:
				'Bachelor i programmering med hovedvekt på backend og robuste, skalerbare løsninger.',
			thesisTitle: 'Bacheloroppgave (A):',
			thesisDescription:
				'«Alternatives to AssetBundles for runtime up-/download and rendering of 3D-assets in Unity».',
			bullets: [
				'Webutvikling & API-design (HTML, CSS, React, JavaScript)',
				'Backend og enterprise (Kotlin, Spring Boot, REST, C#/.NET)',
				'Databaser (MongoDB, PostgreSQL, MySQL) og software design (SOLID, design patterns)',
				'Algoritmer, datastrukturer, informasjonssikkerhet og digital teknologi',
				'Unity- og Android-utvikling samt lavnivåprogrammering (C)'
			]
		},
		{
			title: 'Bachelor, 3D-grafikk',
			company: 'Westerdals Oslo ACT',
			location: 'Oslo',
			period: 'aug 2015 – juni 2018',
			description:
				'Bachelor i 3D-grafikk med fokus på helhetlig produksjonspipeline for interaktivt og pre-rendered innhold.',
			thesisTitle: 'Bacheloroppgave (A):',
			thesisDescription:
				'«Optimization of the design pipeline with the use of procedural textures».',
			bullets: [
				'Teksturering, modellering, topologi og komposisjon',
				'Lyssetting, rendering og optimalisering for realtime 3D',
				'Karakterdesign (rigging, skinning, hår) og animasjon (inkl. de 12 animasjonsprinsippene)',
				'Environment- og arkitekturdesign'
			]
		}
	];

	const internships: TimelineEntry[] = [
		{
			title: 'Bachelorpraksis',
			company: 'Attensi',
			location: 'Oslo',
			period: 'jan 2018 – juni 2018',
			description:
				'Utviklet scener og prosedurale materialer for Unity-spill, med fokus på effektivitet og skalerbarhet.'
		}
	];

	const activities: TimelineEntry[] = [
		{
			title: 'Nestleder',
			company: 'Kvinner & IT (KIT)',
			location: 'Oslo',
			period: 'aug 2021 – jan 2023',
			description:
				'Var med på å gjennopstarte Kvinner & IT (KIT) studentforening under COVID. Satt i ledelsen med flere hundre medlemmer i et uavhengig studentfaglig samfunn ved Høyskolen Kristiania. Fokuset til KIT var å fremme kvinner i IT-bransjen. Jobbet tett med ulike personer, bedrifter og organisasjoner for å arrangere ulike arrangementer og kurs samt egne sosiale arrangementer for medlemmene.'
		},
		{
			title: 'Nestleder',
			company: 'BIOS studentforening',
			location: 'Oslo',
			period: 'juni 2021 – des 2021',
			description:
				'Var med på å gjenoppstarte BIOS studentforening under COVID. BIOS ble tilsvarende en linjeforening for IT-studenter ved Høyskolen Kristiania. Jobbet aktivt med bransjekontakt, bedriftspresentasjoner, sosiale sammenkomster, samt å holde digitale forelesniger og veiledning for medlemmene.'
		},
		{
			title: 'Velferdsansvarlig, Arbeidsutvalget',
			company: 'Studentsamfunnet Westerdals Oslo ACT',
			location: 'Oslo',
			period: 'feb 2017 – aug 2018',
			description:
				'Satt i styret til Studentsamfunnet ved Westerdals Oslo ACT (SWOACT) med fokus på, og ansvar for, studentforeninger og trivsel ved skolen. Bidro med hjelp til søknader, dokumentasjon, gjennomføring av generalforsamling, promotering, fakturering, og generell driftshjelp i SWOACT-foreningene.'
		},
		{
			title: 'Skiftleder',
			company: 'Skjenkestua Studentbar',
			location: 'Oslo',
			period: 'mars 2018 – aug 2019'
		},
		{
			title: 'Nestleder, Tillitsutvalget ved avd. Film, TV og spill',
			company: 'Studentsamfunnet Westerdals Oslo ACT',
			location: 'Oslo',
			period: 'aug 2015 – feb 2017'
		}
	];

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
