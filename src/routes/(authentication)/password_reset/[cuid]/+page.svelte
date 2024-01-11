<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_SITE_NAME } from '$env/static/public';
	import Toast from '$lib/components/toast.svelte';
	import Button from '$lib/components/button.svelte';

	export let form;
	export let data;

	let disabled = data.resetToken === null;

	let formSubmitting: boolean = false;
</script>

<svelte:head>
	<title>Passwort zurücksetzen | {PUBLIC_SITE_NAME}</title>
</svelte:head>

<div class="mx-auto w-full divide-y divide-gray-200 md:w-1/2 md:divide-x md:divide-y-0 xl:w-1/4">
	<div class="py-6 md:px-6 md:py-0">
		<div class="mb-4">
			<h2 class="mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Passwort zurücksetzen
			</h2>
			<p class="text-center text-gray-500">
				Gib hier ein neues Passwort ein, um den Zugang zu deinem Account zurückzusetzen. Das
				Passwort sollte mindestens 10 Zeichen lang sein.
			</p>
		</div>
		<div>
			{#if disabled}
				<Toast style="fail" dismissable={false}
					>Dieser Link ist nicht gültig oder er ist bereits abgelaufen. Bitte <a
						class="font-bold underline"
						href="/login?forgot_password">fordere einen neuen an</a
					>, falls du dein Passwort zurücksetzen möchtest.</Toast
				>
			{:else if form?.message}
				<Toast style="fail">{form.message}</Toast>
			{/if}
		</div>
		<form
			class="mt-6 space-y-6"
			method="POST"
			use:enhance={() => {
				formSubmitting = true;
				return async ({ update }) => {
					update({ reset: false });
					formSubmitting = false;
				};
			}}
		>
			<div>
				<label for="new_password" class="block text-sm font-medium leading-6 text-gray-900"
					>Neues Passwort</label
				>
				<div class="mt-2">
					<input
						id="new_password"
						name="new_password"
						type="password"
						autocomplete="new-password"
						minlength="10"
						maxlength="255"
						required
						disabled={formSubmitting || disabled}
						class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 lg:text-sm lg:leading-6"
					/>
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label for="repeat_password" class="block text-sm font-medium leading-6 text-gray-900"
						>Neues Passwort wiederholen</label
					>
				</div>
				<div class="mt-2">
					<input
						id="repeat_password"
						name="repeat_password"
						type="password"
						autocomplete="new-password"
						minlength="10"
						maxlength="255"
						required
						disabled={formSubmitting || disabled}
						class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 lg:text-sm lg:leading-6"
					/>
				</div>
			</div>

			<div>
				<Button
					class="flex w-full justify-center leading-6 sm:w-full"
					submit={true}
					{disabled}
					spinner={formSubmitting}
					scheme="primary">Passwort ändern</Button
				>
			</div>
		</form>
	</div>
</div>
