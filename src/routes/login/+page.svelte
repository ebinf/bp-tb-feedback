<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_SITE_NAME, PUBLIC_SUPPORT_ADDRESS } from '$env/static/public';
	import { page } from '$app/stores';
	import Toast from '$lib/components/toast.svelte';

	export let form;

	const loggedout = $page.url.searchParams.has('loggedout');
	const registered = $page.url.searchParams.has('registered');
	const redirect = $page.url.searchParams.has('r');
	const deleted = $page.url.searchParams.has('deleted');

	let showToast = loggedout || registered || redirect || deleted;
</script>

<svelte:head>
	<title>Login | {PUBLIC_SITE_NAME}</title>
</svelte:head>

{#if form?.message}
	<Toast style="fail">{form.message}</Toast>
{:else if redirect}
	<Toast style="fail">Bitte melde dich an, um auf diese Seite zuzugreifen.</Toast>
{:else if loggedout}
	<Toast style="success">Du wurdest erfolgreich abgemeldet.</Toast>
{:else if deleted}
	<Toast style="success">Dein Account wurde erfolgreich gelöscht.</Toast>
{:else if registered}
	<Toast style="success">Du hast dich erfolgreich registriert. Bitte melde dich nun an.</Toast>
{/if}

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="mb-10 lg:mx-auto lg:w-full lg:max-w-sm">
		<img
			class="mx-auto h-10 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
			alt={PUBLIC_SITE_NAME}
		/>
	</div>

	<div
		class="grid grid-cols-1 md:grid-cols-2 divide-gray-200 divide-y md:divide-y-0 md:divide-x mx-auto w-full lg:w-2/3 xl:w-1/2"
	>
		<div class="md:px-6 md:py-0 py-6">
			<div>
				<h2 class="text-center text-2xl mb-2 font-bold leading-9 tracking-tight text-gray-900">
					Du bist Teambegleiter:in?
				</h2>
				<p class="text-gray-500 text-center">
					Bitte verwende die Anmeldedaten, die du erhalten hast.
				</p>
			</div>
			<form class="space-y-6 mt-10" method="POST" use:enhance>
				<div>
					<label for="username" class="block text-sm font-medium leading-6 text-gray-900"
						>Anmeldename</label
					>
					<div class="mt-2">
						<input
							id="username"
							name="username"
							type="text"
							autocomplete="username"
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 lg:text-sm lg:leading-6"
						/>
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between">
						<label for="password" class="block text-sm font-medium leading-6 text-gray-900"
							>Passwort</label
						>
					</div>
					<div class="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 lg:text-sm lg:leading-6"
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
						>Anmelden</button
					>
				</div>
			</form>

			<p class="mt-10 text-center text-sm text-gray-500">
				Anmeldedaten nicht erhalten oder vergessen?
				<a
					href="mailto:{PUBLIC_SUPPORT_ADDRESS}"
					class="font-semibold leading-6 text-primary-600 hover:text-primary-500"
					>Nimm Kontakt auf</a
				>
			</p>
		</div>

		<div class="md:px-6 md:py-0 py-6 flex h-full items-center">
			<div>
				<h2 class="text-center text-2xl mb-2 font-bold leading-9 tracking-tight text-gray-900">
					Du bist Teilnehmer:in?
				</h2>
				<p class="text-gray-500 text-center">
					Bitte verwende die Links für Feedback und Abstimmungen, die dir von deiner Teambegleitung
					zugesendet werden. Du kannst dich nicht direkt anmelden.
				</p>
			</div>
		</div>
	</div>
</div>
