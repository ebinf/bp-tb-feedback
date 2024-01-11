import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, depends }) => {
	const userId = locals.session?.user.userId;
	depends(`user:${userId}`);
	return {
		userId,
		email: locals.session?.user.email,
		full_name: locals.session?.user.full_name,
		is_admin: locals.session?.user.admin
	};
};
