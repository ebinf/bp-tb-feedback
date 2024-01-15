import { client } from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends }) => {
	depends('admin:users');
	return {
		users: await client.user.findMany({
			orderBy: {
				id: 'asc'
			},
			include: {
				_count: {
					select: {
						Group: true
					}
				}
			}
		})
	};
};
