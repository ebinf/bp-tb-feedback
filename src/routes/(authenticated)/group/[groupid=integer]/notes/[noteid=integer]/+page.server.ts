import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { SSEEvents } from '$lib/server/eventstore';
import { client } from '$lib/server/database';

export const actions: Actions = {
	delete: async ({ params, locals }) => {
		const groupId = Number(params.groupid as string);
		const noteId = Number(params.noteid as string);

		if (!locals.session) throw error(401);

		try {
			await client.note.delete({
				where: {
					id: noteId,
					group_id: groupId,
					author_id: locals.session.user.userId
				}
			});

			SSEEvents.emit(`note:${noteId}`);
		} catch (e) {
			return {
				error: 'Interner Serverfehler'
			};
		}

		throw redirect(302, `/group/${groupId}/notes?deleted`);
	}
};
