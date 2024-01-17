<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Table from '$lib/components/table.svelte';

	export let data;

	let groups: { link: string; data: Record<string, string> }[] = [];
	$: {
		groups = [];
		data.groups.forEach((group) => {
			groups.push({
				link: `/admin/groups/edit/${group.id}`,
				data: {
					number: group.number.toString(),
					name: group.name,
					term: group.term.name,
					lead: group.lead.full_name
				}
			});
		});
	}
</script>

<Header href="/admin/groups/create">
	<span slot="heading">Gruppen</span>
	<span slot="description"
		>Hier kannst du die Gruppen verwalten und neue anlegen. Du kannst sie einem Semester und einer
		Teambegleitung zuordnen.</span
	>
	<span slot="cta">Gruppe hinzufügen</span>
</Header>

<Table
	columns={[
		{ key: 'number', title: 'Nummer' },
		{ key: 'name', title: 'Name' },
		{ key: 'term', title: 'Semester' },
		{ key: 'lead', title: 'Teambegleitung' }
	]}
	rows={groups}
></Table>
<slot />
