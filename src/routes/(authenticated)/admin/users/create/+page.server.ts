import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { auth } from '$lib/server/lucia';
import { generateRandomString } from 'lucia/utils';
import { client } from '$lib/server/database';
import { sendMailFromTemplate } from '$lib/server/email';
import { PUBLIC_BASE_URL, PUBLIC_SITE_NAME } from '$env/static/public';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SSEEvents } from '$lib/server/eventstore';
import Welcome from '$lib/email_templates/welcome.server.svelte';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const full_name = formData.get('full_name') as string;
		const email = formData.get('email') as string;
		const admin = formData.get('admin') as string;
		const send_welcome_mail = formData.get('send_welcome_mail') as string;

		if (full_name.trim().length < 5 || full_name.trim().length > 255) {
			return fail(400, {
				error: 'Das eingegebene Name ist ungültig. Er sollte zwischen 5 und 255 Zeichen lang sein.'
			});
		}

		if (email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, {
				error: 'Die eingegebene E-Mail-Adresse ist ungültig.'
			});
		}

		try {
			const newUser = await auth.createUser({
				key: { providerId: 'email', providerUserId: email.toLowerCase(), password: null },
				attributes: {
					full_name: full_name.trim(),
					email: email.toLowerCase(),
					admin: admin == 'on'
				}
			});

			if (send_welcome_mail == 'on') {
				const resetToken = generateRandomString(63);

				await client.passwordResetTokens.create({
					data: {
						user_id: newUser.userId,
						id: resetToken,
						expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours
					}
				});

				await sendMailFromTemplate(newUser, `Willkommen bei ${PUBLIC_SITE_NAME}`, Welcome, {
					link: `${PUBLIC_BASE_URL}/password_reset/${resetToken}`,
					name: full_name.trim()
				});
			}
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
				return fail(400, {
					error: 'Es existiert bereits ein Account mit dieser E-Mail-Adresse.'
				});
			}

			return fail(500, {
				error: 'Es ist ein unbekannter Fehler aufgetreten.'
			});
		}

		SSEEvents.emit('admin:users');

		throw redirect(302, '/admin/users?created');
	}
};
