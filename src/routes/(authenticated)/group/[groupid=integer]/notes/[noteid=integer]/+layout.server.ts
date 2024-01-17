import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ params, locals, depends }) => {
	const groupid = parseInt(params.groupid);
	const noteid = parseInt(params.noteid);

	if (!locals.session) throw error(401);

	depends(`note:${noteid}`);

	try {
		const note = await client.note.findUniqueOrThrow({
			where: {
				id: noteid,
				group_id: groupid,
				author_id: locals.session.user.userId
			}
		});
		return {
			note
		};
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
			throw error(404, 'Notiz nicht gefunden');
		throw error(500, 'Interner Serverfehler');
	}
};
