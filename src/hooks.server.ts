import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	if (event.route.id?.startsWith('/(authenticated)')) {
		const session = await event.locals.auth.validate();
		if (!session) {
			throw redirect(302, `/login?r=${new URL(event.request.url).pathname}`);
		}
		event.locals.session = session;
	}

	return await resolve(event);
};
