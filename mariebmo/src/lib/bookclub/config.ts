import { env } from '$env/dynamic/public';

/**
 * Base path for the bookclub app. Use this for all internal links so the app
 * can be served either under a path (/bookclub) or at its own origin (subdomain).
 *
 * - Path (default): leave unset or set PUBLIC_BOOKCLUB_BASE_PATH=/bookclub
 * - Subdomain/standalone: set PUBLIC_BOOKCLUB_BASE_PATH= in .env
 */
export const BOOKCLUB_BASE_PATH: string = env.PUBLIC_BOOKCLUB_BASE_PATH ?? '/bookclub';
