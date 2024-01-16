import type { Actions, PageServerLoad } from './$types';
import { client } from '$lib/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { error, fail, redirect } from '@sveltejs/kit';
import { SSEEvents } from '$lib/server/eventstore';
import { sendMailFromTemplate } from '$lib/server/email';
import { PUBLIC_BASE_URL } from '$env/static/public';
import NewGroup from '$lib/email_templates/new_group.server.svelte';

export const load: PageServerLoad = async ({ locals, params, depends }) => {
	if (!locals.session) throw error(401);
	const groupId = params.groupId as string;

	depends('admin:users');
	depends('admin:groups');
	depends('admin:terms');

	try {
		const terms = await client.term.findMany({
			orderBy: {
				id: 'desc'
			}
		});

		const users = (
			await client.user.findMany({
				orderBy: {
					id: 'asc'
				},
				select: {
					id: true,
					full_name: true
				}
			})
		).sort((a, b) => a.full_name.localeCompare(b.full_name));

		const group = await client.group.findUniqueOrThrow({
			where: {
				id: Number(groupId)
			}
		});

		const feedbacks = await client.feedback.count({
			where: {
				group_id: group.id
			}
		});

		const pollRounds = await client.pollRound.count({
			where: {
				group_id: group.id
			}
		});

		depends(`group:${group.id}`);

		return {
			users,
			terms,
			group,
			feedbacks,
			pollRounds
		};
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
			throw error(404, 'Gruppe nicht gefunden');
		}
		throw error(500, 'Internal Server Error');
	}
};

export const actions: Actions = {
	edit: async ({ request, params }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const number = formData.get('number') as string;
		const term = formData.get('term') as string;
		const lead = formData.get('lead') as string;
		const send_mail = formData.get('send_mail') as string;
		const groupId = params.groupId as string;

		if (name.trim().length < 2 || name.trim().length > 255) {
			return fail(400, {
				error: 'Das eingegebene Name ist ungültig. Er sollte zwischen 2 und 255 Zeichen lang sein.'
			});
		}

		if (number.trim().length > 4 || Number.isNaN(Number(number))) {
			return fail(400, {
				error:
					'Die eingegebene Nummer ist ungültig. Es muss eine positive Zahl mit einer bis vier Stellen sein.'
			});
		}

		const dbTerm = await client.term.findUnique({
			where: {
				id: Number(term)
			}
		});

		if (!dbTerm) {
			return fail(400, {
				error: 'Das ausgewählte Semester existiert nicht.'
			});
		}

		const dbLead = await client.user.findUnique({
			where: {
				id: lead
			}
		});

		if (!dbLead) {
			return fail(400, {
				error: 'Die ausgewählte Teambegleitung existiert nicht.'
			});
		}

		try {
			const group = await client.group.findUniqueOrThrow({
				where: {
					id: Number(groupId)
				}
			});

			await client.group.update({
				where: {
					id: group.id
				},
				data: {
					name: name.trim(),
					number: Number(number),
					term_id: dbTerm.id,
					lead_id: dbLead.id
				}
			});

			SSEEvents.emit('admin:groups');
			SSEEvents.emit(`group:${group.id}`);

			if (group.lead_id != dbLead.id) {
				SSEEvents.registerNewEvent(`group:${group.id}`, `user:${dbLead.id}`);
				SSEEvents.emit(`user:${group.lead_id}`);
				SSEEvents.emit(`user:${dbLead.id}`);

				if (send_mail == 'on') {
					await sendMailFromTemplate(
						dbLead,
						`Neue Gruppe ${group.number}: ${group.name}`,
						NewGroup,
						{
							group_name: group.name,
							group_number: group.number,
							link: `${PUBLIC_BASE_URL}/group/${group.id}`,
							name: dbLead.full_name
						}
					);
				}
			}
		} catch (e) {
			return fail(500, {
				error: 'Es ist ein unbekannter Fehler aufgetreten.'
			});
		}

		throw redirect(302, '/admin/groups?edited');
	},

	delete: async ({ params }) => {
		const groupId = params.groupId as string;

		try {
			const group = await client.group.findUniqueOrThrow({
				where: {
					id: Number(groupId)
				}
			});

			await client.group.delete({
				where: {
					id: Number(groupId)
				}
			});

			SSEEvents.emit(`group:${group.id}}`);
			SSEEvents.emit('admin:groups');
		} catch (e) {
			return fail(500, {
				error: 'Es ist ein unbekannter Fehler aufgetreten.'
			});
		}

		throw redirect(302, '/admin/groups?deleted');
	}
};
