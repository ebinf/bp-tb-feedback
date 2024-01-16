import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { client } from '$lib/server/database';
import { sendMailFromTemplate } from '$lib/server/email';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { SSEEvents } from '$lib/server/eventstore';
import NewGroup from '$lib/email_templates/new_group.server.svelte';

export const load: PageServerLoad = async ({ depends }) => {
	depends('admin:users');
	depends('admin:terms');
	return {
		terms: await client.term.findMany({
			orderBy: {
				id: 'desc'
			}
		}),
		users: (
			await client.user.findMany({
				orderBy: {
					id: 'asc'
				},
				select: {
					id: true,
					full_name: true
				}
			})
		).sort((a, b) => a.full_name.localeCompare(b.full_name))
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const number = formData.get('number') as string;
		const term = formData.get('term') as string;
		const lead = formData.get('lead') as string;
		const send_mail = formData.get('send_mail') as string;

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
			const newGroup = await client.group.create({
				data: {
					name: name.trim(),
					number: Number(number),
					term_id: dbTerm.id,
					lead_id: dbLead.id
				}
			});

			SSEEvents.emit('admin:groups');
			SSEEvents.emit(`user:${dbLead.id}`);
			SSEEvents.registerNewEvent(`group:${newGroup.id}`, `user:${dbLead.id}`);
			SSEEvents.emit(`group:${newGroup.id}`);

			if (send_mail == 'on') {
				await sendMailFromTemplate(
					dbLead,
					`Neue Gruppe ${newGroup.number}: ${newGroup.name}`,
					NewGroup,
					{
						group_name: newGroup.name,
						group_number: newGroup.number,
						link: `${PUBLIC_BASE_URL}/group/${newGroup.id}`,
						name: dbLead.full_name
					}
				);
			}
		} catch (e) {
			return fail(500, {
				error: 'Es ist ein unbekannter Fehler aufgetreten.'
			});
		}

		throw redirect(302, '/admin/groups?created');
	}
};
