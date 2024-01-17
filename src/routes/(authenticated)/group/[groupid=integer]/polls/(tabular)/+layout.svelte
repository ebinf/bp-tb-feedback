<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Empty from './empty.svelte';
	import Table from '$lib/components/table.svelte';
	import { gray } from 'tailwindcss/colors';

	export let data;

	let polls: { highlight?: boolean; link?: string; data: Record<string, string> }[] = [];
	$: {
		polls = [];
		data.polls?.forEach((poll) => {
			polls.push({
				highlight: poll.open,
				link: `/group/${data.group?.id}/polls/${poll.id}`,
				data: {
					created: `${poll.created.toLocaleString()} Uhr`,
					question: poll.question,
					votes: poll._count.votes == 1 ? '1 Stimme' : `${poll._count.votes} Stimmen`
				}
			});
		});
	}
</script>

<Header href={data.group?.term.active ? `/group/${data.group?.id}/polls/create` : ''}>
	<span slot="heading">Stimmungsbilder</span>
	<span slot="description"
		>{#if data.group?.term.active}Hier kannst von der Gruppe Stimmungsbilder einholen. Du kannst
			dabei eine spezielle Frage stellen oder die allgemeine Stimmung bewerten lassen.{:else}Hier
			siehst du die Stimmungsbilder, die du von der Gruppe eingeholt hast.{/if}
	</span>
	<span slot="cta">Neue Runde</span>
</Header>

{#if data?.polls?.length}
	<Table
		columns={[
			{ key: 'created', title: 'Erstellt' },
			{ key: 'question', title: 'Fragestellung' },
			{ key: 'votes', title: 'Stimmen' }
		]}
		rows={polls}
	></Table>
{:else}
	<Empty createLink="/group/{data.group?.id}/polls/create" active={data.group?.term.active} />
{/if}

<slot />
