import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { fail } from '@sveltejs/kit';
import { SSEEvents } from '$lib/server/eventstore';
import type { Actions } from './$types';

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
					group: {
						id: groupid,
						term: {
							active: true
						}
					}
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
					group: {
						id: groupid,
						term: {
							active: true
						}
					}
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
	}
};
