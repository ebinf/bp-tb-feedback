import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { generateRandomString } from 'lucia/utils';
import { fail, redirect } from '@sveltejs/kit';
import { sendMailFromTemplate } from '$lib/server/email';
import ResetPassword from '$lib/email_templates/reset_password.server.svelte';

import type { Actions, PageServerLoad } from './$types';
import { client } from '$lib/server/database';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) throw redirect(302, `/dashboard`);
	return {};
};

export const actions: Actions = {
	login: async ({ request, locals, url }) => {
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
	},

	reset_password: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('password_reset_email') as string;

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, {
				message: 'Die eingegebene E-Mail-Adresse ist ungültig.'
			});
		}

		try {
			const user = await client.user.findUnique({
				where: {
					email: email.toLowerCase()
				}
			});

			if (!user)
				return {
					success:
						'Falls die angegebene E-Mail-Adresse einem Account zugehörig ist, erhältst du in wenigen Augenblicken eine E-Mail mit weiteren Anweisungen zum zurücksetzen deines Passworts. Überprüfe bitte auch deinen SPAM-Ordner.'
				};

			const resetToken = generateRandomString(63);

			await client.passwordResetTokens.create({
				data: {
					user_id: user.id,
					id: resetToken,
					expires: new Date(Date.now() + 1000 * 60 * 60) // 1 hour
				}
			});

			sendMailFromTemplate(user, `Passwort zurücksetzen`, ResetPassword, {
				name: user.full_name,
				link: `${PUBLIC_BASE_URL}/password_reset/${resetToken}`
			});
		} catch (e) {
			return fail(500, {
				message: 'Ein unbekannter Fehler ist aufgetreten.'
			});
		}

		return {
			success:
				'Falls die angegebene E-Mail-Adresse einem Account zugehörig ist, erhältst du in wenigen Augenblicken eine E-Mail mit weiteren Anweisungen zum zurücksetzen deines Passworts. Überprüfe bitte auch deinen SPAM-Ordner.'
		};
	}
};
