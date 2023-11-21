<script lang="ts">
	import { title } from '../../store';

	title.set('Delete account');

	export let form;
</script>

<h1 class="font-bold text-3xl mb-4">Delete account</h1>

<p class="text-gray-500 mb-4">
	If you really want to delete your account, please click the button below. You will be signed out
	from all devices and won't be able to log in again. Your data will be permanently deleted.
</p>

{#if form?.message}
	<p class="mb-4 bg-red-500 text-white px-4 py-2 rounded font-semibold">{form.message}</p>
{/if}

<form method="post">
	<div>
		<button type="submit" class="bg-red-500 px-4 py-2 rounded text-white">Delete account</button>
	</div>
</form>
