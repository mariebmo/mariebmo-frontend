import type { Handle } from '@sveltejs/kit';

/**
 * When the request host matches the bookclub subdomain, rewrite the URL path
 * so the app serves the /bookclub routes. This allows the same deploy to serve
 * bookclub at e.g. bookclub.mariemo.io without a separate app.
 *
 * Set BOOKCLUB_SUBDOMAIN_HOST in env (e.g. "bookclub.mariemo.io") to enable.
 * For local testing: add "127.0.0.1 bookclub.localhost" to hosts and use
 * BOOKCLUB_SUBDOMAIN_HOST=bookclub.localhost
 */
export const handle: Handle = async ({ event, resolve }) => {
	const subdomainHost = process.env.BOOKCLUB_SUBDOMAIN_HOST;
	if (!subdomainHost) {
		return resolve(event);
	}

	const host = event.url.hostname;
	if (host !== subdomainHost) {
		return resolve(event);
	}

	const pathname = event.url.pathname;
	const newPathname = pathname === '/' ? '/bookclub' : `/bookclub${pathname}`;
	const newUrl = new URL(event.request.url);
	newUrl.pathname = newPathname;

	const newRequest = new Request(newUrl.toString(), {
		...event.request,
		headers: event.request.headers
	});

	return resolve({
		...event,
		request: newRequest,
		url: newUrl
	});
};
