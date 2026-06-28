import { dev } from '$app/environment';
import { PUBLIC_MARIEBMO_LOGIN_API_URL } from '$env/static/public';

const LOCAL_API_URL = 'http://localhost:5001';

function resolveApiBaseUrl(): string {
	const configuredUrl = PUBLIC_MARIEBMO_LOGIN_API_URL?.trim();

	if (configuredUrl) {
		return configuredUrl.replace(/\/$/, '');
	}

	if (dev) {
		return LOCAL_API_URL;
	}

	throw new Error(
		'PUBLIC_MARIEBMO_LOGIN_API_URL is not set. Add it in Vercel → Environment Variables (Preview + Production) and redeploy.'
	);
}

export const API_BASE_URL = resolveApiBaseUrl();
