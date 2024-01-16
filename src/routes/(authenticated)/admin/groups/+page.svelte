<script lang="ts">
	import { page } from '$app/stores';
	import { createNotification } from '../../stores';

	if ($page.url.searchParams.has('deleted')) {
		createNotification('Die Gruppe wurde erfolgreich gelöscht.', 'Gruppe gelöscht', 'success');
	}

	if ($page.url.searchParams.has('created')) {
		createNotification(
			'Die Gruppe wurde erfolgreich erstellt. Die Teambegleitung kann sie nun sehen.',
			'Gruppe erstellt',
			'success'
		);
	}

	if ($page.url.searchParams.has('edited')) {
		createNotification('Die Gruppe wurde erfolgreich bearbeitet.', 'Gruppe bearbeitet', 'success');
	}
</script>
