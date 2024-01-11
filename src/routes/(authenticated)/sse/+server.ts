import { client } from '$lib/server/database';
import { SSEEvents } from '$lib/server/eventstore.js';
import { error } from '@sveltejs/kit';

export const GET = async ({ locals }) => {
	if (!locals.session) throw error(401);

	const user = await client.user.findUniqueOrThrow({
		where: {
			id: locals.session.user.userId
		},
		include: {
			Group: {
				include: {
					term: true,
					Feedback: true,
					PollRound: true
				}
			}
		}
	});

	const events = new Set([`user:${user.id}`]);
	user.Group.forEach((group) => {
		events.add(`group:${group.id}`);
		events.add(`term:${group.term.id}`);
		group.Feedback.forEach((feedback) => {
			events.add(`feedback:${feedback.id}`);
		});
		group.PollRound.forEach((poll) => {
			events.add(`pollRound:${poll.id}`);
		});
	});
	if (user.admin) {
		events.add('admin:terms');
		events.add('admin:users');
		events.add('admin:groups');
	}

	const stream = new ReadableStream<string>({
		start(controller) {
			SSEEvents.addListener(controller, events);
		},
		cancel() {}
	});

	return new Response(stream, {
		headers: {
			'content-type': 'text/event-stream',
			'cache-control': 'no-cache',
			connection: 'keep-alive'
		}
	});
};
