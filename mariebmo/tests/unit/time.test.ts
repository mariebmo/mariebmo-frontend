import { describe, expect, it } from 'vitest';
import { formatTimestamp, parseTimestamp, clampTimestamp } from '$lib/feast-of-the-rings/time';

describe('parseTimestamp', () => {
	it('parses mm:ss', () => {
		expect(parseTimestamp('5:30')).toBe(330);
		expect(parseTimestamp('05:30')).toBe(330);
	});

	it('parses h:mm:ss', () => {
		expect(parseTimestamp('1:05:30')).toBe(3930);
	});

	it('parses plain seconds', () => {
		expect(parseTimestamp('90')).toBe(90);
	});

	it('returns null for invalid input', () => {
		expect(parseTimestamp('')).toBeNull();
		expect(parseTimestamp('1:65')).toBeNull();
		expect(parseTimestamp('bad')).toBeNull();
		expect(parseTimestamp('1:2:3:4')).toBeNull();
	});
});

describe('formatTimestamp round-trip', () => {
	it('round-trips sub-hour timestamps', () => {
		expect(parseTimestamp(formatTimestamp(330))).toBe(330);
	});

	it('round-trips hour-plus timestamps', () => {
		expect(parseTimestamp(formatTimestamp(3930))).toBe(3930);
	});
});

describe('clampTimestamp', () => {
	it('clamps to runtime bounds', () => {
		expect(clampTimestamp(-10, 100)).toBe(0);
		expect(clampTimestamp(150, 100)).toBe(100);
		expect(clampTimestamp(50, 100)).toBe(50);
	});
});
