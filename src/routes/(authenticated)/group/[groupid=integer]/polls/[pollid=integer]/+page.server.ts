import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { PageServerLoad } from './$types';
import { error, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const groupid = parseInt(params.groupid);
	const pollid = parseInt(params.pollid);

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
			return {
				status: 400,
				body: {
					success: false,
					error: 'Ungültige Anfrage'
				}
			};
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
			return {
				status: 200,
				body: {
					success: true
				}
			};
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
				return {
					status: 404,
					body: {
						success: false,
						error: 'Stimmungsbild nicht gefunden'
					}
				};
			return {
				status: 500,
				body: {
					success: false,
					error: 'Interner Serverfehler'
				}
			};
		}
	},
	open: async ({ params }) => {
		if (!params.groupid || !params.pollid) {
			return {
				status: 400,
				body: {
					success: false,
					error: 'Ungültige Anfrage'
				}
			};
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
			return {
				status: 200,
				body: {
					success: true
				}
			};
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
				return {
					status: 404,
					body: {
						success: false,
						error: 'Stimmungsbild nicht gefunden'
					}
				};
			return {
				status: 500,
				body: {
					success: false,
					error: 'Interner Serverfehler'
				}
			};
		}
	}
};
