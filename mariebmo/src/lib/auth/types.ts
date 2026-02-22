export interface User {
	id: string;
	email: string;
	displayName: string | null;
	isEmailVerified: boolean;
	createdAt: string;
}

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	expiresAt: string;
	user: User;
}

export interface LoginRequest {
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface RegisterRequest {
	email: string;
	password: string;
	displayName?: string;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

export interface ErrorResponse {
	message: string;
	code: string | null;
}
