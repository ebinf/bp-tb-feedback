import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	logout: async ({ locals }) => {
		if (!locals.session) return fail(401);
		await auth.invalidateSession(locals.session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, '/login?loggedout');
	},

	logout_everywhere: async ({ locals }) => {
		if (!locals.session) return fail(401);
		await auth.invalidateAllUserSessions(locals.session.user.userId);
		locals.auth.setSession(null);
		throw redirect(302, '/login?loggedout');
	}
};
