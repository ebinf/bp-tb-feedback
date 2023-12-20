<script lang="ts">
	import Button from './components/button.server.svelte';
	import Layout from './layouts/layout.server.svelte';

	export let name: string;
	export let link: string;
</script>

<Layout heading="Passwort zurücksetzen" {name}
	>du hast gerade angefordert, dein Passwort zurückzusetzen. Klicke auf den Button, um dein Passwort
	zurückzusetzen. Die Anfrage ist eine Stunde gültig.
	<Button {link}>Passwort zurücksetzen</Button>

	Falls du dein Passwort nicht zurücksetzen möchtest, kannst du diese E-Mail ignorieren.
</Layout>
