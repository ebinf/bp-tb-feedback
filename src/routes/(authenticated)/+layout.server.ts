import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, request }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, `/login?r=${new URL(request.url).pathname}`);
	return {
		userId: session.user.userId,
		email: session.user.email,
		full_name: session.user.full_name
	};
};
