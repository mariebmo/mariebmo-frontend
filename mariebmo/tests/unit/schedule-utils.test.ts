import { describe, it, expect } from 'vitest';
import { discTimeToTimestamp, parseDiscTime } from '../../src/lib/feast-of-the-rings/schedule-utils';

describe('parseDiscTime', () => {
	it('parses H:MM from disc schedule', () => {
		expect(parseDiscTime('0:10')).toBe(600);
		expect(parseDiscTime('1:11')).toBe(4260);
	});

	it('parses H:MM:SS', () => {
		expect(parseDiscTime('1:02:00')).toBe(3720);
	});
});

describe('discTimeToTimestamp', () => {
	it('maps Fellowship Weathertop disc time to narration timestamp', () => {
		const ts = discTimeToTimestamp('fellowship', 'extended', 1, parseDiscTime('1:11'));
		expect(ts).toBe(3605);
	});

	it('maps Fellowship disc 2 lembas across disc break', () => {
		const ts = discTimeToTimestamp('fellowship', 'extended', 2, parseDiscTime('1:02'));
		expect(ts).toBe(10255);
	});

	it('clamps pre-narration scenes to zero', () => {
		const ts = discTimeToTimestamp('fellowship', 'extended', 1, parseDiscTime('0:10'));
		expect(ts).toBe(0);
	});
});
