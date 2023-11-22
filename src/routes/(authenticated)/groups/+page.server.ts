import { client } from '$lib/server/database';
import { page } from '$app/stores';

import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw fail(401);
	var terms = await client.term.findMany({
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
				}
			}
		}
	});
	return {
		terms
	};
};
