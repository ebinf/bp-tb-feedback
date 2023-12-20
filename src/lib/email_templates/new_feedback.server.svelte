<script lang="ts">
	import Button from './components/button.server.svelte';
	import Layout from './layouts/layout.server.svelte';

	export let group_number: string | number;
	export let group_name: string;
	export let link: string;
	export let name: string;
</script>

<Layout
	heading={group_name}
	{group_number}
	{name}
	title="Neues Feedback für Gruppe {group_number}: {group_name}"
>
	du hast gerade ein neues Feedback in der Gruppe {group_number}: {group_name} erhalten. Klicke hier,
	um es zu lesen:

	<Button {link}>Feedback öffnen</Button>
</Layout>
