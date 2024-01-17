import { client } from '$lib/server/database';
import { SSEEvents } from '$lib/server/eventstore';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ params, request }) => {
		const formData = await request.formData();
		const question = formData.get('question') as string;
		const state = formData.get('state') as string;
		const autoClose = formData.get('autoclose') as string;
		const groupId = Number(params.groupid as string);

		if (
			!params.groupid ||
			!question ||
			!state ||
			!['open', 'closed'].includes(state) ||
			!['on', null].includes(autoClose)
		) {
			console.log(params.groupid, params.pollid);
			return fail(400, {
				error: 'Ungültige Anfrage'
			});
		}

		if (question.trim().length < 5) {
			return fail(400, {
				error: 'Die Fragestellung ist zu kurz.'
			});
		}

		if (question.trim().length > 255) {
			return fail(400, {
				error: 'Die Fragestellung ist zu lang.'
			});
		}

		let id = 0;
		try {
			const group = await client.group.findUniqueOrThrow({
				where: {
					id: groupId
				},
				include: {
					term: {
						select: {
							active: true
						}
					}
				}
			});

			if (!group.term.active) {
				return fail(400, {
					error:
						'Das Semester ist nicht aktiv. Du kannst keine neuen Stimmungsbilder mehr erstellen.'
				});
			}

			const info = await client.pollRound.create({
				data: {
					group_id: groupId,
					open: state == 'open',
					question: question.trim(),
					autoClose: autoClose == 'on'
				}
			});
			id = info.id;
			SSEEvents.registerNewEvent(`pollRound:${id}`, `group:${groupId}`);
			SSEEvents.emit(`group:${groupId}`);
			SSEEvents.emit(`pollRound:${id}`);
		} catch (e) {
			return fail(500, {
				error: 'Interner Serverfehler'
			});
		}

		throw redirect(302, `/group/${groupId}/polls/${id}?created`);
	}
};
