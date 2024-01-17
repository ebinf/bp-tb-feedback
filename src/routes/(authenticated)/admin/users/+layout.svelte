<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Table from '$lib/components/table.svelte';

	export let data;

	let users: { link: string; data: Record<string, string> }[] = [];

	$: {
		users = [];
		data.users.forEach((user) => {
			users.push({
				link: `/admin/users/edit/${user.id}`,
				data: {
					full_name: user.full_name,
					mail: user.email,
					role: user.admin ? 'Administrator:in' : 'Teambegleiter:in',
					groups: user._count.Group == 1 ? '1 Gruppe' : `${user._count.Group} Gruppen`
				}
			});
		});
	}
</script>

<Header href="/admin/users/create">
	<span slot="heading">Nutzer:innen</span>
	<span slot="description"
		>Hier kannst du die Nutzerinnen und Nutzer verwalten und neue anlegen. Nutzer:innen können
		sowohl Teambegleitungen sein, als auch Administrator:innen.
	</span>
	<span slot="cta">Nutzer:in hinzufügen</span>
</Header>

<Table
	columns={[
		{ key: 'full_name', title: 'Name' },
		{ key: 'mail', title: 'E-Mail-Adresse' },
		{ key: 'role', title: 'Rolle' },
		{ key: 'groups', title: 'Gruppen' }
	]}
	rows={users}
></Table>

<slot />
