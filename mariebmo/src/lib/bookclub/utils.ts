import type { BookDto } from '$lib/bookclub/types';

export function getDueDate(book: BookDto): string | null {
	const meetup = book.meetup?.scheduledAt ?? null;
	const end = book.endDate ?? null;
	if (meetup && end) return new Date(meetup) < new Date(end) ? meetup : end;
	return meetup ?? end;
}
