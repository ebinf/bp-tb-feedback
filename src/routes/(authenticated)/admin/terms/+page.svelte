<script lang="ts">
	import { page } from '$app/stores';
	import { createNotification } from '../../stores';

	if ($page.url.searchParams.has('deleted')) {
		createNotification('Das Semester wurde erfolgreich gelöscht.', 'Semester gelöscht', 'success');
	}

	if ($page.url.searchParams.has('created')) {
		createNotification(
			'Das Semester wurde erfolgreich erstellt. Du kannst jetzt Gruppen darin anlegen.',
			'Semester erstellt',
			'success'
		);
	}

	if ($page.url.searchParams.has('edited')) {
		createNotification(
			'Das Semester wurde erfolgreich bearbeitet.',
			'Semester bearbeitet',
			'success'
		);
	}
</script>
