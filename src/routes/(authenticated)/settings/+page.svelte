<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_BASE_URL, PUBLIC_SITE_NAME, PUBLIC_SUPPORT_ADDRESS } from '$env/static/public';
	import Button from '$lib/components/button.svelte';
	import { title, heading, createNotification } from '../stores';

	export let data;
	export let form;

	title.set('Einstellungen');
	heading.set('Einstellungen');

	$: {
		if (form?.success) {
			createNotification(form.success, 'Passwort ändern', 'success');
		}
		if (form?.error) {
			createNotification(form.error, 'Passwort ändern', 'fail');
		}
	}

	let changePasswordSubmitting = false;
	let logoutEverywhereSubmitting = false;
	let deleteAccountSubmitting = false;
</script>

<div class="divide-y divide-gray-600/5">
	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 md:grid-cols-3">
		<div>
			<h2 class="text-base font-semibold leading-7 text-gray-900">Persönliche Informationen</h2>
			<p class="mt-1 text-sm leading-6 text-gray-700">
				Diese Informationen sind mit deinem Konto verknüpft. Wenn sie fehlerhaft sind, wende dich
				bitte an <a
					class="font-medium underline hover:text-gray-500"
					href="mailto:{PUBLIC_SUPPORT_ADDRESS}">{PUBLIC_SUPPORT_ADDRESS}</a
				>.
			</p>
		</div>

		<form class="md:col-span-2">
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<div class="sm:col-span-3">
					<label for="first-name" class="block text-sm font-medium leading-6 text-gray-900"
						>Vorname</label
					>
					<div class="mt-2">
						<input
							type="text"
							name="first-name"
							id="first-name"
							autocomplete="given-name"
							value={data.first_name}
							required
							readonly
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 read-only:bg-gray-50 read-only:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="last-name" class="block text-sm font-medium leading-6 text-gray-900"
						>Nachname</label
					>
					<div class="mt-2">
						<input
							type="text"
							name="last-name"
							id="last-name"
							autocomplete="family-name"
							value={data.last_name}
							required
							readonly
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 read-only:bg-gray-50 read-only:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
						>E-Mail-Adresse</label
					>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							value={data.email}
							required
							readonly
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 read-only:bg-gray-50 read-only:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</div>
		</form>
	</div>

	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 md:grid-cols-3">
		<div>
			<h2 class="text-base font-semibold leading-7 text-gray-900">Passwort ändern</h2>
			<p class="mt-1 text-sm leading-6 text-gray-700">
				Hier kannst du das Passwort für deinen Zugang ändern. Das Passwort muss mindestens 10
				Zeichen lang sein.
			</p>
		</div>

		<form
			class="md:col-span-2"
			method="POST"
			action="?/change_password"
			use:enhance={() => {
				changePasswordSubmitting = true;
				return async ({ result, update }) => {
					changePasswordSubmitting = false;
					update({ reset: result.type == 'success' });
				};
			}}
		>
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<div class="col-span-full">
					<label for="current_password" class="block text-sm font-medium leading-6 text-gray-900"
						>Aktuelles Passwort</label
					>
					<div class="mt-2">
						<input
							id="current_password"
							name="current_password"
							type="password"
							autocomplete="current-password"
							disabled={changePasswordSubmitting}
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="new_password" class="block text-sm font-medium leading-6 text-gray-900"
						>Neues Passwort</label
					>
					<div class="mt-2">
						<input
							id="new_password"
							name="new_password"
							type="password"
							autocomplete="new-password"
							disabled={changePasswordSubmitting}
							minlength="10"
							maxlength="255"
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="repeat_password" class="block text-sm font-medium leading-6 text-gray-900"
						>Neues Passwort wiederholen</label
					>
					<div class="mt-2">
						<input
							id="repeat_password"
							name="repeat_password"
							type="password"
							autocomplete="new-password"
							disabled={changePasswordSubmitting}
							minlength="10"
							maxlength="255"
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</div>

			<div class="mt-8 flex">
				<Button submit={true} spinner={changePasswordSubmitting}>Passwort ändern</Button>
			</div>
		</form>
	</div>

	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 md:grid-cols-3">
		<div>
			<h2 class="text-base font-semibold leading-7 text-gray-900">Von allen Sitzungen abmelden</h2>
			<p class="mt-1 text-sm leading-6 text-gray-700">
				Wenn du dich nicht nur hier, sondern auch auf allen anderen Geräten abmelden möchtest,
				drücke auf den nebenstehenden Button.
			</p>
		</div>

		<div>
			<p class="text-sm leading-6 text-gray-700">
				Du bist momentan in <span class="font-semibold"
					>{#if data.sessions == 1}einer Sitzung{:else}{data.sessions} Sitzungen{/if}</span
				> angemeldet.
			</p>
			<div class="mt-8">
				<form
					class="md:col-span-2"
					method="POST"
					action="/logout?/logout_everywhere"
					use:enhance={() => {
						logoutEverywhereSubmitting = true;
						return async ({ update }) => {
							logoutEverywhereSubmitting = false;
							update();
						};
					}}
				>
					<Button submit={true} scheme="primary" spinner={logoutEverywhereSubmitting}
						>Überall abmelden</Button
					>
				</form>
			</div>
		</div>
	</div>

	<div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 md:grid-cols-3">
		<div>
			<h2 class="text-base font-semibold leading-7 text-gray-900">Konto löschen</h2>
			<p class="mt-1 text-sm leading-6 text-gray-700">
				Falls du {PUBLIC_SITE_NAME} nicht mehr verwenden möchtest, kannst du dein Konto hier löschen.
				Bitte beachte, dass dieser Vorgang nicht rückgängig gemacht werden kann und alle mit deinem Konto
				verbundenen Daten inklusive deiner Gruppen und den erhaltenen Feedbacks gelöscht werden.
			</p>
		</div>

		<form
			class="md:col-span-2"
			method="POST"
			action="?/delete_account"
			use:enhance={() => {
				deleteAccountSubmitting = true;
				return async ({ update }) => {
					deleteAccountSubmitting = false;
					update();
				};
			}}
		>
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
				<div class="col-span-full">
					<label for="delete_password" class="block text-sm font-medium leading-6 text-gray-900"
						>Dein Passwort</label
					>
					<div class="mt-2">
						<input
							id="delete_password"
							name="delete_password"
							type="password"
							autocomplete="current-password"
							disabled={deleteAccountSubmitting}
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</div>

			<div class="mt-8 flex">
				<Button submit={true} spinner={deleteAccountSubmitting} scheme="danger"
					>Konto löschen</Button
				>
			</div>
		</form>
	</div>
</div>
