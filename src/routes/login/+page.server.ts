import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) throw redirect(302, `/dashboard`);
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const redirectTo = url.searchParams.get('r');

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, {
				message: 'Die eingegebene E-Mail-Adresse ist ungültig.'
			});
		}
		if (password.length < 1 || password.length > 255) {
			return fail(400, {
				message: 'Das eingegebene Passwort ist ungültig.'
			});
		}

		try {
			const key = await auth.useKey('email', email.toLowerCase(), password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				// user does not exist
				// or invalid password
				return fail(400, {
					message: 'Anmeldename oder Passwort sind falsch oder das Konto existiert nicht.'
				});
			}
			return fail(500, {
				message: 'Ein unbekannter Fehler ist aufgetreten.'
			});
		}

		if (redirectTo && redirectTo.startsWith('/')) {
			throw redirect(302, redirectTo);
		} else {
			throw redirect(302, '/dashboard');
		}
	}
};
