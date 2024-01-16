import { client } from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends }) => {
	depends('admin:groups');
	depends('admin:terms');
	depends('admin:users');
	return {
		groups: await client.group.findMany({
			orderBy: [
				{
					term_id: 'desc'
				},
				{
					number: 'asc'
				},
				{
					id: 'asc'
				}
			],
			include: {
				term: true,
				lead: {
					select: {
						id: true,
						full_name: true
					}
				}
			}
		})
	};
};
