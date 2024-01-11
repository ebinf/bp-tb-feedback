import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { error, fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { SSEEvents } from '$lib/server/eventstore';

export const load: PageServerLoad = async ({ locals, depends }) => {
	if (!locals.session) throw error(401);
	depends(`user:${locals.session.user.userId}`);
	const split_name = locals.session.user.full_name.split(' ', 2);
	return {
		first_name: split_name[0],
		last_name: split_name[1],
		email: locals.session.user.email,
		sessions: (await auth.getAllUserSessions(locals.session.user.userId)).length
	};
};

export const actions: Actions = {
	change_password: async ({ request, locals }) => {
		if (!locals.session) throw error(401);

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
			await auth.useKey('email', locals.session.user.email, current_password);
			await auth.updateKeyPassword('email', locals.session.user.email, new_password);
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

		SSEEvents.emit(`user:${locals.session.user_id}`);

		return {
			success:
				'Das Passwort wurde erfolgreich geändert. Ab jetzt kannst du dich mit dem neuen Passwort anmelden.'
		};
	},

	delete_account: async ({ request, locals }) => {
		if (!locals.session) throw error(401);

		const formData = await request.formData();
		const password = formData.get('delete_password') as string;

		if (password.length < 10 || password.length > 255) {
			return fail(400, {
				error:
					'Das eingegebene Passwort ist ungültig. Es sollte zwischen 10 und 255 Zeichen lang sein.'
			});
		}

		try {
			await auth.useKey('email', locals.session.user.email, password);
			await auth.invalidateAllUserSessions(locals.session.user.userId);
			await auth.deleteUser(locals.session.user.userId);
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					error: 'Das eingegebene Passwort ist falsch.'
				});
			}
			return fail(500, {
				error: 'Es ist ein unbekannter Fehler aufgetreten.'
			});
		}

		SSEEvents.emit(`user:${locals.session.user_id}`);
		SSEEvents.emit('admin:users');

		throw redirect(302, '/login?deleted');
	}
};
