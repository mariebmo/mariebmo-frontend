/**
 * Safe localStorage utilities with error handling
 * Handles cases where localStorage is not available (incognito mode, server-side rendering, etc.)
 */

export interface UserPreferences {
	activeTabId?: string;
	// Add more preferences here as needed
}

const STORAGE_KEY = 'knitting-calculator-preferences';
const DEFAULT_PREFERENCES: UserPreferences = {
	activeTabId: 'visual'
};

/**
 * Checks if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
	try {
		if (typeof window === 'undefined') return false;

		const test = '__localStorage_test__';
		window.localStorage.setItem(test, test);
		window.localStorage.removeItem(test);
		return true;
	} catch {
		return false;
	}
}

/**
 * Safely gets a value from localStorage
 */
function getFromStorage<T>(key: string, defaultValue: T): T {
	if (!isLocalStorageAvailable()) {
		return defaultValue;
	}

	try {
		const item = window.localStorage.getItem(key);
		if (item === null) {
			return defaultValue;
		}
		return JSON.parse(item);
	} catch (error) {
		console.warn(`Failed to parse localStorage item "${key}":`, error);
		return defaultValue;
	}
}

/**
 * Safely sets a value in localStorage
 */
function setInStorage<T>(key: string, value: T): boolean {
	if (!isLocalStorageAvailable()) {
		return false;
	}

	try {
		window.localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch (error) {
		console.warn(`Failed to save to localStorage "${key}":`, error);
		return false;
	}
}

/**
 * Gets user preferences from localStorage
 */
export function getUserPreferences(): UserPreferences {
	return getFromStorage(STORAGE_KEY, DEFAULT_PREFERENCES);
}

/**
 * Saves user preferences to localStorage
 */
export function saveUserPreferences(preferences: Partial<UserPreferences>): boolean {
	const currentPreferences = getUserPreferences();
	const updatedPreferences = { ...currentPreferences, ...preferences };
	return setInStorage(STORAGE_KEY, updatedPreferences);
}

/**
 * Gets the saved active tab ID
 */
export function getSavedActiveTab(): string {
	const preferences = getUserPreferences();
	return preferences.activeTabId || DEFAULT_PREFERENCES.activeTabId!;
}

/**
 * Saves the active tab ID
 */
export function saveActiveTab(tabId: string): boolean {
	return saveUserPreferences({ activeTabId: tabId });
}

/**
 * Clears all saved preferences
 */
export function clearUserPreferences(): boolean {
	if (!isLocalStorageAvailable()) {
		return false;
	}

	try {
		window.localStorage.removeItem(STORAGE_KEY);
		return true;
	} catch (error) {
		console.warn('Failed to clear user preferences:', error);
		return false;
	}
}

/**
 * Validates if a tab ID is valid
 */
export function isValidTabId(tabId: string, validTabIds: string[]): boolean {
	return validTabIds.includes(tabId);
}
