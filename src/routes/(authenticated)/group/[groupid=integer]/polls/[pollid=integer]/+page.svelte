<script lang="ts">
	import { page } from '$app/stores';
	import { createNotification } from '../../../../stores';

	if ($page.url.searchParams.has('created')) {
		createNotification(
			'Das Stimmungsbild wurde erfolgreich erstellt. Teile den Link mit der Gruppe, damit sie daran teilnehmen können.',
			'Stimmungsbild erstellt',
			'success'
		);
	}

	if ($page.url.searchParams.has('edited')) {
		createNotification(
			'Das Stimmungsbild wurde erfolgreich bearbeitet.',
			'Stimmungsbild bearbeitet',
			'success'
		);
	}
</script>
