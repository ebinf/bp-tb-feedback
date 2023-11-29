import { client } from '$lib/server/database';

import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) return fail(401);
	return {
		streamed: {
			terms: client.term.findMany({
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
			})
		}
	};
};
