<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/button.svelte';
	import Toast from '$lib/components/toast.svelte';
	import { createEventDispatcher } from 'svelte';
	import { classes } from 'svelte-transition-classes';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let formSubmitting: boolean = false;
</script>

<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
	<div
		class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
		in:classes={{
			base: 'ease-in-out duration-500',
			from: 'opacity-0',
			to: 'opacity-100'
		}}
		out:classes={{
			base: 'ease-in-out duration-500',
			from: 'opacity-100',
			to: 'opacity-0'
		}}
	></div>

	<div class="fixed inset-0 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
				<div
					class="pointer-events-auto w-screen max-w-md"
					in:classes={{
						base: 'transform transition ease-in-out duration-500 sm:duration-700',
						from: 'translate-x-full',
						to: 'translate-x-0'
					}}
					out:classes={{
						base: 'transform transition ease-in-out duration-500 sm:duration-700',
						from: 'translate-x-0',
						to: 'translate-x-full'
					}}
				>
					<form
						class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
						method="POST"
						use:enhance={() => {
							formSubmitting = true;
							return async ({ update }) => {
								update({ reset: false });
								formSubmitting = false;
							};
						}}
					>
						<div class="h-0 flex-1 overflow-y-auto">
							<div class="bg-primary-600 px-4 py-6 sm:px-6">
								<div class="flex items-center justify-between">
									<h2 class="text-base font-semibold leading-6 text-white" id="slide-over-title">
										Nutzer:in hinzufügen
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<a
											class="relative rounded-md bg-primary-600 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
											href="/admin/users"
										>
											<span class="absolute -inset-2.5"></span>
											<span class="sr-only">Panel schließen</span>
											<svg
												class="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</a>
									</div>
								</div>
							</div>
							<div class="flex flex-1 flex-col justify-between">
								<div class="divide-y divide-gray-200 px-4 sm:px-6">
									<div class="space-y-6 pb-5 pt-6">
										{#if form?.error}
											<Toast style="fail">{form.error}</Toast>
										{/if}
										<div>
											<label
												for="full_name"
												class="block text-sm font-medium leading-6 text-gray-900"
												>Vollständiger Name</label
											>
											<div class="group relative mt-2">
												<input
													type="text"
													name="full_name"
													id="full_name"
													minlength="5"
													maxlength="255"
													required
													disabled={formSubmitting}
													class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
										<div>
											<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
												>E-Mail-Adresse</label
											>
											<div class="group relative mt-2">
												<input
													type="email"
													name="email"
													id="email"
													required
													disabled={formSubmitting}
													class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
										<fieldset>
											<legend class="text-sm font-medium leading-6 text-gray-900"
												>Willkommens-E-Mail senden</legend
											>
											<div class="space-y-5">
												<div class="relative flex items-start">
													<div class="flex h-6 items-center">
														<input
															id="send_welcome_mail"
															name="send_welcome_mail"
															type="checkbox"
															class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:checked:bg-gray-300"
															checked
															disabled={formSubmitting}
														/>
													</div>
													<div class="ml-3 text-sm leading-6">
														<label for="send_welcome_mail" class=" text-gray-500"
															>Der Nutzerin beziehungsweise dem Nutzer wird eine Willkommens-E-Mail
															zugesendet. Darin befindet sich ein Link, um ein Passwort festzulegen. <br
															/>
															Falls keine Willkommens-E-Mail gesendet werden soll, muss das Passwort
															über die "Passwort vergessen?"-Funktion auf der Login-Seite festgelegt
															werden.</label
														>
													</div>
												</div>
											</div>
										</fieldset>
										<fieldset>
											<legend class="text-sm font-medium leading-6 text-gray-900"
												>Administrationsrechte</legend
											>
											<div class="space-y-5">
												<div class="relative flex items-start">
													<div class="flex h-6 items-center">
														<input
															id="admin"
															name="admin"
															type="checkbox"
															class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:checked:bg-gray-300"
															disabled={formSubmitting}
														/>
													</div>
													<div class="ml-3 text-sm leading-6">
														<label for="admin" class=" text-gray-500"
															>Die Nutzerin beziehungsweise der Nutzer bekommt Zugriff auf den
															Verwaltungsbereich und kann Semester, Gruppen und Nutzer:innen anlegen
															und bearbeiten.</label
														>
													</div>
												</div>
											</div>
										</fieldset>
									</div>
								</div>
							</div>
						</div>
						<div class="flex flex-shrink-0 justify-end px-4 py-4">
							<Button submit={false} scheme="white" disabled={formSubmitting} href="/admin/users"
								>Abbrechen</Button
							>
							<Button submit={true} spinner={formSubmitting} class="ml-4">Erstellen</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
