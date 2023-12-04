import { error, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SSEEvents } from '$lib/server/eventstore';

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

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const message = formData.get('message') as string;

		if (!message || message.trim().length < 10) {
			return fail(400, {
				error: 'Deine Nachricht ist zu kurz.'
			});
		}

		if (message.trim().length > 20000) {
			return fail(400, {
				error: 'Deine Nachricht darf maximal 20000 Zeichen lang sein.'
			});
		}

		let nameEntry: string | null = null;
		if (name && name.trim().length > 0) nameEntry = name.trim();

		if (nameEntry && nameEntry.length > 50) {
			return fail(400, {
				error: 'Deine Name darf maximal 50 Zeichen lang sein.'
			});
		}

		try {
			const group = await client.group.findUniqueOrThrow({
				where: {
					feedback_link: params.cuid
				},
				include: {
					lead: true
				}
			});

			const info = await client.feedback.create({
				data: {
					name: nameEntry,
					feedback: message.trim(),
					group: {
						connect: {
							id: group.id
						}
					}
				}
			});

			SSEEvents.registerNewEvent(`feedback:${info.id}`, `group:${group.id}`);
			SSEEvents.emit(`group:${group.id}`);
			SSEEvents.emit(`feedback:${info.id}`);

			return {
				success: 'Dein Feedback wurde erfolgreich übermittelt. Vielen Dank dafür!'
			};
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
				return fail(404, {
					error: 'Dieser Feedback-Link existiert nicht.'
				});
			}
			return fail(500, {
				error:
					'Bei der Übermittlung deines Feedbacks ist ein Fehler aufgetreten. Bitte versuche es erneut.'
			});
		}
	}
};
