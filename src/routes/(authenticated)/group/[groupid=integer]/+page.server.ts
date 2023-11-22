import { client } from '$lib/server/database';
import { page } from '$app/stores';

import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();
	if (!session) throw error(401);
	try {
		const group = await client.group.findUniqueOrThrow({
			where: {
				id: parseInt(params.groupid),
				lead_id: session.user.userId
			},
			include: {
				term: true
			}
		});
		return {
			group
		};
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
			throw error(404, 'Gruppe nicht gefunden');
	}
};
