<script lang="ts">
	import { enhance } from '$app/forms';
	import Toast from '$lib/components/toast.svelte';
	import { title, heading } from '../stores';
	heading.set('Passwort ändern');
	title.set('Passwort ändern');

	export let form;
</script>

{#if form?.error}
	<Toast style="fail">{form.error}</Toast>
{:else if form?.success}
	<Toast style="success">{form.success}</Toast>
{/if}

<form method="POST" use:enhance>
	<div class="space-y-4 mt-4 w-full md:w-1/2 lg:w-1/3">
		<div>
			<label for="current_password" class="block text-sm font-medium leading-6 text-gray-900"
				>Aktuelles Passwort</label
			>
			<div class="mt-2">
				<input
					type="password"
					name="current_password"
					id="current_password"
					autocomplete="current-password"
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
				/>
			</div>
		</div>

		<div>
			<label for="new_password" class="block text-sm font-medium leading-6 text-gray-900"
				>Neues Passwort</label
			>
			<div class="mt-2">
				<input
					type="password"
					name="new_password"
					id="new_password"
					autocomplete="new-password"
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
				/>
			</div>
		</div>

		<div>
			<label for="repeat_password" class="block text-sm font-medium leading-6 text-gray-900"
				>Neues Passwort wiederholen</label
			>
			<div class="mt-2">
				<input
					type="password"
					name="repeat_password"
					id="repeat_password"
					autocomplete="new-password"
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
				/>
			</div>
		</div>

		<div class="justify-end">
			<button
				type="submit"
				class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
				>Passwort ändern</button
			>
		</div>
	</div>
</form>
