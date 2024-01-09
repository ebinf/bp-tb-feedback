import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';

export const load: PageServerLoad = async ({ params }) => {
	const resetToken = await client.passwordResetTokens.findUnique({
		where: {
			id: params.cuid
		}
	});

	if (resetToken && resetToken.expires < new Date()) {
		await client.passwordResetTokens.delete({
			where: {
				id: resetToken.id
			}
		});
		return {
			resetToken: null
		};
	}

	return {
		resetToken
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const new_password = formData.get('new_password') as string;
		const repeat_password = formData.get('repeat_password') as string;

		if (new_password.length < 10 || new_password.length > 255) {
			return fail(400, {
				message:
					'Das eingegebene Passwort ist ungültig. Es sollte zwischen 10 und 255 Zeichen lang sein.'
			});
		}

		if (new_password !== repeat_password) {
			return fail(400, {
				message: 'Die Passwörter stimmen nicht überein.'
			});
		}

		try {
			const resetToken = await client.passwordResetTokens.findUniqueOrThrow({
				where: {
					id: params.cuid
				},
				include: {
					user: true
				}
			});

			if (resetToken.expires < new Date()) {
				await client.passwordResetTokens.delete({
					where: {
						id: resetToken.id
					}
				});

				return fail(400, {
					message:
						'Dieser Link ist bereits abgelaufen. Falls du dein Passwort noch zurücksetzen möchtest, fordere bitte einen neuen an.'
				});
			}

			try {
				await auth.createKey({
					userId: resetToken.user_id,
					providerId: 'email',
					providerUserId: resetToken.user.email,
					password: new_password
				});
			} catch (e) {
				if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
					await auth.updateKeyPassword('email', resetToken.user.email, new_password);
				} else {
					throw e;
				}
			}

			await client.passwordResetTokens.delete({
				where: {
					id: resetToken.id
				}
			});
		} catch (e) {
			console.log(e);

			if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
				throw error(404, "This password reset link doesn't exist");
			}
			throw error(500, 'An internal error occurred. Please try again later.');
		}

		throw redirect(302, '/login?password_reset');
	}
};
