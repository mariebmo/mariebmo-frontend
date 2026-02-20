<script lang="ts">
	import pdfMake from 'pdfmake/build/pdfmake';
	import vfsFonts from 'pdfmake/build/vfs_fonts';
	import CvTimelineSection from '$lib/components/cv/CvTimelineSection.svelte';

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

	// Convert an img element to a base64 data URL via canvas
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
			await generatePdfInternal();
		} finally {
			pdfGenerating = false;
		}
	}

	async function generatePdfInternal() {
		if (typeof window === 'undefined') return;

		type VfsModule = { pdfMake?: { vfs?: Record<string, string> }; vfs?: Record<string, string> };
		const vfsModule = vfsFonts as VfsModule;
		(pdfMake as { vfs?: Record<string, string> }).vfs = vfsModule?.pdfMake?.vfs ?? vfsModule?.vfs;

		// Grab the profile photo from the rendered page
		const photoEl = document.querySelector('.print-cv-root img') as HTMLImageElement | null;
		const photoData = photoEl ? await imgToBase64(photoEl) : null;

		const C = {
			// amber-400 golden (#FBBF24) matches the website light mode header
			amber: '#FBBF24',
			amberLabel: '#92400E', // amber-800 for the eyebrow label
			white: '#FFFFFF',
			slate900: '#0F172A',
			slate800: '#1E293B',
			slate700: '#334155',
			slate600: '#475569',
			slate500: '#64748B',
			slate200: '#E2E8F0',
			sky700: '#0369A1',
			sky500: '#0EA5E9',
			sky100: '#E0F2FE',
			violet500: '#8B5CF6',
			violet100: '#EDE9FE',
			emerald500: '#10B981',
			emerald100: '#D1FAE5',
			amber500: '#F59E0B',
			amber100: '#FEF3C7',
			blue50: '#EFF6FF',
			blue200: '#BFDBFE'
		};

		const sideLabel = (text: string) => ({
			text: text.toUpperCase(),
			fontSize: 6,
			bold: true,
			color: C.slate500,
			margin: [0, 10, 0, 4]
		});

		const mainLabel = (text: string) => ({
			text: text.toUpperCase(),
			fontSize: 6.5,
			bold: true,
			color: C.slate500,
			margin: [0, 14, 0, 6]
		});

		const dotSvg = (fill: string, ring: string) =>
			`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">` +
			`<circle cx="7" cy="7" r="6" fill="${ring}"/>` +
			`<circle cx="7" cy="7" r="3.5" fill="${fill}"/>` +
			`</svg>`;

		const buildEntry = (entry: TimelineEntry, dotFill: string, dotRing: string) => ({
			// unbreakable: true prevents pdfmake from splitting this entry across pages
			stack: [
				{
					columns: [
						{ svg: dotSvg(dotFill, dotRing), width: 14, margin: [0, 2, 0, 0] },
						{
							stack: [
								{ text: entry.title, fontSize: 9.5, bold: true, color: C.slate900 },
								...(entry.company
									? [
											{
												text: entry.location
													? [{ text: entry.company }, { text: ` · ${entry.location}` }]
													: entry.company,
												fontSize: 8.5,
												color: C.slate600,
												margin: [0, 1, 0, 0]
											}
										]
									: []),
								{ text: entry.period, fontSize: 7.5, color: C.slate500, margin: [0, 1, 0, 0] },
								...(entry.description
									? [
											{
												text: entry.description,
												fontSize: 8,
												color: C.slate700,
												margin: [0, 4, 0, 0],
												lineHeight: 1.4
											}
										]
									: []),
								...(entry.thesisTitle
									? [
											{
												text: [
													{ text: entry.thesisTitle + ' ', bold: true, color: C.slate800 },
													{ text: entry.thesisDescription ?? '', color: C.slate700 }
												],
												fontSize: 8,
												margin: [0, 3, 0, 0],
												lineHeight: 1.4
											}
										]
									: []),
								...(entry.bullets?.length
									? [
											{
												ul: entry.bullets,
												fontSize: 8,
												color: C.slate700,
												margin: [0, 4, 0, 0],
												lineHeight: 1.4
											}
										]
									: []),
								...(entry.meta && entry.metaLabel
									? [
											{
												text: [
													{ text: entry.metaLabel + ' ', bold: true, color: C.slate600 },
													{ text: entry.meta, color: C.slate500 }
												],
												fontSize: 7.5,
												margin: [0, 3, 0, 0],
												lineHeight: 1.35
											}
										]
									: [])
							],
							margin: [5, 0, 0, 0]
						}
					],
					columnGap: 0
				}
			],
			unbreakable: true,
			margin: [0, 0, 0, 10]
		});

		const timelineSection = (
			label: string,
			entries: TimelineEntry[],
			dotFill: string,
			dotRing: string
		) => ({
			stack: [
				mainLabel(label),
				{
					table: {
						widths: [2, '*'],
						body: [
							[
								{ text: '', border: [false, false, false, false], fillColor: C.slate200 },
								{
									border: [false, false, false, false],
									stack: entries.map((e) => buildEntry(e, dotFill, dotRing)),
									margin: [6, 0, 0, 0]
								}
							]
						]
					},
					layout: {
						hLineWidth: () => 0,
						vLineWidth: (i: number) => (i === 1 ? 0.75 : 0),
						vLineColor: () => C.slate200,
						paddingLeft: () => 0,
						paddingRight: () => 0,
						paddingTop: () => 2,
						paddingBottom: () => 2
					}
				}
			]
		});

		// Interest pills: each pill is an SVG rounded rect with text
		// Escape special XML/SVG characters to prevent parse errors
		const xmlEscape = (s: string) =>
			s
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&apos;');

		const makePill = (text: string) => {
			const safe = xmlEscape(text);
			const approxW = Math.max(text.length * 4 + 14, 32);
			const h = 14;
			const r = 7;
			return {
				svg:
					`<svg xmlns="http://www.w3.org/2000/svg" width="${approxW}" height="${h}">` +
					`<rect x="0.5" y="0.5" width="${approxW - 1}" height="${h - 1}" rx="${r}" ry="${r}" ` +
					`fill="#EFF6FF" stroke="#BFDBFE" stroke-width="0.8"/>` +
					`<text x="${approxW / 2}" y="9.5" font-family="Helvetica" font-size="7" ` +
					`fill="#334155" text-anchor="middle">${safe}</text>` +
					`</svg>`,
				width: approxW,
				margin: [0, 0, 3, 3]
			};
		};
		// Wrap pills into rows at max sidebar width
		const pillStackRows: Record<string, unknown>[] = [];
		let currentRow: Record<string, unknown>[] = [];
		let rowWidth = 0;
		const MAX_ROW_W = 148;
		for (const interest of interests) {
			const w = Math.max(interest.length * 4 + 14, 32) + 3;
			if (rowWidth + w > MAX_ROW_W && currentRow.length > 0) {
				pillStackRows.push({ columns: currentRow, columnGap: 0, margin: [0, 0, 0, 0] });
				currentRow = [];
				rowWidth = 0;
			}
			currentRow.push(makePill(interest));
			rowWidth += w;
		}
		if (currentRow.length) pillStackRows.push({ columns: currentRow, columnGap: 0 });

		const dd = {
			pageSize: 'A4',
			pageMargins: [0, 0, 0, 0],
			content: [
				// Header background — amber-400 golden matching the website
				{
					canvas: [{ type: 'rect', x: 0, y: 0, w: 595, h: 120, color: C.amber }],
					absolutePosition: { x: 0, y: 0 }
				},
				// Header text — on amber-400, text is dark slate (not white)
				{
					stack: [
						{
							text: 'CURRICULUM VITAE',
							fontSize: 6.5,
							bold: true,
							color: C.amberLabel,
							margin: [0, 0, 0, 4]
						},
						{
							text: contact.name,
							fontSize: 22,
							bold: true,
							color: C.slate900,
							margin: [0, 0, 0, 3]
						},
						{ text: contact.title, fontSize: 10, color: C.slate800, margin: [0, 0, 0, 5] },
						{
							text: 'Fullstackutvikler basert i Oslo. Fokus på verktøyutvikling, AI-drevne workflows og brukersentrerte løsninger for innholdsproduksjon.',
							fontSize: 8.5,
							color: C.slate700,
							lineHeight: 1.4
						}
					],
					margin: [32, 18, 32, 0]
				},
				// Body columns
				{
					margin: [20, 48, 20, 20],
					columns: [
						// SIDEBAR
						{
							width: 155,
							stack: [
								sideLabel('Personalia'),
								...(photoData
									? [
											{
												image: photoData,
												width: 148,
												margin: [0, 0, 0, 6],
												borderRadius: [4, 4, 4, 4]
											}
										]
									: []),
								{
									text: contact.email,
									fontSize: 8,
									color: C.sky700,
									link: `mailto:${contact.email}`,
									margin: [0, 0, 0, 2]
								},
								...contact.addressLines.map((l: string) => ({
									text: l,
									fontSize: 8,
									color: C.slate700,
									margin: [0, 0, 0, 1]
								})),
								{
									canvas: [
										{
											type: 'line',
											x1: 0,
											y1: 3,
											x2: 148,
											y2: 3,
											lineWidth: 0.5,
											lineColor: C.slate200
										}
									],
									margin: [0, 4, 0, 4]
								},
								...contact.notes.map((n: string) => ({
									text: `• ${n}`,
									fontSize: 7.5,
									color: C.slate600,
									margin: [4, 0, 0, 2]
								})),

								sideLabel('Lenker'),
								...links.map((l: Link) => ({
									columns: [
										{
											svg: `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><circle cx="4" cy="4" r="3.5" fill="${C.sky500}"/></svg>`,
											width: 10,
											margin: [0, 1, 0, 0]
										},
										{
											text: l.label,
											fontSize: 8,
											color: C.sky700,
											link: l.href,
											margin: [2, 0, 0, 0]
										}
									],
									margin: [0, 0, 0, 4]
								})),

								sideLabel('Interesser'),
								{ stack: pillStackRows, margin: [0, 0, 0, 6] },

								sideLabel('Sertifikater'),
								...certificates.map((c: { name: string; date: string }) => ({
									stack: [
										{ text: c.name, fontSize: 7.5, bold: true, color: C.slate800, lineHeight: 1.3 },
										{ text: c.date, fontSize: 7, color: C.slate500, margin: [0, 1, 0, 7] }
									]
								})),

								sideLabel('Kurs'),
								...courses.map((c: Course) => ({
									stack: [
										{ text: c.name, fontSize: 7.5, bold: true, color: C.slate800, lineHeight: 1.3 },
										{ text: c.date, fontSize: 7, color: C.slate500, margin: [0, 1, 0, 7] }
									]
								}))
							]
						},
						{ width: 14, text: '' },
						// MAIN COLUMN
						{
							width: '*',
							stack: [
								timelineSection('Yrkeserfaring', experience, C.sky500, C.sky100),
								timelineSection('Utdanning', education, C.violet500, C.violet100),
								timelineSection('Praksisplasser', internships, C.emerald500, C.emerald100),
								timelineSection('Utenomfaglige aktiviteter', activities, C.amber500, C.amber100),
								mainLabel('Referanser'),
								{ text: 'Referanser oppgis på forespørsel.', fontSize: 8.5, color: C.slate700 }
							]
						}
					]
				}
			],
			defaultStyle: { font: 'Roboto' }
		};

		pdfMake
			.createPdf(dd as Parameters<typeof pdfMake.createPdf>[0])
			.download('Marie-Blichfeldt-Mo-CV.pdf');
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
