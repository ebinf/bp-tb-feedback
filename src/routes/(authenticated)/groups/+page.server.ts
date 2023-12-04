import { client } from '$lib/server/database';

import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, depends }) => {
	const session = await locals.auth.validate();
	if (!session) return fail(401);
	depends(`user:${session.user.userId}`);
	const terms = await client.term.findMany({
		where: {
			groups: {
				some: {
					lead_id: session.user.userId
				}
			}
		},
		orderBy: {
			id: 'desc'
		},
		include: {
			groups: {
				where: {
					lead_id: session.user.userId
				},
				orderBy: {
					number: 'asc'
				},
				include: {
					Feedback: {
						where: {
							read: null
						}
					}
				}
			}
		}
	});
	terms.forEach((term) => {
		depends(`term:${term.id}`);
		term.groups.forEach((group) => {
			depends(`group:${group.id}`);
			group.Feedback.forEach((feedback) => {
				depends(`feedback:${feedback.id}`);
			});
		});
	});

	return {
		streamed: {
			terms: terms
		}
	};
};
