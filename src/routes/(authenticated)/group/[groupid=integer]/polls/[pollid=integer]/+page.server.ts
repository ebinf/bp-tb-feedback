import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { PageServerLoad } from './$types';
import { error, type Actions, fail } from '@sveltejs/kit';
import { SSEEvents } from '$lib/server/eventstore';

export const load: PageServerLoad = async ({ params, depends }) => {
	const groupid = parseInt(params.groupid);
	const pollid = parseInt(params.pollid);

	depends(`pollRound:${pollid}`);

	try {
		const poll = await client.pollRound.findUniqueOrThrow({
			where: {
				id: pollid,
				group_id: groupid
			},
			include: {
				votes: true
			}
		});
		return {
			poll_details: poll
		};
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
			throw error(404, 'Stimmungsbild nicht gefunden');
		throw error(500, 'Interner Serverfehler');
	}
};

export const actions: Actions = {
	close: async ({ params }) => {
		if (!params.groupid || !params.pollid) {
			return fail(400, {
				error: 'Ungültige Anfrage'
			});
		}

		const groupid = parseInt(params.groupid);
		const pollid = parseInt(params.pollid);

		try {
			await client.pollRound.update({
				where: {
					id: pollid,
					group_id: groupid
				},
				data: {
					open: false
				}
			});
			SSEEvents.emit(`pollRound:${pollid}`);
			return {
				success: 'Das Stimmungsbild wurde erfolgreich geschlossen.'
			};
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
				return fail(404, {
					error: 'Stimmungsbild nicht gefunden'
				});
			return fail(500, {
				error: 'Interner Serverfehler'
			});
		}
	},
	open: async ({ params }) => {
		if (!params.groupid || !params.pollid) {
			return fail(400, {
				error: 'Ungültige Anfrage'
			});
		}

		const groupid = parseInt(params.groupid);
		const pollid = parseInt(params.pollid);

		try {
			await client.pollRound.update({
				where: {
					id: pollid,
					group_id: groupid
				},
				data: {
					open: true
				}
			});
			SSEEvents.emit(`pollRound:${pollid}`);
			return {
				success: 'Das Stimmungsbild wurde erfolgreich geöffnet.'
			};
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
				return fail(404, {
					error: 'Stimmungsbild nicht gefunden'
				});
			return fail(500, {
				error: 'Interner Serverfehler'
			});
		}
	},
	edit: async ({ params, request }) => {
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
					group_id: groupid
				},
				data: {
					open: state == 'open',
					question: question.trim(),
					autoClose: autoClose == 'on'
				}
			});
			SSEEvents.emit(`pollRound:${pollid}`);
			return {
				success: 'Das Stimmungsbild wurde erfolgreich bearbeitet.'
			};
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
				return fail(404, {
					error: 'Stimmungsbild nicht gefunden'
				});
			return fail(500, {
				error: 'Interner Serverfehler'
			});
		}
	}
};
