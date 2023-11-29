import { voteEvents } from '$lib/server/eventstore.js';

export const GET = async ({ params }) => {
	const groupid = parseInt(params.groupid);
	const pollid = parseInt(params.pollid);

	const stream = new ReadableStream({
		start(controller) {
			voteEvents.on(`vote:${groupid}:${pollid}`, () => {
				controller.enqueue(`data: new vote\n\n`);
			});
		},
		cancel() {
			voteEvents.removeAllListeners(`vote:${groupid}:${pollid}`);
		}
	});

	return new Response(stream, {
		headers: {
			'content-type': 'text/event-stream',
			'cache-control': 'no-cache',
			connection: 'keep-alive'
		}
	});
};
