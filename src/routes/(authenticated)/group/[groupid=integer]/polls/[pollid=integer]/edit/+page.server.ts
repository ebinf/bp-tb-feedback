import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { fail, redirect } from '@sveltejs/kit';
import { SSEEvents } from '$lib/server/eventstore';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ params, request }) => {
		const formData = await request.formData();
		const question = formData.get('question') as string;
		const state = formData.get('state') as string;
		const autoClose = formData.get('autoclose') as string;

		if (
			!params.groupid ||
			!params.pollid ||
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

		const groupid = parseInt(params.groupid);
		const pollid = parseInt(params.pollid);

		try {
			await client.pollRound.update({
				where: {
					id: pollid,
					group: {
						id: groupid,
						term: {
							active: true
						}
					}
				},
				data: {
					open: state == 'open',
					question: question.trim(),
					autoClose: autoClose == 'on'
				}
			});

			SSEEvents.emit(`pollRound:${pollid}`);
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
				return fail(404, {
					error: 'Stimmungsbild nicht gefunden'
				});
			return fail(500, {
				error: 'Interner Serverfehler'
			});
		}

		throw redirect(302, `/group/${groupid}/polls/${pollid}?edited`);
	}
};
