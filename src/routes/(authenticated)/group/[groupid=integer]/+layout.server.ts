import { client } from '$lib/server/database';

import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const load: LayoutServerLoad = async ({ locals, params, depends }) => {
	if (!locals.session) throw error(401);
	try {
		const group = await client.group.findUniqueOrThrow({
			where: {
				id: parseInt(params.groupid),
				lead_id: locals.session.user.userId
			},
			include: {
				term: true
			}
		});
		const feedback = await client.feedback.findMany({
			where: {
				group_id: group.id
			},
			orderBy: {
				timestamp: 'desc'
			}
		});
		const polls = await client.pollRound.findMany({
			where: {
				group_id: group.id
			},
			orderBy: {
				created: 'desc'
			},
			include: {
				_count: {
					select: {
						votes: true
					}
				}
			}
		});
		depends(`group:${group.id}`);
		for (const ipoll of polls) {
			depends(`pollRound:${ipoll.id}`);
		}
		for (const ifeedback of feedback) {
			depends(`feedback:${ifeedback.id}`);
		}
		return {
			group,
			feedback,
			polls,
			unread_feedback: feedback.filter((f) => !f.read).length
		};
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
			throw error(404, 'Gruppe nicht gefunden');
	}
};
