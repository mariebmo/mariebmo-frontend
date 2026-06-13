export function formatTimestamp(totalSeconds: number): string {
	const seconds = Math.max(0, Math.floor(totalSeconds));
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	if (hours > 0) {
		return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	}

	return `${minutes}:${String(secs).padStart(2, '0')}`;
}

export function parseTimestamp(input: string): number | null {
	const trimmed = input.trim();
	if (!trimmed) return null;

	if (/^\d+$/.test(trimmed)) {
		return Number.parseInt(trimmed, 10);
	}

	const parts = trimmed.split(':');
	if (parts.length < 2 || parts.length > 3) return null;
	if (parts.some((part) => !/^\d+$/.test(part.trim()))) return null;

	const numbers = parts.map((part) => Number.parseInt(part.trim(), 10));

	if (parts.length === 2) {
		const [minutes, seconds] = numbers;
		if (seconds >= 60) return null;
		return minutes * 60 + seconds;
	}

	const [hours, minutes, seconds] = numbers;
	if (minutes >= 60 || seconds >= 60) return null;
	return hours * 3600 + minutes * 60 + seconds;
}

export function clampTimestamp(seconds: number, maxSeconds: number): number {
	return Math.min(maxSeconds, Math.max(0, seconds));
}

export function formatCountdown(totalSeconds: number): string {
	return formatTimestamp(Math.max(0, totalSeconds));
}
