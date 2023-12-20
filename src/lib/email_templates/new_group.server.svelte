<script lang="ts">
	import Button from './components/button.server.svelte';
	import Layout from './layouts/layout.server.svelte';

	export let group_number: string | number;
	export let group_name: string;
	export let link: string;
	export let name: string;
</script>

<Layout heading={group_name} {group_number} {name} title="Neue Gruppe {group_number}: {group_name}">
	du wurdest gerade der Gruppe {group_number}: {group_name} zugeordnet. Klicke hier, um die Gruppe anzuzeigen:

	<Button {link}>Gruppe anzeigen</Button>
</Layout>
