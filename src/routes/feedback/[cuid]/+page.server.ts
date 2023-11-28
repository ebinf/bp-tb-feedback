import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const group = await client.group.findUniqueOrThrow({
			where: {
				feedback_link: params.cuid
			},
			include: {
				lead: true
			}
		});
		return {
			group
		};
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
			throw error(404, "This feedback link doesn't exist");
		}
		throw error(500, 'An internal error occurred. Please try again later.');
	}
};
