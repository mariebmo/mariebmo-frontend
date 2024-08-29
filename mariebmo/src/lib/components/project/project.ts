export enum ProjectCardColor {
	ORANGE,
	BLUE,
	GREEN,
	RED,
	YELLOW,
	PURPLE,
	PINK
}

export interface Project {
	title: string;
	description: string;
	color: ProjectCardColor;
	icon: string;
	link: string;
	showWhenExpanded: unknown | null;
}
