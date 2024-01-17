import type { Actions, PageServerLoad } from './$types';
import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { error, fail, redirect } from '@sveltejs/kit';
import { SSEEvents } from '$lib/server/eventstore';

export const load: PageServerLoad = async ({ locals, params, depends }) => {
	if (!locals.session) throw error(401);
	const termId = params.termId;

	try {
		const term = await client.term.findUniqueOrThrow({
			where: {
				id: Number(termId)
			},
			include: {
				groups: {
					select: {
						id: true,
						name: true,
						number: true
					},
					orderBy: {
						number: 'asc'
					}
				}
			}
		});

		depends('admin:terms');

		return {
			term
		};
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
			throw error(404, 'Semester nicht gefunden');
		}
		throw error(500, 'Internal Server Error');
	}
};

export const actions: Actions = {
	edit: async ({ request, params }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const active = formData.get('active') as string;
		const termId = params.termId as string;

		if (name.trim().length < 2 || name.trim().length > 255) {
			return fail(400, {
				error: 'Das eingegebene Name ist ungültig. Er sollte zwischen 2 und 255 Zeichen lang sein.'
			});
		}

		try {
			const term = await client.term.update({
				where: {
					id: Number(termId)
				},
				data: {
					name: name.trim(),
					active: active == 'on'
				},
				include: {
					groups: {
						select: {
							id: true,
							PollRound: {
								select: {
									id: true
								}
							}
						}
					}
				}
			});

			SSEEvents.emit('admin:terms');
			SSEEvents.emit(`term:${termId}`);

			if (!active) {
				await client.group.updateMany({
					where: {
						term_id: Number(termId)
					},
					data: {
						feedback_link: null
					}
				});
				await client.pollRound.updateMany({
					where: {
						group: {
							term_id: Number(termId)
						}
					},
					data: {
						open: false
					}
				});
				term.groups.forEach((group) => {
					SSEEvents.emit(`group:${group.id}`);
					group.PollRound.forEach((pollRound) => {
						SSEEvents.emit(`pollRound:${pollRound.id}`);
					});
				});
			}
		} catch (e) {
			return fail(500, {
				error: 'Es ist ein unbekannter Fehler aufgetreten.'
			});
		}

		throw redirect(302, '/admin/terms?edited');
	},

	delete: async ({ params }) => {
		const termId = params.termId as string;

		try {
			const groups = await client.group.findMany({
				where: {
					term_id: Number(termId)
				}
			});

			await client.term.delete({
				where: {
					id: Number(termId)
				}
			});

			SSEEvents.emit('admin:terms');
			SSEEvents.emit(`term:${termId}`);

			if (groups.length > 0) {
				groups.forEach((group) => {
					SSEEvents.emit(`group:${group.id}`);
				});
				SSEEvents.emit('admin:groups');
			}
		} catch (e) {
			return fail(500, {
				error: 'Es ist ein unbekannter Fehler aufgetreten.'
			});
		}

		throw redirect(302, '/admin/terms?deleted');
	}
};
