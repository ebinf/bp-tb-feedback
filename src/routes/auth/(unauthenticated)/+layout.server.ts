import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, request }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, `/auth/user`);
	return {};
};
