import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		userId: locals.session?.user.userId,
		email: locals.session?.user.email,
		full_name: locals.session?.user.full_name
	};
};
