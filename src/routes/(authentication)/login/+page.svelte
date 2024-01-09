<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_SITE_NAME, PUBLIC_SUPPORT_ADDRESS } from '$env/static/public';
	import { page } from '$app/stores';
	import Toast from '$lib/components/toast.svelte';
	import Modal from '$lib/components/modal.svelte';

	export let form;

	const loggedout = $page.url.searchParams.has('loggedout');
	const registered = $page.url.searchParams.has('registered');
	const redirect = $page.url.searchParams.has('r');
	const deleted = $page.url.searchParams.has('deleted');
	const password_reset = $page.url.searchParams.has('password_reset');

	let reset_password_modal = $page.url.searchParams.has('forgot_password');
	let reset_password_form: HTMLFormElement;
	let formSubmitting: boolean = false;
</script>

<svelte:head>
	<title>Login | {PUBLIC_SITE_NAME}</title>
</svelte:head>

<div
	class="mx-auto grid w-full grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-x md:divide-y-0 lg:w-2/3 xl:w-1/2"
>
	<div class="py-6 md:px-6 md:py-0">
		<div class="mb-4">
			<h2 class="mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Du bist Teambegleiter:in?
			</h2>
			<p class="text-center text-gray-500">
				Bitte verwende die Anmeldedaten, die du erhalten hast.
			</p>
		</div>
		<div>
			{#if form?.message}
				<Toast style="fail">{form.message}</Toast>
			{:else if form?.success}
				<Toast style="success">{form.success}</Toast>
			{:else if redirect}
				<Toast style="fail" dismissable={true}
					>Bitte melde dich an, um auf diese Seite zuzugreifen.</Toast
				>
			{:else if loggedout}
				<Toast style="success">Du wurdest erfolgreich abgemeldet.</Toast>
			{:else if deleted}
				<Toast style="success">Dein Account wurde erfolgreich gelöscht.</Toast>
			{:else if registered}
				<Toast style="success">Du hast dich erfolgreich registriert. Bitte melde dich nun an.</Toast
				>
			{:else if password_reset}
				<Toast style="success"
					>Dein Passwort wurde erfolgreich zurückgesetzt. Du kannst dich nun mit dem neuen Passwort
					anmelden.</Toast
				>
			{/if}
		</div>
		<form
			class="mt-6 space-y-6"
			method="POST"
			action="?/login"
			use:enhance={() => {
				formSubmitting = true;
				return async ({ update }) => {
					update({ reset: false });
					formSubmitting = false;
				};
			}}
		>
			<div>
				<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
					>E-Mail-Adresse</label
				>
				<div class="mt-2">
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						disabled={formSubmitting}
						class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 lg:text-sm lg:leading-6"
					/>
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label for="password" class="block text-sm font-medium leading-6 text-gray-900"
						>Passwort</label
					>
					<div class="text-sm">
						<a
							href="?forgot_password"
							type="button"
							on:click|preventDefault={() => (reset_password_modal = true)}
							class="font-semibold text-primary-600 hover:text-primary-500">Passwort vergessen?</a
						>
					</div>
				</div>
				<div class="mt-2">
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						disabled={formSubmitting}
						class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 lg:text-sm lg:leading-6"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					disabled={formSubmitting}
					class="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-primary-500 disabled:opacity-90"
					>Anmelden</button
				>
			</div>
		</form>

		<p class="mt-10 text-center text-sm text-gray-500">
			Anmeldedaten nicht erhalten?
			<a
				href="mailto:{PUBLIC_SUPPORT_ADDRESS}"
				class="font-semibold leading-6 text-primary-600 hover:text-primary-500">Nimm Kontakt auf</a
			>
		</p>
	</div>

	<div class="flex h-full items-center py-6 md:px-6 md:py-0">
		<div>
			<h2 class="mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Du bist Teilnehmer:in?
			</h2>
			<p class="text-center text-gray-500">
				Bitte verwende die Links für Feedback und Abstimmungen, die dir von deiner Teambegleitung
				zugesendet werden. Du kannst dich nicht direkt anmelden.
			</p>
		</div>
	</div>
</div>

<Modal
	shown={reset_password_modal}
	style="primary"
	on:cancelled={() => (reset_password_modal = false)}
	on:confirmed={() => {
		if (!reset_password_form.reportValidity()) return;
		reset_password_form.dispatchEvent(new Event('submit'));
	}}
>
	<svg
		class="h-6 w-6 text-primary-600"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		aria-hidden="true"
		slot="icon"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
		/>
	</svg>
	<span slot="title">Passwort zurücksetzen</span>
	<span slot="content">
		Du hast dein Passwort vergessen? Kein Problem! Gib einfach deine E-Mail-Adresse ein und du
		erhältst einen Link zum Zurücksetzen deines Passworts.
		<form
			action="?/reset_password"
			method="POST"
			use:enhance={() => {
				formSubmitting = true;
				return async ({ update }) => {
					update({ reset: false });
					formSubmitting = false;
					reset_password_modal = false;
				};
			}}
			bind:this={reset_password_form}
		>
			<div class="mt-4">
				<input
					id="password_reset_email"
					name="password_reset_email"
					type="email"
					autocomplete="email"
					placeholder="E-Mail-Adresse"
					required
					disabled={formSubmitting}
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 lg:text-sm lg:leading-6"
				/>
			</div>
		</form>
	</span>
	<span slot="action">Link senden</span>
</Modal>
