<script lang="ts">
	import { page } from '$app/stores';
	import { createNotification } from '../../stores';

	if ($page.url.searchParams.has('deleted')) {
		createNotification('Das Konto wurde erfolgreich gelöscht.', 'Nutzer:in gelöscht', 'success');
	}

	if ($page.url.searchParams.has('created')) {
		createNotification(
			'Das Konto wurde erfolgreich erstellt. Die Nutzerin beziehungsweise der Nutzer kann sich jetzt anmelden.',
			'Nutzer:in erstellt',
			'success'
		);
	}

	if ($page.url.searchParams.has('edited')) {
		createNotification(
			'Das Konto wurde erfolgreich bearbeitet.',
			'Nutzer:in bearbeitet',
			'success'
		);
	}

	if ($page.url.searchParams.has('welcome_mail_sent')) {
		createNotification(
			'Die Willkommens-E-Mail wurde erfolgreich an die Nutzerin beziehungsweise den Nutzer gesendet.',
			'Willkommens-E-Mail gesendet',
			'success'
		);
	}
</script>
