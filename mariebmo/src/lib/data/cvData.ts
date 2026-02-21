/**
 * CV content for the About → CV page and PDF generation.
 */

export type CvLink = {
	label: string;
	href: string;
};

export type CvCourse = {
	name: string;
	date: string;
};

export type CvTimelineEntry = {
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

export type CvContact = {
	name: string;
	title: string;
	addressLines: string[];
	email: string;
	notes: string[];
};

export const contact: CvContact = {
	name: 'Marie Blichfeldt Mo',
	title: 'Senior tools software utvikler & 3D-grafiker',
	addressLines: ['Oslo, Norge'],
	email: 'mariebmo@proton.me',
	notes: ['Førerkort klasse B', 'Båtførerbevis']
};

export const links: CvLink[] = [
	{ label: 'github.com/mariebmo', href: 'https://github.com/mariebmo' },
	{ label: 'linkedin.com/in/mariebmo/', href: 'https://linkedin.com/in/mariebmo/' },
	{ label: 'artstation.com/mariestigen', href: 'https://artstation.com/mariestigen' }
];

export const interests = [
	'Brettspill & gaming',
	'Bøker',
	'Håndarbeid',
	'TTRPG (D&D)',
	'Mat',
	'Programmering'
];

export const certificates = [
	{
		name: 'Microsoft Certified: Azure AI Fundamentals',
		date: 'mars 2021'
	}
];

export const courses: CvCourse[] = [
	{ name: 'Grunnkurs i Arbeidsmiljø', date: 'aug 2020' },
	{ name: 'Alkoholloven og skjenkeproblematikk', date: 'jan 2019' },
	{ name: 'Forebygging og håndtering av seksuell trakassering', date: 'jan 2019' }
];

export const experience: CvTimelineEntry[] = [
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

export const education: CvTimelineEntry[] = [
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

export const internships: CvTimelineEntry[] = [
	{
		title: 'Bachelorpraksis',
		company: 'Attensi',
		location: 'Oslo',
		period: 'jan 2018 – juni 2018',
		description:
			'Utviklet scener og prosedurale materialer for Unity-spill, med fokus på effektivitet og skalerbarhet.'
	}
];

export const activities: CvTimelineEntry[] = [
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
