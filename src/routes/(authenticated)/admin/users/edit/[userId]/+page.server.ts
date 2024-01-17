import type { Actions, PageServerLoad } from './$types';
import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { error, fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { SSEEvents } from '$lib/server/eventstore';
import { sendMailFromTemplate } from '$lib/server/email';
import Welcome from '$lib/email_templates/welcome.server.svelte';
import { PUBLIC_BASE_URL, PUBLIC_SITE_NAME } from '$env/static/public';
import { generateRandomString } from 'lucia/utils';

export const load: PageServerLoad = async ({ locals, params, depends }) => {
	if (!locals.session) throw error(401);
	const userId = params.userId;

	try {
		const user = await client.user.findUniqueOrThrow({
			where: {
				id: userId
			}
		});

		const terms_groups = await client.term.findMany({
			include: {
				groups: {
					where: {
						lead_id: userId
					},
					orderBy: {
						number: 'asc'
					}
				}
			},
			where: {
				groups: {
					some: {
						lead_id: userId
					}
				}
			}
		});

		depends('admin:users');
		depends(`user:${userId}`);

		const keys = await auth.getAllUserKeys(userId);

		return {
			user: user,
			terms_groups: terms_groups,
			self: userId === locals.session.user.userId,
			password_set: keys.some((key) => key.passwordDefined),
			sessions: (await auth.getAllUserSessions(userId)).length
		};
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
			throw error(404, 'Nutzer:in nicht gefunden');
		}
		throw error(500, 'Internal Server Error');
	}
};

export const actions: Actions = {
	edit: async ({ request, params, locals }) => {
		const formData = await request.formData();
		const full_name = formData.get('full_name') as string;
		const email = formData.get('email') as string;
		const admin = formData.get('admin') as string;
		const userId = params.userId as string;

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

		if (admin != 'on' && userId == locals.session?.user.userId) {
			return fail(400, {
				error: 'Du kannst dir selbst keine Rechte entziehen.'
			});
		}

		try {
			await client.key.updateMany({
				where: {
					user_id: userId,
					id: {
						startsWith: 'email:'
					}
				},
				data: {
					id: `email:${email.toLowerCase()}`
				}
			});

			await auth.updateUserAttributes(userId, {
				full_name: full_name.trim(),
				email: email.toLowerCase(),
				admin: admin == 'on'
			});
		} catch (e) {
			console.log(e);
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
		SSEEvents.emit(`user:${userId}`);

		throw redirect(302, '/admin/users?edited');
	},

	resend_welcome_mail: async ({ params }) => {
		const userId = params.userId as string;

		try {
			const user = await client.user.findUniqueOrThrow({
				where: {
					id: userId
				}
			});

			const resetToken = generateRandomString(63);

			await client.passwordResetTokens.create({
				data: {
					user_id: user.id,
					id: resetToken,
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours
				}
			});

			await sendMailFromTemplate(user, `Willkommen bei ${PUBLIC_SITE_NAME}`, Welcome, {
				link: `${PUBLIC_BASE_URL}/password_reset/${resetToken}`,
				name: user.full_name
			});
		} catch (e) {
			console.log(e);
			return fail(500, {
				error: 'Es ist ein unbekannter Fehler aufgetreten.'
			});
		}

		throw redirect(302, '/admin/users?welcome_mail_sent');
	},

	delete: async ({ params, locals }) => {
		const userId = params.userId as string;

		if (userId == locals.session?.user.userId) {
			return fail(400, {
				error: 'Du kannst dein eigenes Konto nicht löschen.'
			});
		}

		try {
			const groups = await client.group.findMany({
				where: {
					lead_id: userId
				}
			});

			await client.user.delete({
				where: {
					id: userId
				}
			});

			SSEEvents.emit(`user:${userId}`);
			SSEEvents.emit('admin:users');

			if (groups.length > 0) {
				groups.forEach((group) => {
					SSEEvents.emit(`group:${group.id}`);
				});
				SSEEvents.emit('admin:groups');
			}
		} catch (e) {
			return fail(500, {
				error: 'Es ist ein unbekannter Fehler aufgetreten.'
			});
		}

		throw redirect(302, '/admin/users?deleted');
	}
};
