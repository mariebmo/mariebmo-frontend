/**
 * CV PDF generation using pdfmake.
 * Dynamically imports pdfmake so it is not in the main bundle.
 */

export interface CvContact {
	name: string;
	title: string;
	addressLines: string[];
	email: string;
	notes: string[];
}

export interface CvLink {
	label: string;
	href: string;
}

export interface CvCourse {
	name: string;
	date: string;
}

export interface CvTimelineEntry {
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
}

export interface CvPdfParams {
	contact: CvContact;
	links: CvLink[];
	interests: string[];
	certificates: Array<{ name: string; date: string }>;
	courses: CvCourse[];
	experience: CvTimelineEntry[];
	education: CvTimelineEntry[];
	internships: CvTimelineEntry[];
	activities: CvTimelineEntry[];
	photoData: string | null;
}

const C = {
	// Warm light gray (mariebmo-gray-50) for a subtle header; avoids bright yellow in PDF
	headerBg: '#F9F3F3',
	headerLabel: '#6B6B6B', // mariebmo-gray-700 for "CURRICULUM VITAE"
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

function sideLabel(text: string): Record<string, unknown> {
	return {
		text: text.toUpperCase(),
		fontSize: 6,
		bold: true,
		color: C.slate500,
		margin: [0, 10, 0, 4]
	};
}

function mainLabel(text: string): Record<string, unknown> {
	return {
		text: text.toUpperCase(),
		fontSize: 6.5,
		bold: true,
		color: C.slate500,
		margin: [0, 14, 0, 6]
	};
}

function dotSvg(fill: string, ring: string): string {
	return (
		`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">` +
		`<circle cx="7" cy="7" r="6" fill="${ring}"/>` +
		`<circle cx="7" cy="7" r="3.5" fill="${fill}"/>` +
		`</svg>`
	);
}

function buildEntry(
	entry: CvTimelineEntry,
	dotFill: string,
	dotRing: string
): Record<string, unknown> {
	return {
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
	};
}

function timelineSection(
	label: string,
	entries: CvTimelineEntry[],
	dotFill: string,
	dotRing: string
): Record<string, unknown> {
	return {
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
	};
}

function xmlEscape(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

const PILL_MARGIN_RIGHT = 8;
const PILL_MARGIN_BOTTOM = 2;

function makePill(text: string): Record<string, unknown> {
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
		margin: [0, 0, PILL_MARGIN_RIGHT, PILL_MARGIN_BOTTOM]
	};
}

function buildPillRows(interests: string[]): Record<string, unknown>[] {
	const pillStackRows: Record<string, unknown>[] = [];
	let currentRow: Record<string, unknown>[] = [];
	let rowWidth = 0;
	const MAX_ROW_W = 148;
	for (const interest of interests) {
		const pillW = Math.max(interest.length * 4 + 14, 32);
		const w = pillW + PILL_MARGIN_RIGHT;
		if (rowWidth + w > MAX_ROW_W && currentRow.length > 0) {
			pillStackRows.push({
				columns: currentRow,
				columnGap: 0,
				margin: [0, 0, 0, PILL_MARGIN_BOTTOM]
			});
			currentRow = [];
			rowWidth = 0;
		}
		currentRow.push(makePill(interest));
		rowWidth += w;
	}
	if (currentRow.length) {
		pillStackRows.push({ columns: currentRow, columnGap: 0, margin: [0, 0, 0, 0] });
	}
	return pillStackRows;
}

/**
 * Generates and downloads the CV as PDF. Call from the browser only.
 * Uses dynamic imports for pdfmake so it is not in the main bundle.
 */
export async function generateCvPdf(params: CvPdfParams): Promise<void> {
	if (typeof window === 'undefined') return;

	const pdfMake = (await import('pdfmake/build/pdfmake')).default;
	const vfsFonts = await import('pdfmake/build/vfs_fonts');
	type VfsModule = { pdfMake?: { vfs?: Record<string, string> }; vfs?: Record<string, string> };
	const vfsModule = vfsFonts as VfsModule;
	(pdfMake as { vfs?: Record<string, string> }).vfs =
		vfsModule?.pdfMake?.vfs ?? vfsModule?.vfs ?? {};

	const {
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
	} = params;

	const pillStackRows = buildPillRows(interests);

	const dd = {
		pageSize: 'A4',
		pageMargins: [0, 0, 0, 0],
		content: [
			{
				canvas: [{ type: 'rect', x: 0, y: 0, w: 595, h: 120, color: C.headerBg }],
				absolutePosition: { x: 0, y: 0 }
			},
			{
				stack: [
					{
						text: 'CURRICULUM VITAE',
						fontSize: 6.5,
						bold: true,
						color: C.headerLabel,
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
			{
				margin: [20, 48, 20, 20],
				columns: [
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
							...links.map((l: CvLink) => ({
								columns: [
									{
										svg: `<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5"><circle cx="2.5" cy="2.5" r="2" fill="${C.sky500}"/></svg>`,
										width: 6,
										margin: [0, 2, 0, 0]
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
									{
										text: c.name,
										fontSize: 7.5,
										bold: true,
										color: C.slate800,
										lineHeight: 1.3
									},
									{ text: c.date, fontSize: 7, color: C.slate500, margin: [0, 1, 0, 7] }
								]
							})),
							sideLabel('Kurs'),
							...courses.map((c: CvCourse) => ({
								stack: [
									{
										text: c.name,
										fontSize: 7.5,
										bold: true,
										color: C.slate800,
										lineHeight: 1.3
									},
									{ text: c.date, fontSize: 7, color: C.slate500, margin: [0, 1, 0, 7] }
								]
							}))
						]
					},
					{ width: 14, text: '' },
					{
						width: '*',
						stack: [
							timelineSection('Yrkeserfaring', experience, C.sky500, C.sky100),
							timelineSection('Utdanning', education, C.violet500, C.violet100),
							timelineSection('Praksisplasser', internships, C.emerald500, C.emerald100),
							timelineSection('Utenomfaglige aktiviteter', activities, C.amber500, C.amber100),
							mainLabel('Referanser'),
							{
								text: 'Referanser oppgis på forespørsel.',
								fontSize: 8.5,
								color: C.slate700
							}
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
