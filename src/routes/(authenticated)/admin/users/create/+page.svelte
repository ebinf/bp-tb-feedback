<script lang="ts">
	import { goto } from '$app/navigation';
	import { createNotification } from '../../../stores';
	import Slideover from './slideover.svelte';

	export let form;

	$: {
		if (form?.success) {
			createNotification(form.success, 'Nutzer:in hinzugefügt', 'success');
			goto('/admin/users');
		}
	}
</script>

<Slideover {form}></Slideover>
