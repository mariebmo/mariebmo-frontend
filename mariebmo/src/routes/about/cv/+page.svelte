<script lang="ts">
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
		'Svømming',
		'TTRPG (Dungeons & Dragons)',
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
				'Bygget en lettvekts webløsning fra bunnen i Svelte, som komplementerer den eksisterende WPF-klienten, med fokus på brukeropplevelse for kunder. Koblet løsningen mot en eksisterende .NET-backend via WebSockets og REST-endepunkter. Levert en AI-først-løsning for autogenerering av opplæringsinnhold av høy kvalitet med bruk av Flowise, med veiledning fra brukeren. Sentral i kommunikasjon og implementasjon av API-er fra ulike teknologi-team i Attensi. Ledet pilotprosjekt for å onboarde designere til kodeprosjekter med Cursor og kodegenerering, med tett samarbeid med stakeholders og bruk av Scrum, og jobbet tett med designere i Figma.',
			metaLabel: 'Teknologi:',
			meta: 'Svelte, TypeScript, Tailwind, .NET, C#, MongoDB, WebSockets, REST API, AWS, Sentry, Grafana, Figma, Scrum, Flowise'
		},
		{
			title: 'Tools engineer',
			company: 'Attensi',
			location: 'Oslo',
			period: 'nov 2020 – mai 2025',
			description:
				'Gradvis overgang fra Art-teamet til Tools-teamet i Attensi frem til 2022. Ansvar for å lage verktøy for Attensis Creator-plattform. Utviklet og forbedret verktøy for innholdsproduksjon med stort fokus påeffektivitet og kvalitetssikring av brukerarbeid ved bruk av AI. Creator-plattformen er bygget på .NET med MongoDB-database og WPF-frontend, og implementerer Unity-previews ved bruk av C# for Unity.',
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

	async function generatePdf() {
		if (typeof window === 'undefined') return;

		// @ts-ignore - jspdf is loaded dynamically at runtime
		const jsPDFModule = await import('jspdf');
		const jsPDF = (jsPDFModule as any).default;

		const doc = new jsPDF({ unit: 'pt', format: 'a4' });
		const pageWidth = doc.internal.pageSize.getWidth();
		const pageHeight = doc.internal.pageSize.getHeight();
		const marginX = 50;
		const maxWidth = pageWidth - marginX * 2;
		const lineHeight = 16;

		// --- Header bar to match the web layout ---
		doc.setFillColor(245, 158, 11); // amber-ish background
		doc.rect(0, 0, pageWidth, 110, 'F');

		doc.setTextColor(248, 250, 252); // near slate-50
		doc.setFont('Helvetica', 'bold');
		doc.setFontSize(20);

		let y = 45;

		doc.text(contact.name, marginX, y);
		y += 24;

		doc.setFontSize(12);
		doc.setFont('Helvetica', 'normal');
		doc.text(contact.title, marginX, y);
		y += 18;

		const intro =
			'Basert i Oslo. Fokus på verktøyutvikling, AI-drevne workflows og brukersentrerte løsninger for innholdsproduksjon.';
		const introLines = doc.splitTextToSize(intro, maxWidth);
		doc.setFontSize(10);
		doc.text(introLines, marginX, y);

		// Reset for body content
		y = 130;
		doc.setFontSize(11);
		doc.setFont('Helvetica', 'normal');
		doc.setTextColor(30, 41, 59); // slate-800

		const ensureSpace = (lines = 1) => {
			const needed = lines * lineHeight + 30;
			if (y + needed > pageHeight - 40) {
				doc.addPage();
				y = 60;
				doc.setFontSize(11);
				doc.setFont('Helvetica', 'normal');
				doc.setTextColor(30, 41, 59);
			}
		};

		const heading = (text: string) => {
			doc.setFont('Helvetica', 'bold');
			doc.setFontSize(14);
			doc.setTextColor(180, 83, 9); // amber-700-ish
			ensureSpace(2);
			doc.text(text, marginX, y);
			y += lineHeight * 1.8;
			doc.setFontSize(11);
			doc.setFont('Helvetica', 'normal');
			doc.setTextColor(30, 41, 59);
		};

		const subheading = (text: string) => {
			doc.setFont('Helvetica', 'bold');
			doc.setFontSize(12);
			doc.setTextColor(15, 23, 42); // slate-900
			ensureSpace(1);
			doc.text(text, marginX, y);
			y += lineHeight * 1.3;
			doc.setFontSize(11);
			doc.setFont('Helvetica', 'normal');
			doc.setTextColor(30, 41, 59);
		};

		const paragraph = (text?: string) => {
			if (!text) return;
			const lines = doc.splitTextToSize(text, maxWidth);
			ensureSpace(lines.length);
			doc.text(lines, marginX, y);
			y += lines.length * lineHeight + lineHeight * 0.5;
		};

		const bulletList = (items?: string[]) => {
			if (!items || !items.length) return;
			for (const item of items) {
				const lines = doc.splitTextToSize(`• ${item}`, maxWidth);
				ensureSpace(lines.length);
				doc.text(lines, marginX, y);
				y += lines.length * lineHeight;
			}
			y += lineHeight * 0.25;
		};

		// --- Contact details & links (sidebar content) ---
		const contactLines = [...contact.addressLines, contact.email];
		for (const line of contactLines) {
			ensureSpace();
			doc.text(line, marginX, y);
			y += 14;
		}
		y += 10;

		if (links.length) {
			doc.setFont('Helvetica', 'bold');
			doc.setFontSize(11);
			doc.text('Lenker', marginX, y);
			y += 16;
			doc.setFont('Helvetica', 'normal');
			doc.setFontSize(10);

			for (const link of links) {
				const text = link.label;
				const lines = doc.splitTextToSize(text, maxWidth);
				ensureSpace(lines.length);
				// First line clickable
				doc.textWithLink(lines[0], marginX, y, { url: link.href });
				// Additional wrapped lines as plain text
				if (lines.length > 1) {
					doc.text(lines.slice(1), marginX, y + lineHeight);
				}
				y += lines.length * lineHeight;
			}
			y += 10;
			doc.setFontSize(11);
		}

		// --- Experience (main column content) ---
		heading('Yrkeserfaring');
		for (const role of experience) {
			subheading(role.title);
			const line = [role.company, role.location].filter(Boolean).join(' · ');
			doc.setFontSize(10);
			if (line) {
				doc.text(line, marginX, y);
				y += lineHeight;
			}
			doc.text(role.period, marginX, y);
			y += lineHeight;
			doc.setFontSize(11);

			paragraph(role.description);

			if (role.meta && role.metaLabel) {
				const metaText = `${role.metaLabel} ${role.meta}`;
				const lines = doc.splitTextToSize(metaText, maxWidth);
				ensureSpace(lines.length);
				doc.setFontSize(9);
				doc.text(lines, marginX, y);
				y += lines.length * lineHeight + 4;
				doc.setFontSize(11);
			}

			y += 6;
		}

		// --- Education ---
		heading('Utdanning');
		for (const edu of education) {
			subheading(edu.title);
			const line = [edu.company, edu.location].filter(Boolean).join(' · ');
			doc.setFontSize(10);
			if (line) {
				doc.text(line, marginX, y);
				y += lineHeight;
			}
			doc.text(edu.period, marginX, y);
			y += lineHeight;
			doc.setFontSize(11);

			paragraph(edu.description);

			if (edu.thesisTitle || edu.thesisDescription) {
				const thesisText = `${edu.thesisTitle ?? ''} ${edu.thesisDescription ?? ''}`.trim();
				if (thesisText) {
					const lines = doc.splitTextToSize(thesisText, maxWidth);
					ensureSpace(lines.length);
					doc.setFont('Helvetica', 'bold');
					doc.text(lines, marginX, y);
					y += lines.length * lineHeight + 4;
					doc.setFont('Helvetica', 'normal');
				}
			}

			bulletList(edu.bullets);
			y += 4;
		}

		// --- Internships (Praksisplasser) ---
		if (internships.length) {
			heading('Praksisplasser');
			for (const p of internships) {
				subheading(p.title);
				const line = [p.company, p.location].filter(Boolean).join(' · ');
				doc.setFontSize(10);
				if (line) {
					doc.text(line, marginX, y);
					y += lineHeight;
				}
				doc.text(p.period, marginX, y);
				y += lineHeight;
				doc.setFontSize(11);

				paragraph(p.description);
				y += 4;
			}
		}

		// --- Activities (Utenomfaglige aktiviteter) ---
		if (activities.length) {
			heading('Utenomfaglige aktiviteter');
			for (const a of activities) {
				subheading(a.title);
				const line = [a.company, a.location].filter(Boolean).join(' · ');
				doc.setFontSize(10);
				if (line) {
					doc.text(line, marginX, y);
					y += lineHeight;
				}
				doc.text(a.period, marginX, y);
				y += lineHeight;
				doc.setFontSize(11);

				paragraph(a.description);
				y += 4;
			}
		}

		// --- References ---
		heading('Referanser');
		paragraph('Referanser oppgis på forespørsel.');

		doc.save('Marie-Blichfeldt-Mo-CV.pdf');
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
						class="print:hidden truncate align-top justify-start rounded-full border border-amber-500 dark:border-amber-800 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 shadow-sm ring-slate-300 transition hover:bg-white hover:shadow-md"
					>
						Last ned som PDF
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
						{#each contact.addressLines as line}
							<p>{line}</p>
						{/each}
						<p>
							<a href="mailto:{contact.email}" class="hover:text-slate-900">{contact.email}</a>
						</p>
						{#if contact.notes?.length}
							<div class="w-full border-b py-1"></div>
							<ul class="mt-2 list-inside list-disc space-y-0.5 text-xs text-slate-600">
								{#each contact.notes as note}
									<li>{note}</li>
								{/each}
							</ul>
						{/if}
					</div>
				</section>

				<section>
					<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Lenker</h2>
					<ul class="mt-3 space-y-1">
						{#each links as link}
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
						{#each interests as interest}
							<li
								class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
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
						{#each certificates as cert}
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
						{#each courses as course}
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
				<section>
					<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
						Yrkeserfaring
					</h2>
					<div class="mt-4 space-y-6 border-l border-slate-200 pl-5">
						{#each experience as role}
							<article class="relative pl-4">
								<div
									class="absolute left-[-0.6rem] top-2 h-2 w-2 rounded-full bg-sky-500 ring-2 ring-sky-100"
								></div>
								<header>
									<h3 class="font-semibold text-slate-900">{role.title}</h3>
									{#if role.company}
										<p class="text-slate-600">
											{role.company}
											{#if role.location}&middot; {role.location}{/if}
										</p>
									{/if}
									<p class="text-[0.8rem] text-slate-500">{role.period}</p>
								</header>
								{#if role.description}
									<p class="mt-3 text-slate-700">{role.description}</p>
								{/if}
								{#if role.meta}
									<p class="mt-2 text-xs text-slate-500">
										<span class="font-semibold text-slate-600">{role.metaLabel}</span>
										{' '}{role.meta}
									</p>
								{/if}
							</article>
						{/each}
					</div>
				</section>

				<section>
					<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
						Utdanning
					</h2>
					<div class="mt-4 space-y-6 border-l border-slate-200 pl-5">
						{#each education as edu}
							<article class="relative pl-4">
								<div
									class="absolute left-[-0.6rem] top-2 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-violet-100"
								></div>
								<header>
									<h3 class="font-semibold text-slate-900">{edu.title}</h3>
									{#if edu.company}
										<p class="text-slate-600">
											{edu.company}
											{#if edu.location}&middot; {edu.location}{/if}
										</p>
									{/if}
									<p class="text-[0.8rem] text-slate-500">{edu.period}</p>
								</header>
								{#if edu.description}
									<p class="mt-3 text-slate-700">{edu.description}</p>
								{/if}
								{#if edu.thesisTitle || edu.thesisDescription}
									<p class="mt-1 text-slate-700">
										{#if edu.thesisTitle}
											<span class="font-semibold">{edu.thesisTitle}</span>
										{/if}
										{#if edu.thesisDescription}
											{' '}{edu.thesisDescription}
										{/if}
									</p>
								{/if}
								{#if edu.bullets}
									<ul class="mt-3 list-inside list-disc space-y-1">
										{#each edu.bullets as bullet}
											<li>{bullet}</li>
										{/each}
									</ul>
								{/if}
							</article>
						{/each}
					</div>
				</section>

				<section>
					<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
						Praksisplasser
					</h2>
					<div class="mt-4 space-y-3 border-l border-slate-200 pl-5">
						{#each internships as internship}
							<article class="relative pl-4">
								<div
									class="absolute left-[-0.6rem] top-2 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100"
								></div>
								<header>
									<h3 class="font-semibold text-slate-900">{internship.title}</h3>
									{#if internship.company}
										<p class="text-slate-600">
											{internship.company}
											{#if internship.location}&middot; {internship.location}{/if}
										</p>
									{/if}
									<p class="text-[0.8rem] text-slate-500">{internship.period}</p>
								</header>
							</article>
						{/each}
					</div>
				</section>

				<section>
					<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
						Utenomfaglige aktiviteter
					</h2>
					<div class="mt-4 space-y-3 border-l border-slate-200 pl-5">
						{#each activities as activity}
							<article class="relative pl-4">
								<div
									class="absolute left-[-0.6rem] top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-amber-100"
								></div>
								<header>
									<h3 class="font-semibold text-slate-900">{activity.title}</h3>
									{#if activity.company}
										<p class="text-slate-600">
											{activity.company}
											{#if activity.location}&middot; {activity.location}{/if}
										</p>
									{/if}
									<p class="text-[0.8rem] text-slate-500">{activity.period}</p>
								</header>

								{activity.description}
							</article>
						{/each}
					</div>
				</section>

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
