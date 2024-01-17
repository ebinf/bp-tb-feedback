<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Table from '$lib/components/table.svelte';

	export let data;

	let terms: { highlight?: boolean; link?: string; data: Record<string, string> }[] = [];

	$: {
		terms = [];
		data.terms.forEach((term) => {
			terms.push({
				highlight: false,
				link: `/admin/terms/edit/${term.id}`,
				data: {
					name: term.name,
					active: term.active ? 'Aktiv' : 'Nicht aktiv',
					groups: term._count.groups == 1 ? '1 Gruppe' : `${term._count.groups} Gruppen`
				}
			});
		});
	}
</script>

<Header href="/admin/terms/create">
	<span slot="heading">Semester</span>
	<span slot="description"
		>Hier kannst du die Semester verwalten und neue anlegen. Du kannst sie aktiv und inaktiv setzen.</span
	>
	<span slot="cta">Semester hinzufügen</span>
</Header>

<Table
	columns={[
		{ key: 'name', title: 'Name' },
		{ key: 'active', title: 'Aktiv' },
		{ key: 'groups', title: 'Gruppen' }
	]}
	rows={terms}
></Table>

<slot />
