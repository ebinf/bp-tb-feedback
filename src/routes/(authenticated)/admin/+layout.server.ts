import { client } from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends }) => {
	depends('admin:groups');
	depends('admin:users');
	depends('admin:terms');
	return {
		groups: await client.group.count(),
		users: await client.user.count(),
		terms: await client.term.count()
	};
};
