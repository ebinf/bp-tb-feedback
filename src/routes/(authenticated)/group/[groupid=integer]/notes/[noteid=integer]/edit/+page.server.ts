import { client } from '$lib/server/database';
import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { SSEEvents } from '$lib/server/eventstore';

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const note = formData.get('note') as string;
		const groupId = Number(params.groupid as string);
		const noteId = Number(params.noteid as string);

		if (!locals.session) throw error(401);

		if (!title || title.trim().length < 2 || title.trim().length > 255) {
			return {
				error: 'Der Titel ist ungültig. Er sollte zwischen 5 und 255 Zeichen lang sein.'
			};
		}

		if (!note || note.trim().length < 5) {
			return {
				error: 'Die Notiz ist zu kurz.'
			};
		}

		try {
			await client.note.update({
				data: {
					title: title.trim(),
					note: note.trim(),
					edited: new Date()
				},
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

		throw redirect(302, `/group/${groupId}/notes/${noteId}?edited`);
	}
};
