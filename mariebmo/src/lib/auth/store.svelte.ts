import { browser } from '$app/environment';
import type { User, AuthResponse, LoginRequest, RegisterRequest } from './types';
import * as authApi from './api';

const AUTH_STORAGE_KEY = 'auth_tokens';

interface AuthTokens {
	accessToken: string;
	refreshToken: string;
	expiresAt: string;
}

function getStoredTokens(): AuthTokens | null {
	if (!browser) return null;

	try {
		const stored = localStorage.getItem(AUTH_STORAGE_KEY);
		if (!stored) return null;
		return JSON.parse(stored);
	} catch {
		return null;
	}
}

function storeTokens(tokens: AuthTokens): void {
	if (!browser) return;

	try {
		localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
	} catch (error) {
		console.warn('Failed to store auth tokens:', error);
	}
}

function clearStoredTokens(): void {
	if (!browser) return;

	try {
		localStorage.removeItem(AUTH_STORAGE_KEY);
	} catch (error) {
		console.warn('Failed to clear auth tokens:', error);
	}
}

function isTokenExpired(expiresAt: string): boolean {
	const expirationDate = new Date(expiresAt);
	const now = new Date();
	// Add a 30-second buffer to account for network latency
	return expirationDate.getTime() - 30000 < now.getTime();
}

function createAuthStore() {
	let user = $state<User | null>(null);
	let accessToken = $state<string | null>(null);
	let refreshToken = $state<string | null>(null);
	let expiresAt = $state<string | null>(null);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	const isAuthenticated = $derived(!!user && !!accessToken);
	const isTokenValid = $derived(expiresAt ? !isTokenExpired(expiresAt) : false);

	function setAuthState(response: AuthResponse) {
		user = response.user;
		accessToken = response.accessToken;
		refreshToken = response.refreshToken;
		expiresAt = response.expiresAt;
		error = null;

		storeTokens({
			accessToken: response.accessToken,
			refreshToken: response.refreshToken,
			expiresAt: response.expiresAt
		});
	}

	function clearAuthState() {
		user = null;
		accessToken = null;
		refreshToken = null;
		expiresAt = null;
		clearStoredTokens();
	}

	async function initialize() {
		isLoading = true;
		error = null;

		const storedTokens = getStoredTokens();

		if (!storedTokens) {
			isLoading = false;
			return;
		}

		// Check if token is expired
		if (isTokenExpired(storedTokens.expiresAt)) {
			// Try to refresh
			try {
				const response = await authApi.refreshToken({
					refreshToken: storedTokens.refreshToken
				});
				setAuthState(response);
			} catch {
				// Refresh failed, clear everything
				clearAuthState();
			}
		} else {
			// Token is still valid, load user
			accessToken = storedTokens.accessToken;
			refreshToken = storedTokens.refreshToken;
			expiresAt = storedTokens.expiresAt;

			try {
				user = await authApi.getCurrentUser(storedTokens.accessToken);
			} catch {
				// Failed to get user, try refresh
				try {
					const response = await authApi.refreshToken({
						refreshToken: storedTokens.refreshToken
					});
					setAuthState(response);
				} catch {
					clearAuthState();
				}
			}
		}

		isLoading = false;
	}

	async function login(request: LoginRequest) {
		isLoading = true;
		error = null;

		try {
			const response = await authApi.login(request);
			setAuthState(response);
			return true;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Login failed';
			return false;
		} finally {
			isLoading = false;
		}
	}

	async function register(request: RegisterRequest) {
		isLoading = true;
		error = null;

		try {
			const response = await authApi.register(request);
			setAuthState(response);
			return true;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Registration failed';
			return false;
		} finally {
			isLoading = false;
		}
	}

	async function logout() {
		if (accessToken && refreshToken) {
			try {
				await authApi.logout(refreshToken, accessToken);
			} catch {
				// Logout might fail, but we still want to clear local state
			}
		}
		clearAuthState();
	}

	async function refreshAccessToken() {
		if (!refreshToken) return false;

		try {
			const response = await authApi.refreshToken({ refreshToken });
			setAuthState(response);
			return true;
		} catch {
			clearAuthState();
			return false;
		}
	}

	async function getValidAccessToken(): Promise<string | null> {
		if (!accessToken || !expiresAt) return null;

		if (isTokenExpired(expiresAt)) {
			const success = await refreshAccessToken();
			if (!success) return null;
		}

		return accessToken;
	}

	return {
		get user() {
			return user;
		},
		get accessToken() {
			return accessToken;
		},
		get isAuthenticated() {
			return isAuthenticated;
		},
		get isLoading() {
			return isLoading;
		},
		get error() {
			return error;
		},
		get isTokenValid() {
			return isTokenValid;
		},
		initialize,
		login,
		register,
		logout,
		refreshAccessToken,
		getValidAccessToken,
		clearError: () => {
			error = null;
		}
	};
}

export const auth = createAuthStore();
