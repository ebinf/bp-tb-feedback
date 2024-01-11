import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const session = await event.locals.auth.validate();
	event.locals.session = session;

	if (event.route.id?.startsWith('/(authenticated)')) {
		if (!session) {
			throw redirect(302, `/login?r=${new URL(event.request.url).pathname}`);
		}

		if (event.route.id?.startsWith('/(authenticated)/admin')) {
			if (!session.user.admin) {
				throw redirect(302, `/`);
			}
		}
	}

	return await resolve(event);
};
