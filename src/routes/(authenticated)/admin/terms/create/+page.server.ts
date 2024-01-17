import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { client } from '$lib/server/database';
import { SSEEvents } from '$lib/server/eventstore';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const active = formData.get('active') as string;

		if (name.trim().length < 2 || name.trim().length > 255) {
			return fail(400, {
				error: 'Das eingegebene Name ist ungültig. Er sollte zwischen 2 und 255 Zeichen lang sein.'
			});
		}

		try {
			await client.term.create({
				data: {
					name: name.trim(),
					active: active == 'on'
				}
			});
		} catch (e) {
			return fail(500, {
				error: 'Es ist ein unbekannter Fehler aufgetreten.'
			});
		}

		SSEEvents.emit('admin:terms');

		throw redirect(302, '/admin/terms?created');
	}
};
