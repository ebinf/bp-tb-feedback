import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		try {
			await auth.invalidateAllUserSessions(session.user.userId);
			await auth.deleteUser(session.user.userId);
			locals.auth.setSession(null);
		} catch (error) {
			return fail(500, {
				message: "Couldn't delete account"
			});
		}
		throw redirect(302, '/auth/login?deleted');
	}
};
