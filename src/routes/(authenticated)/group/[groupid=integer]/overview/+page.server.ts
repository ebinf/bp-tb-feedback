import { client } from '$lib/server/database';
import { error, type Actions, fail } from '@sveltejs/kit';
import cuid from 'cuid';

export const actions: Actions = {
	regenerate_feedback_link: async ({ locals, params }) => {
		if (!locals.session) throw error(401);
		if (!params.groupid) throw error(400);
		try {
			await client.group.update({
				where: {
					id: parseInt(params.groupid),
					lead_id: locals.session.user.userId
				},
				data: {
					feedback_link: cuid()
				}
			});
			return {
				success: 'Der Link wurde erfolgreich neu generiert.'
			};
		} catch (e) {
			return fail(500, {
				fail: 'Es ist ein Fehler aufgetreten'
			});
		}
	}
};
