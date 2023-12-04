import type { PageServerLoad } from './$types';
import { client } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SSEEvents } from '$lib/server/eventstore';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const details = await client.feedback.findUniqueOrThrow({
			where: {
				id: parseInt(params.feedbackid),
				group_id: parseInt(params.groupid)
			}
		});
		if (!details.read) {
			const now = new Date();
			await client.feedback.update({
				where: {
					id: parseInt(params.feedbackid)
				},
				data: {
					read: now
				}
			});
			details.read = now;
			SSEEvents.emit(`feedback:${details.id}`);
		}
		return {
			feedback_details: details
		};
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
			throw error(404, 'Feedback not Found');
		throw error(500, 'Internal Server Error');
	}
};
