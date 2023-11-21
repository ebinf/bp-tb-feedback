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
				error: 'Invalid password'
			});
		}

		if (new_password !== repeat_password) {
			return fail(400, {
				error: 'Passwords do not match'
			});
		}

		try {
			const session = await locals.auth.validate();
			if (!session) throw redirect(302, '/auth/login');
			const key = await auth.useKey('username', session?.user.username, current_password);
			await auth.updateKeyPassword('username', session?.user.username, new_password);
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					error: 'Incorrect password'
				});
			}
			return fail(500, {
				error: 'An unknown error occurred'
			});
		}

		return {
			success: 'Password changed successfully. You can now log in with your new password.'
		};
	}
};
