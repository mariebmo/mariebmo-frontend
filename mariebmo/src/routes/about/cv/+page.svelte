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
	};

	const contact = {
		name: 'Marie Blichfeldt Mo',
		title: 'Senior tools software utvikler & 3D-grafiker',
		addressLines: ['Oslo, Norway'],
		phone: '+47 xx xx xxx x',
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
		'Håndarbeid',
		'Svømming',
		'TTRPG (Dungeons & Dragons)',
		'Matlaging',
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
				'Bygget en lettvekts webløsning som komplementerer den eksisterende WPF-klienten, med fokus på brukeropplevelse for kunder, koblet mot .NET-backend via WebSockets og REST-endepunkter. Levert en AI-først-løsning for autogenerering av opplæringsinnhold av høy kvalitet med bruk av Flowise, med veiledning fra brukeren. Sentral i kommunikasjon og implementasjon av API-er fra ulike teknologi-team i Attensi. Ledet pilotprosjekt for å onboarde designere til kodeprosjekter med Cursor og kodegenerering, med tett samarbeid med stakeholders og bruk av Scrum, og jobbet tett med designere i Figma.',
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
				'Bachelor i programmering med hovedvekt på backend og robuste, skalerbare løsninger. Bacheloroppgave (A): «Alternatives to AssetBundles for runtime up-/download and rendering of 3D-assets in Unity».',
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
				'Bachelor i 3D-grafikk med fokus på helhetlig produksjonspipeline for interaktivt og pre-rendered innhold. Bacheloroppgave (A): «Optimization of the design pipeline with the use of procedural textures».',
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
			period: 'jan 2018 – juni 2018'
		}
	];

	const activities: TimelineEntry[] = [
		{
			title: 'Nestleder',
			company: 'Kvinner & IT (KIT)',
			location: 'Oslo',
			period: 'aug 2021 – jan 2023'
		},
		{
			title: 'Nestleder',
			company: 'BIOS studentforening',
			location: 'Oslo',
			period: 'juni 2021 – des 2021'
		},
		{
			title: 'Skiftleder',
			company: 'Skjenkestua Studentbar',
			location: 'Oslo',
			period: 'mars 2018 – aug 2019'
		},
		{
			title: 'Velferdsansvarlig, Arbeidsutvalget',
			company: 'Studentsamfunnet Westerdals Oslo ACT',
			location: 'Oslo',
			period: 'feb 2017 – aug 2018'
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

		let y = 60;

		const ensureSpace = (lines = 1) => {
			const needed = lines * lineHeight + 30;
			if (y + needed > pageHeight - 40) {
				doc.addPage();
				y = 60;
			}
		};

		const heading = (text: string) => {
			doc.setFont('Helvetica', 'bold');
			doc.setFontSize(16);
			ensureSpace(2);
			doc.text(text, marginX, y);
			y += lineHeight * 1.8;
			doc.setFontSize(11);
			doc.setFont('Helvetica', 'normal');
		};

		const subheading = (text: string) => {
			doc.setFont('Helvetica', 'bold');
			doc.setFontSize(12);
			ensureSpace(1);
			doc.text(text, marginX, y);
			y += lineHeight * 1.3;
			doc.setFontSize(11);
			doc.setFont('Helvetica', 'normal');
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

		// Header
		doc.setFont('Helvetica', 'bold');
		doc.setFontSize(20);
		doc.text(contact.name, marginX, y);
		y += 24;

		doc.setFontSize(12);
		doc.setFont('Helvetica', 'normal');
		doc.text(contact.title, marginX, y);
		y += 18;

		// Contact details
		const contactLines = [...contact.addressLines, contact.phone, contact.email];
		for (const line of contactLines) {
			doc.text(line, marginX, y);
			y += 14;
		}
		y += 10;

		// Links
		if (links.length) {
			doc.setFont('Helvetica', 'bold');
			doc.setFontSize(11);
			doc.text('Lenker:', marginX, y);
			y += 16;
			doc.setFont('Helvetica', 'normal');

			for (const link of links) {
				const text = link.label;
				const lines = doc.splitTextToSize(text, maxWidth);
				ensureSpace(lines.length);
				// Draw first line as clickable link
				doc.textWithLink(lines[0], marginX, y, { url: link.href });
				// Any additional wrapped lines as normal text
				if (lines.length > 1) {
					doc.text(lines.slice(1), marginX, y + lineHeight);
				}
				y += lines.length * lineHeight;
			}
			y += 10;
		}

		// Experience
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

		// Education
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
			bulletList(edu.bullets);
			y += 4;
		}

		// Other sections (brief)
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
				y += lineHeight + 4;
				doc.setFontSize(11);
			}
		}

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
				y += lineHeight + 4;
				doc.setFontSize(11);
			}
		}

		doc.save('Marie-Blichfeldt-Mo-CV.pdf');
	}
</script>

<div class="print-cv-root mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
	<section
		class="relative overflow-hidden rounded-3xl bg-white/90 shadow-xl ring-1 ring-slate-200 backdrop-blur"
	>
		<div
			class="pointer-events-none absolute inset-x-[-10%] -top-40 h-64 bg-gradient-to-br from-sky-100 via-fuchsia-50 to-transparent opacity-70"
			aria-hidden="true"
		></div>

		<!-- Header -->
		<header
			class="relative border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-6 text-slate-50 sm:px-10 sm:py-8"
		>
			<div class="flex flex-col gap-4 sm:flex-row sm:justify-between">
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
						Curriculum Vitae
					</p>
					<h1 class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
						{contact.name}
					</h1>
					<p class="mt-1 text-sm text-slate-200 sm:text-base">
						{contact.title}
					</p>
					<p class="mt-3 text-xs text-slate-300 sm:text-sm">
						Basert i Oslo. Fokus på verktøyutvikling, AI-drevne workflows og brukersentrerte
						løsninger for innholdsproduksjon.
					</p>
				</div>

				<div class="flex print:hidden h-full items-start">
					<button
						type="button"
						on:click={generatePdf}
						class="print:hidden inline-flex items-center align-top justify-start gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 shadow-sm ring-1 ring-slate-300 transition hover:bg-white hover:shadow-md"
					>
						<svg
							class="h-4 w-4 text-slate-700"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4h1a2 2 0 0 1 2 2v3.5a2.5 2.5 0 0 1-2 2.45V18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3.05A2.5 2.5 0 0 1 3 12.5V9a2 2 0 0 1 2-2h1V3Zm2 4h6V3H7v4Zm3 3a.75.75 0 0 1 .75.75V14h1.69a.75.75 0 0 1 .53 1.28l-2.19 2.2a.75.75 0 0 1-1.06 0l-2.19-2.2A.75.75 0 0 1 7.06 14h1.69v-3.25A.75.75 0 0 1 10 10Z"
								clip-rule="evenodd"
							/>
						</svg>
						<span>Last ned som PDF</span>
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
							<a href="tel:+4748139072" class="hover:text-slate-900">{contact.phone}</a>
						</p>
						<p>
							<a href="mailto:{contact.email}" class="hover:text-slate-900">{contact.email}</a>
						</p>
						{#if contact.notes?.length}
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
