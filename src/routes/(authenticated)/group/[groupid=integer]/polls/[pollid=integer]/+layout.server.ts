import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ params, depends }) => {
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
