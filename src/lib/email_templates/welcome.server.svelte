<script lang="ts">
	import { PUBLIC_BASE_URL, PUBLIC_SITE_NAME, PUBLIC_SUPPORT_ADDRESS } from '$env/static/public';
	import Button from './components/button.server.svelte';
	import Layout from './layouts/layout.server.svelte';

	export let name: string;
	export let link: string;
</script>

<Layout heading="Wilkommen!" {name}
	><p>
		herzlich willkommen bei {PUBLIC_SITE_NAME}! Du kannst dort deine Gruppen verwalten, von ihnen
		Feedback einholen, Stimmungsbilder erstellen und mehr.
	</p>

	<p>
		Vermutlich werden dir in den nächsten Minuten deine Gruppen zugeordnet. Zur Bestätigung erhältst
		du für jede Gruppe noch eine separate E-Mail.
	</p>

	<p>
		Damit du dich anmelden kannst, musst du zunächst ein Passwort festlegen. Klicke dazu auf den
		folgenden Button. Bitte lege das Passwort innerhalb der nächsten 24 Stunden fest, da der Link
		danach abläuft.
	</p>

	<Button {link}>Passwort festlegen</Button>

	<p>
		Sobald du dein Passwort festgelegt hast, kannst du dich mit deiner E-Mail-Adresse und dem neuen
		Passwort hier anmelden: <a href={PUBLIC_BASE_URL}>{PUBLIC_BASE_URL}</a>.
	</p>

	<p>
		Solltest du Fragen, Probleme oder Anmerkungen haben, wende dich gerne jederzeit an <a
			href="mailto:{PUBLIC_SUPPORT_ADDRESS}">{PUBLIC_SUPPORT_ADDRESS}</a
		>.
	</p>

	<p>
		Ansonsten wünschen wir dir viel Spaß bei der Benutzung von {PUBLIC_SITE_NAME}!
	</p>
</Layout>
