import type { PageServerLoad } from './$types';
import { client } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const load: PageServerLoad = async ({ params, parent }) => {
	try {
		const details = await client.feedback.findUniqueOrThrow({
			where: {
				id: parseInt(params.feedbackid),
				group_id: parseInt(params.groupid)
			}
		});
		if (!details.read) {
			await client.feedback.update({
				where: {
					id: parseInt(params.feedbackid)
				},
				data: {
					read: new Date()
				}
			});
		}
		const layoutData = await parent();
		return {
			...layoutData,
			feedback_details: details
		};
	} catch (e) {
		console.error(e);
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
			throw error(404, 'Feedback not Found');
		throw error(500, 'Internal Server Error');
	}
};
