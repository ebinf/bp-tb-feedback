import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const current_password = formData.get('current_password') as string;
		const new_password = formData.get('new_password') as string;
		const repeat_password = formData.get('repeat_password') as string;

		if (
			current_password.length < 10 ||
			current_password.length > 255 ||
			new_password.length < 10 ||
			new_password.length > 255
		) {
			return fail(400, {
				error:
					'Das eingegebene Passwort ist ungültig. Es sollte zwischen 10 und 255 Zeichen lang sein.'
			});
		}

		if (new_password !== repeat_password) {
			return fail(400, {
				error: 'Die beiden Passwörter stimmen nicht überein.'
			});
		}

		try {
			const session = await locals.auth.validate();
			if (!session) throw redirect(302, '/auth/login');
			await auth.useKey('email', session?.user.email, current_password);
			await auth.updateKeyPassword('email', session?.user.email, new_password);
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					error: 'Das aktuelle Passwort ist falsch.'
				});
			}
			return fail(500, {
				error: 'Es ist ein unbekannter Fehler aufgetreten.'
			});
		}

		return {
			success:
				'Das Passwort wurde erfolgreich geändert. Ab jetzt kannst du dich mit dem neuen Passwort anmelden.'
		};
	}
};
