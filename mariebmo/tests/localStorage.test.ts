import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
	getUserPreferences,
	saveUserPreferences,
	getSavedActiveTab,
	saveActiveTab,
	clearUserPreferences,
	isValidTabId
} from '../src/lib/utils/localStorage';

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};

	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value;
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		}
	};
})();

// Mock window.localStorage
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});

describe('localStorage utilities', () => {
	beforeEach(() => {
		localStorageMock.clear();
	});

	describe('getUserPreferences', () => {
		it('should return default preferences when localStorage is empty', () => {
			const preferences = getUserPreferences();
			expect(preferences).toEqual({ activeTabId: 'visual' });
		});

		it('should return saved preferences when they exist', () => {
			localStorageMock.setItem(
				'knitting-calculator-preferences',
				JSON.stringify({ activeTabId: 'checklist' })
			);

			const preferences = getUserPreferences();
			expect(preferences.activeTabId).toBe('checklist');
		});
	});

	describe('saveUserPreferences', () => {
		it('should save preferences to localStorage', () => {
			const result = saveUserPreferences({ activeTabId: 'shorthand' });
			expect(result).toBe(true);

			const saved = getUserPreferences();
			expect(saved.activeTabId).toBe('shorthand');
		});

		it('should merge with existing preferences', () => {
			// Save initial preferences
			saveUserPreferences({ activeTabId: 'visual' });

			// Update with partial preferences
			saveUserPreferences({ activeTabId: 'written' });

			const saved = getUserPreferences();
			expect(saved.activeTabId).toBe('written');
		});
	});

	describe('getSavedActiveTab', () => {
		it('should return default tab when no preferences exist', () => {
			const activeTab = getSavedActiveTab();
			expect(activeTab).toBe('visual');
		});

		it('should return saved active tab', () => {
			saveActiveTab('checklist');
			const activeTab = getSavedActiveTab();
			expect(activeTab).toBe('checklist');
		});
	});

	describe('saveActiveTab', () => {
		it('should save active tab ID', () => {
			const result = saveActiveTab('shorthand');
			expect(result).toBe(true);

			const saved = getSavedActiveTab();
			expect(saved).toBe('shorthand');
		});
	});

	describe('clearUserPreferences', () => {
		it('should clear all preferences', () => {
			saveActiveTab('checklist');
			expect(getSavedActiveTab()).toBe('checklist');

			const result = clearUserPreferences();
			expect(result).toBe(true);

			const preferences = getUserPreferences();
			expect(preferences.activeTabId).toBe('visual'); // Should return default
		});
	});

	describe('isValidTabId', () => {
		const validTabs = ['visual', 'shorthand', 'written', 'checklist'];

		it('should return true for valid tab IDs', () => {
			expect(isValidTabId('visual', validTabs)).toBe(true);
			expect(isValidTabId('checklist', validTabs)).toBe(true);
		});

		it('should return false for invalid tab IDs', () => {
			expect(isValidTabId('invalid', validTabs)).toBe(false);
			expect(isValidTabId('', validTabs)).toBe(false);
		});
	});

	describe('error handling', () => {
		it('should handle JSON parse errors gracefully', () => {
			localStorageMock.setItem('knitting-calculator-preferences', 'invalid-json');

			const preferences = getUserPreferences();
			expect(preferences).toEqual({ activeTabId: 'visual' });
		});

		it('should handle localStorage setItem failures', () => {
			// Mock localStorage.setItem to throw an error
			const originalSetItem = localStorageMock.setItem;
			localStorageMock.setItem = vi.fn(() => {
				throw new Error('Storage full');
			});

			const result = saveActiveTab('visual');
			expect(result).toBe(false);

			// Restore original method
			localStorageMock.setItem = originalSetItem;
		});
	});
});
