<script lang="ts">
	import { page } from '$app/stores';
	import { createNotification } from '../../../stores';
	import Header from '$lib/components/header.svelte';
	import Table from '$lib/components/table.svelte';
	import Empty from './empty.svelte';

	export let data;

	let notes: { link?: string; data: Record<string, string> }[] = [];
	$: {
		notes = [];
		data.notes?.forEach((note) => {
			notes.push({
				link: `/group/${data.group?.id}/notes/${note.id}`,
				data: {
					edited: `${note.edited.toLocaleString()} Uhr`,
					title: note.title
				}
			});
		});
	}

	if ($page.url.searchParams.has('deleted')) {
		createNotification('Die Notiz wurde erfolgreich gelöscht.', 'Notiz gelöscht', 'success');
	}
</script>

<Header href={data.group?.term.active ? `/group/${data.group?.id}/notes/create` : ''}>
	<span slot="heading">Notizen</span>
	<span slot="description"
		>{#if data.group?.term.active}Hier kannst du dir Notizen zur Gruppe machen und diese einsehen.{:else}Hier
			kannst du deine Notizen zur Gruppe einsehen.{/if}</span
	>
	<span slot="cta">Notiz hinzufügen</span>
</Header>

{#if data.notes?.length}
	<Table
		columns={[
			{ key: 'title', title: 'Titel' },
			{ key: 'edited', title: 'Bearbeitet' }
		]}
		rows={notes}
	></Table>
{:else}
	<Empty active={data.group?.term.active} createLink="/group/{data.group?.id}/notes/create"></Empty>
{/if}
