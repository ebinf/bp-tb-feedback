<script lang="ts">
	import { page } from '$app/stores';
	import { createNotification } from '../../stores';

	if ($page.url.searchParams.has('deleted')) {
		createNotification('Das Konto wurde erfolgreich gelöscht.', 'Nutzer:in gelöscht', 'success');
	}
</script>
