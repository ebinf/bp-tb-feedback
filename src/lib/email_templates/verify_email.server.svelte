<script lang="ts">
	import Button from './components/button.server.svelte';
	import Layout from './layouts/layout.server.svelte';

	export let name: string;
	export let link: string;
</script>

<Layout heading="E-Mail-Adresse bestätigen" {name}
	>bitte bestätige, dass diese E-Mail-Adresse dir gehört. Klicke dafür auf den Button, um deine
	E-Mail-Adresse zu bestätigen. Die Anfrage ist 24 Stunden gültig, danach musst du eine neue
	Bestätigung anfordern.
	<Button {link}>E-Mail-Adresse bestätigen</Button>

	Falls nicht du diese Anfrage gestellt hast, kannst du diese E-Mail ignorieren.
</Layout>
