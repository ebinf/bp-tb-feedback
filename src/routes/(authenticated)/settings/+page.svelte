<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { title, heading } from '../stores';

	title.set('Einstellungen');
	heading.set('Einstellungen');
</script>

<div class="mt-3 sm:mt-4">
	<Button href="/change_password">Passwort ändern</Button>
</div>
