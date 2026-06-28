import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';
import type {
	AuthResponse,
	LoginRequest,
	RegisterRequest,
	RefreshTokenRequest,
	User,
	ErrorResponse
} from './types';

const API_BASE_URL = env.PUBLIC_MARIEBMO_LOGIN_API_URL ?? (dev ? 'http://localhost:5001' : '');

interface ApiError {
	message: string;
	code: string | null;
}

async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const error: ErrorResponse = await response.json().catch(() => ({
			message: 'An unexpected error occurred',
			code: 'UNKNOWN_ERROR'
		}));
		throw new Error(error.message);
	}
	return response.json();
}

export async function login(request: LoginRequest): Promise<AuthResponse> {
	const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(request)
	});

	return handleResponse<AuthResponse>(response);
}

export async function register(request: RegisterRequest): Promise<AuthResponse> {
	const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(request)
	});

	return handleResponse<AuthResponse>(response);
}

export async function refreshToken(request: RefreshTokenRequest): Promise<AuthResponse> {
	const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(request)
	});

	return handleResponse<AuthResponse>(response);
}

export async function logout(refreshTokenValue: string, accessToken: string): Promise<void> {
	await fetch(`${API_BASE_URL}/api/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({ refreshToken: refreshTokenValue })
	});
}

export async function getCurrentUser(accessToken: string): Promise<User> {
	const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return handleResponse<User>(response);
}
