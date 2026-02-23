import { dev } from '$app/environment';
import { auth } from '$lib/auth';
import type {
	BookClubDto,
	BookClubDetailResponse,
	BookClubListResponse,
	BookDetailResponse,
	BookDto,
	BookClubMemberDto,
	MemberBookProgressDto,
	BookRatingDto,
	MeetupDto,
	MeetupDateVoteDto,
	NoteDto,
	CreateBookClubRequest,
	UpdateBookClubRequest,
	InviteMemberRequest,
	AddBookRequest,
	UpdateBookRequest,
	CreateNoteRequest,
	UpdateNoteRequest,
	SetMyProgressRequest,
	SetBookRatingRequest,
	UpdateMeetupRequest,
	SetMeetupDateVoteRequest,
	JoinByInviteRequest,
	BookInfoResponse
} from './types';

const API_BASE = dev ? 'http://localhost:5001' : 'https://api.mariebmo.io';
const BASE = '/api/book-clubs';

async function getToken(): Promise<string | null> {
	return auth.getValidAccessToken();
}

async function request<T>(
	method: string,
	path: string,
	body?: unknown,
	authRequired = true
): Promise<T> {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	};
	if (authRequired) {
		const token = await getToken();
		if (!token) throw new Error('Not authenticated');
		headers['Authorization'] = `Bearer ${token}`;
	}
	const res = await fetch(`${API_BASE}${path}`, {
		method,
		headers,
		...(body !== undefined ? { body: JSON.stringify(body) } : {})
	});
	if (!res.ok) {
		const err = await res.json().catch(() => ({ message: 'Request failed' }));
		throw new Error(err.message ?? `Request failed: ${res.status}`);
	}
	if (res.status === 204) return undefined as T;
	return res.json();
}

export const bookclubApi = {
	async getClubByInviteSlug(slug: string): Promise<BookClubDto> {
		return request<BookClubDto>('GET', `${BASE}/invite/${encodeURIComponent(slug)}`, undefined, false);
	},

	async joinByInvite(req: JoinByInviteRequest): Promise<BookClubMemberDto> {
		return request<BookClubMemberDto>('POST', `${BASE}/join`, req);
	},

	async getMyClubs(): Promise<BookClubListResponse> {
		return request<BookClubListResponse>('GET', BASE);
	},

	async getClubDetail(clubId: string): Promise<BookClubDetailResponse> {
		return request<BookClubDetailResponse>('GET', `${BASE}/${clubId}`);
	},

	async createClub(req: CreateBookClubRequest): Promise<BookClubDto> {
		return request<BookClubDto>('POST', BASE, req);
	},

	async updateClub(clubId: string, req: UpdateBookClubRequest): Promise<BookClubDto> {
		return request<BookClubDto>('PUT', `${BASE}/${clubId}`, req);
	},

	async deleteClub(clubId: string): Promise<void> {
		return request<void>('DELETE', `${BASE}/${clubId}`);
	},

	async inviteMember(clubId: string, req: InviteMemberRequest): Promise<BookClubMemberDto> {
		return request<BookClubMemberDto>('POST', `${BASE}/${clubId}/members`, req);
	},

	async removeMember(clubId: string, memberId: string): Promise<void> {
		return request<void>('DELETE', `${BASE}/${clubId}/members/${memberId}`);
	},

	async getBookDetail(clubId: string, bookId: string): Promise<BookDetailResponse> {
		return request<BookDetailResponse>('GET', `${BASE}/${clubId}/books/${bookId}`);
	},

	async addBook(clubId: string, req: AddBookRequest): Promise<BookDto> {
		return request<BookDto>('POST', `${BASE}/${clubId}/books`, req);
	},

	async updateBook(clubId: string, bookId: string, req: UpdateBookRequest): Promise<BookDto> {
		return request<BookDto>('PUT', `${BASE}/${clubId}/books/${bookId}`, req);
	},

	async deleteBook(clubId: string, bookId: string): Promise<void> {
		return request<void>('DELETE', `${BASE}/${clubId}/books/${bookId}`);
	},

	async setMyProgress(
		clubId: string,
		bookId: string,
		req: SetMyProgressRequest
	): Promise<MemberBookProgressDto> {
		return request<MemberBookProgressDto>('PUT', `${BASE}/${clubId}/books/${bookId}/progress`, req);
	},

	async setBookRating(
		clubId: string,
		bookId: string,
		req: SetBookRatingRequest
	): Promise<BookRatingDto> {
		return request<BookRatingDto>('PUT', `${BASE}/${clubId}/books/${bookId}/rating`, req);
	},

	async updateMeetup(
		clubId: string,
		bookId: string,
		req: UpdateMeetupRequest
	): Promise<MeetupDto> {
		return request<MeetupDto>('PUT', `${BASE}/${clubId}/books/${bookId}/meetup`, req);
	},

	async setMeetupDateVote(
		clubId: string,
		bookId: string,
		req: SetMeetupDateVoteRequest
	): Promise<MeetupDateVoteDto> {
		return request<MeetupDateVoteDto>('PUT', `${BASE}/${clubId}/books/${bookId}/meetup/vote`, req);
	},

	async addDnfVote(clubId: string, bookId: string): Promise<void> {
		return request<void>('POST', `${BASE}/${clubId}/books/${bookId}/dnf`);
	},

	async removeDnfVote(clubId: string, bookId: string): Promise<void> {
		return request<void>('DELETE', `${BASE}/${clubId}/books/${bookId}/dnf`);
	},

	async createNote(
		clubId: string,
		bookId: string,
		req: CreateNoteRequest
	): Promise<NoteDto> {
		return request<NoteDto>('POST', `${BASE}/${clubId}/books/${bookId}/notes`, req);
	},

	async updateNote(
		clubId: string,
		bookId: string,
		noteId: string,
		req: UpdateNoteRequest
	): Promise<NoteDto> {
		return request<NoteDto>('PUT', `${BASE}/${clubId}/books/${bookId}/notes/${noteId}`, req);
	},

	async deleteNote(clubId: string, bookId: string, noteId: string): Promise<void> {
		return request<void>('DELETE', `${BASE}/${clubId}/books/${bookId}/notes/${noteId}`);
	},

	async fetchBookInfo(url: string): Promise<BookInfoResponse> {
		return request<BookInfoResponse>('POST', `${BASE}/fetch-book-info`, { url });
	}
};
