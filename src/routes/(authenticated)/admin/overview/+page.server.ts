import { client } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends }) => {
	depends('admin:groups');
	depends('admin:users');
	depends('admin:terms');
	return {
		groups: await client.group.count(),
		users: await client.user.count(),
		terms: await client.term.count(),
		polls: await client.pollRound.count(),
		votes: await client.vote.count(),
		feedbacks: await client.feedback.count()
	};
};
