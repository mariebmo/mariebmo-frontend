export interface BookClubDto {
	id: string;
	name: string;
	description: string | null;
	coverImage: string | null;
	createdAt: string;
	adminId: string;
	memberCount: number;
	currentBook: BookDto | null;
	theme: string | null;
	themeChangedAt: string | null;
	isPublic: boolean;
	inviteSlug: string | null;
	inviteSlugExpiresAt: string | null;
	allowComments: boolean;
	allowRatings: boolean;
	allowDnfVote: boolean;
	allowMeetupVote: boolean;
	allowMeetupDetails: boolean;
}

export interface BookClubMemberDto {
	id: string;
	userId: string;
	displayName: string;
	email: string;
	role: string;
	joinedAt: string;
	currentBookProgress: MemberBookProgressDto | null;
}

export interface MemberBookProgressDto {
	id: string;
	currentPage: number | null;
	currentChapterNumber: number | null;
	progressUpdatedAt: string | null;
	joinStatus: string;
	readingFormats: number;
	readingLanguage: string | null;
}

export interface BookDto {
	id: string;
	clubId: string;
	title: string;
	author: string;
	coverImage: string | null;
	pageCount: number | null;
	startDate: string | null;
	endDate: string | null;
	isCurrentBook: boolean;
	createdAt: string;
	chapters: ChapterDto[];
	meetup: MeetupDto | null;
	averageRating: number | null;
	ratingCount: number;
}

export interface ChapterDto {
	id: string;
	number: number;
	title: string | null;
	pageStart: number | null;
	pageEnd: number | null;
}

export interface ChapterInputDto {
	number: number;
	title?: string | null;
	pageStart?: number | null;
	pageEnd?: number | null;
}

export interface MeetupDto {
	id: string;
	bookId: string;
	scheduledAt: string | null;
	location: string | null;
	link: string | null;
	notes: string | null;
	dateVotes: MeetupDateVoteDto[];
}

export interface MeetupDateVoteDto {
	id: string;
	userId: string;
	preferredDate: string;
}

export interface BookRatingDto {
	id: string;
	userId: string;
	userDisplayName: string;
	score: number;
	finishingThought: string | null;
	completedAt: string;
}

export interface NoteDto {
	id: string;
	bookId: string;
	userId: string;
	userDisplayName: string;
	pageNumber: number | null;
	chapterNumber: number | null;
	content: string;
	isPrivate: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface BookClubListResponse {
	clubs: BookClubDto[];
}

export interface BookClubDetailResponse {
	club: BookClubDto;
	members: BookClubMemberDto[];
	currentBook: BookDto | null;
	pastBooks: BookDto[];
}

export interface BookDetailResponse {
	book: BookDto;
	notes: NoteDto[];
	ratings: BookRatingDto[];
	myProgress: MemberBookProgressDto | null;
	dnfVoteCount: number;
}

export interface CreateBookClubRequest {
	name: string;
	description?: string | null;
	theme?: string | null;
	isPublic?: boolean;
}

export interface UpdateBookClubRequest {
	name?: string | null;
	description?: string | null;
	theme?: string | null;
	coverImage?: string | null;
	isPublic?: boolean | null;
	inviteSlug?: string | null;
	inviteSlugExpiresAt?: string | null;
	invitePassword?: string | null;
	allowComments?: boolean | null;
	allowRatings?: boolean | null;
	allowDnfVote?: boolean | null;
	allowMeetupVote?: boolean | null;
	allowMeetupDetails?: boolean | null;
}

export interface InviteMemberRequest {
	email: string;
}

export interface AddBookRequest {
	title: string;
	author: string;
	coverImage?: string | null;
	pageCount?: number | null;
	startDate?: string | null;
	endDate?: string | null;
	isCurrentBook?: boolean;
	chapters?: ChapterInputDto[] | null;
}

export interface UpdateBookRequest {
	title?: string | null;
	author?: string | null;
	coverImage?: string | null;
	pageCount?: number | null;
	startDate?: string | null;
	endDate?: string | null;
	isCurrentBook?: boolean | null;
	chapters?: ChapterInputDto[] | null;
}

export interface CreateNoteRequest {
	pageNumber?: number | null;
	chapterNumber?: number | null;
	content: string;
	isPrivate?: boolean;
}

export interface UpdateNoteRequest {
	pageNumber?: number | null;
	chapterNumber?: number | null;
	content?: string | null;
	isPrivate?: boolean | null;
}

export interface SetMyProgressRequest {
	currentPage?: number | null;
	currentChapterNumber?: number | null;
	joinStatus?: string | null;
	readingFormats?: number | null;
	readingLanguage?: string | null;
}

export interface SetBookRatingRequest {
	score: number;
	finishingThought?: string | null;
}

export interface UpdateMeetupRequest {
	scheduledAt?: string | null;
	location?: string | null;
	link?: string | null;
	notes?: string | null;
}

export interface SetMeetupDateVoteRequest {
	preferredDate: string;
}

export interface JoinByInviteRequest {
	slug: string;
	password?: string | null;
}

export interface BookInfoResponse {
	title: string | null;
	author: string | null;
	coverImage: string | null;
	pageCount: number | null;
	rating: number | null;
	description: string | null;
}

export const ReadingFormat = {
	None: 0,
	Audiobook: 1,
	Physical: 2,
	Ebook: 4
} as const;

export const JoinStatus = {
	NotSet: 'notset',
	Joined: 'joined',
	Skipping: 'skipping'
} as const;
