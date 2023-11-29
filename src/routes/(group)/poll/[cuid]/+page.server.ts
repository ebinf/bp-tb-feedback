import { error, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { voteEvents } from '$lib/server/eventstore';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const poll = await client.pollRound.findUniqueOrThrow({
			where: {
				link: params.cuid
			},
			include: {
				group: {
					include: {
						lead: true
					}
				}
			}
		});
		return {
			...poll
		};
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
			throw error(404, "This poll link doesn't exist");
		}
		throw error(500, 'An internal error occurred. Please try again later.');
	}
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const vote = formData.get('vote') as string;
		const comment = formData.get('comment') as string;

		if (!vote || parseInt(vote) < 0 || parseInt(vote) > 5) {
			return fail(400, {
				error: 'Deine Bewertung ist ungültig.'
			});
		}

		if (comment.trim().length > 2000) {
			return fail(400, {
				error: 'Dein Kommentar darf maximal 2000 Zeichen lang sein.'
			});
		}

		try {
			const poll = await client.pollRound.findUniqueOrThrow({
				where: {
					link: params.cuid
				},
				include: {
					_count: {
						select: {
							votes: true
						}
					}
				}
			});

			if (!poll.open) {
				return fail(400, {
					error:
						'Dieses Stimmungsbild ist leider bereits geschlossen. Deine Stimme konnte nicht gewertet werden. Falls du noch abstimmen möchtest, bitte deine Teambegleitung es wieder zu öffnen.'
				});
			}

			await client.vote.create({
				data: {
					poll_round_id: poll.id,
					vote: parseInt(vote),
					comment: comment.trim()
				}
			});

			if (poll._count.votes + 1 >= 5) {
				await client.pollRound.update({
					where: {
						id: poll.id
					},
					data: {
						open: false
					}
				});
			}

			voteEvents.emit(`vote:${poll.group_id}:${poll.id}`);

			return {
				success: 'Deine Stimme wurde erfolgreich übermittelt. Vielen Dank dafür!'
			};
		} catch (e) {
			console.log(e);
			if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
				return fail(404, {
					error: 'Dieser Stimmungsbild-Link existiert nicht.'
				});
			}
			return fail(500, {
				error:
					'Bei der Übermittlung deiner Stimme ist ein Fehler aufgetreten. Bitte versuche es erneut.'
			});
		}
	}
};
