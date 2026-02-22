/**
 * Educational / experience projects from https://github.com/mariebmo-edu
 * Used on the About → Experience page.
 *
 * Tags can be: languages, themes (frontend/backend/fullstack/etc.), frameworks and packages.
 */

export interface ExperienceProject {
	/** Display headline, e.g. "2020: PGR103, Kreativt Webprosjekt, EKSAMEN (A)" */
	headline: string;
	/** Tech stack tags: languages, themes, frameworks/packages */
	tags: string[];
	/** GitHub repo URL */
	repoUrl: string;
	/** Short project description */
	description: string;
	/** How the project is built (tech, architecture, etc.) */
	howItIsBuilt: string;
}

/**
 * Map tag label → Devicon font class (devicon.dev).
 * Use with: <i class="{TAG_DEVICON_MAP[tag]} colored"></i>
 * Tags not in the map render as text-only.
 */
export const TAG_DEVICON_MAP: Record<string, string> = {
	HTML: 'devicon-html5-plain',
	CSS: 'devicon-css3-plain',
	Java: 'devicon-java-plain',
	'C#': 'devicon-csharp-plain',
	C: 'devicon-c-plain',
	Kotlin: 'devicon-kotlin-plain',
	JavaScript: 'devicon-javascript-plain',
	TypeScript: 'devicon-typescript-plain',
	Spring: 'devicon-spring-plain',
	'Spring Boot': 'devicon-spring-plain',
	Docker: 'devicon-docker-plain',
	AWS: 'devicon-amazonwebservices-plain-wordmark',
	Terraform: 'devicon-terraform-plain',
	Android: 'devicon-android-plain',
	Linux: 'devicon-linux-plain',
	'GitHub Actions': 'devicon-githubactions-plain',
	MongoDB: 'devicon-mongodb-plain',
	Node: 'devicon-nodejs-plain'
};

const GITHUB_ORG = 'https://github.com/mariebmo-edu';

export const experienceProjects: ExperienceProject[] = [
	{
		headline: '2020: PGR103, Kreativt Webprosjekt, EKSAMEN (A)',
		tags: ['HTML', 'CSS', 'frontend'],
		repoUrl: `${GITHUB_ORG}/pro105-kreativt-webprosjekt-Eksamen`,
		description:
			'Fishavdisor — kreativt webprosjekt. Eksamensprosjekt i faget Kreativt Webprosjekt, første semester.',
		howItIsBuilt:
			'Statisk HTML og CSS. Bygget som en enkel nettside med fokus på layout, typografi og visuell kommunikasjon uten rammeverk.'
	},
	{
		headline: '2020: PGR102, Intro til Programmering, EKSAMEN (Godkjent)',
		tags: ['HTML', 'frontend'],
		repoUrl: `${GITHUB_ORG}/pgr102-intro-til-programmering-eksamen-h2022`,
		description:
			'Løsningsforslag og oppgaver fra introduksjon til programmering. Grunnleggende programmeringskonsepter og problemløsning.',
		howItIsBuilt:
			'Oppgaver og løsninger dokumentert med HTML. Fokus på variabler, løkker, betingelser og enkel brukeropplevelse.'
	},
	{
		headline: '2021: PRO104, Webprosjekt, EKSAMEN (Godkjent)',
		tags: ['HTML', 'CSS', 'frontend'],
		repoUrl: `${GITHUB_ORG}/pro104-webprosjekt-eksamen`,
		description: 'Eksamensprosjekt våren 2021 i Webprosjekt. Fullført webprosjekt med planlegging og implementasjon.',
		howItIsBuilt:
			'Webprosjekt bygget med HTML og CSS. Inkluderer strukturert prosjektarbeid, designvalg og implementasjon av en fungerende nettside.'
	},
	{
		headline: '2021: PGR103, Objektorientert Programmering, EKSAMEN (Godkjent)',
		tags: ['Java', 'backend', 'OOP'],
		repoUrl: `${GITHUB_ORG}/PGR112-objektorientert-programmering-eksamen-v2023`,
		description:
			'Eksamen i objektorientert programmering. Klasser, arv, polymorfisme, innkapsling og design av Java-applikasjoner.',
		howItIsBuilt:
			'Java-prosjekter med objektorientert design. Bruk av grensesnitt, abstrakte klasser og prinsipper som SOLID og DRY.'
	},
	{
		headline: '2022: PG3302, Software Design, EKSAMEN (A)',
		tags: ['C#', 'backend', 'design patterns'],
		repoUrl: `${GITHUB_ORG}/pg3302-software-design-eksamen`,
		description:
			'Eksamen i software design. Designmønstre, arkitektur og skalerbare løsninger i C#.',
		howItIsBuilt:
			'C#-prosjekt med fokus på design patterns (Factory, Observer, Strategy m.fl.), ren arkitektur og testbar kode.'
	},
	{
		headline: '2022: PG4200, Algoritmer og Datastrukturer, EKSAMEN (A)',
		tags: ['Java', 'backend', 'algorithms', 'data structures'],
		repoUrl: GITHUB_ORG,
		description:
			'Eksamen i algoritmer og datastrukturer. Analyse av kjøretid, grafer, sortering, søk og datastrukturer.',
		howItIsBuilt:
			'Java-implementasjoner av algoritmer og datastrukturer (trær, grafer, hashtabeller). Tids- og plasskompleksitet analysert og dokumentert.'
	},
	{
		headline: '2022: PGR203, Avansert Java, EKSAMEN (B)',
		tags: ['Java', 'Spring Boot', 'backend', 'REST API', 'JPA'],
		repoUrl: GITHUB_ORG,
		description:
			'Eksamen i avansert Java. Backend-utvikling, Spring, REST API og persistering.',
		howItIsBuilt:
			'Spring Boot-applikasjon med REST-endepunkter, dependency injection og database-tilgang (f.eks. JPA/Hibernate).'
	},
	{
		headline: '2023: PG5100, Enterprise 1, EKSAMEN (A)',
		tags: ['Java', 'Spring', 'backend', 'Jakarta EE', 'REST API'],
		repoUrl: GITHUB_ORG,
		description:
			'Eksamen i Enterprise 1. Bygge enterprise-løsninger med Java EE / Jakarta EE og moderne arkitektur.',
		howItIsBuilt:
			'Enterprise Java med applikasjonsservere, EJBs, JPA, REST og sikkerhet. Fokus på skalerbarhet og forretningslogikk.'
	},
	{
		headline: '2023: PGR208, Android Programmering, EKSAMEN (A)',
		tags: ['Kotlin', 'Android', 'mobile', 'Android SDK', 'Room', 'ViewModel'],
		repoUrl: GITHUB_ORG,
		description:
			'Eksamen i Android-programmering. Native mobilapp med Kotlin og Android SDK.',
		howItIsBuilt:
			'Kotlin og Android SDK. Bruk av ViewModel, LiveData/Flow, Room for persistering og Material Design-komponenter.'
	},
	{
		headline: '2023: PGR6301, Webutvikling & API-design, EKSAMEN (A)',
		tags: ['JavaScript', 'fullstack', 'REST API', 'frontend', 'backend', 'Node'],
		repoUrl: GITHUB_ORG,
		description:
			'Eksamen i webutvikling og API-design. Fullstack web med moderne rammeverk og RESTful API.',
		howItIsBuilt:
			'Frontend med moderne JS/TS-rammeverk (f.eks. React/Vue/Svelte), backend med Node eller Java, REST API og ev. database.'
	},
	{
		headline: '2023: PGR301, DevOps i Skyen, EKSAMEN (A)',
		tags: [
			'AWS',
			'Terraform',
			'Docker',
			'GitHub Actions',
			'infrastructure as code',
			'CI/CD',
			'Lambda',
			'CloudWatch'
		],
		repoUrl: `${GITHUB_ORG}/pg301-devops-i-skyen-eksamen`,
		description:
			'Eksamen i DevOps i skyen. GitHub Actions, Lambda, SAM, Docker, Terraform og CloudWatch.',
		howItIsBuilt:
			'Infrastruktur som kode med Terraform, CI/CD med GitHub Actions, serverless med AWS Lambda/SAM, containere med Docker og overvåking med CloudWatch.'
	},
	{
		headline: '2023: PG3401, Programmering i C for Linux, EKSAMEN (B)',
		tags: ['C', 'Linux', 'backend', 'systems programming', 'gcc', 'Make'],
		repoUrl: `${GITHUB_ORG}/pg3401-c-for-linux-eksamen`,
		description: 'Eksamen i C for Linux. Systemnær programmering, minnehåndtering og Linux-miljø.',
		howItIsBuilt:
			'C-programmer på Linux med bruk av systemkall, filhåndtering, prosesser og minne. Kompilering med gcc og Make.'
	}
];
