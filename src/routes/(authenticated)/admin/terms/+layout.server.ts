import { client } from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends }) => {
	depends('admin:terms');
	return {
		terms: await client.term.findMany({
			include: {
				_count: {
					select: {
						groups: true
					}
				}
			},
			orderBy: {
				id: 'desc'
			}
		})
	};
};
