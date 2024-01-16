<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/button.svelte';
	import Toast from '$lib/components/toast.svelte';
	import { classes } from 'svelte-transition-classes';
	import Modal from '$lib/components/modal.svelte';
	import { afterUpdate } from 'svelte';

	export let data;
	export let form;

	let editFormSubmitting: boolean = false;
	let resendWelcomeMailFormSubmitting: boolean = false;
	let deleteUserFormSubmitting: boolean = false;
	$: anyFormSubmitting =
		editFormSubmitting || resendWelcomeMailFormSubmitting || deleteUserFormSubmitting;

	let deleteModalShown: boolean = false;
	let deleteForm: HTMLFormElement;

	let selectedLead: string;
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
						action="?/edit"
						use:enhance={() => {
							editFormSubmitting = true;
							return async ({ update }) => {
								update({ reset: false });
								editFormSubmitting = false;
							};
						}}
					>
						<div class="h-0 flex-1 overflow-y-auto">
							<div class="bg-primary-600 px-4 py-6 sm:px-6">
								<div class="flex items-center justify-between">
									<h2 class="text-base font-semibold leading-6 text-white" id="slide-over-title">
										Gruppe bearbeiten
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<a
											href="/admin/groups"
											class="relative rounded-md bg-primary-600 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
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
								<div class="divide-y divide-gray-200">
									<div class="space-y-6 px-4 pb-5 pt-6 sm:px-6">
										{#if form?.error}
											<Toast style="fail">{form.error}</Toast>
										{/if}
										<div class="flex flex-row gap-4">
											<div class="shrink">
												<label
													for="number"
													class="block text-sm font-medium leading-6 text-gray-900">Nummer</label
												>
												<div class="group relative mt-2">
													<input
														type="number"
														name="number"
														id="number"
														min="0"
														max="9999"
														required
														disabled={anyFormSubmitting}
														value={data.group.number}
														class="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
											<div class="grow">
												<label for="name" class="block text-sm font-medium leading-6 text-gray-900"
													>Name</label
												>
												<div class="group relative mt-2">
													<input
														type="text"
														name="name"
														id="name"
														minlength="2"
														maxlength="255"
														required
														disabled={anyFormSubmitting}
														value={data.group.name}
														class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
										</div>
										<div>
											<label for="term" class="block text-sm font-medium leading-6 text-gray-900"
												>Semester</label
											>
											<div class="group relative mt-2">
												<select
													name="term"
													id="term"
													required
													disabled={anyFormSubmitting}
													class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
												>
													{#each data.terms as term (term.id)}
														<option
															value={term.id}
															class:italic={!term.active}
															class:text-gray-700={!term.active}
															selected={data.group.term_id == term.id}
															>{term.name}
															{#if !term.active}
																(nicht aktiv){/if}</option
														>
													{/each}
												</select>
											</div>
										</div>
										<div>
											<label for="lead" class="block text-sm font-medium leading-6 text-gray-900"
												>Teambegleitung</label
											>
											<div class="group relative mt-2">
												{#key data.group.lead_id}
													<select
														name="lead"
														id="lead"
														required
														disabled={anyFormSubmitting}
														bind:value={selectedLead}
														class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
													>
														{#each data.users as user (user.id)}
															<option value={user.id} selected={data.group.lead_id == user.id}
																>{user.full_name}
															</option>
														{/each}
													</select>
												{/key}
											</div>
										</div>
										<noscript>
											<fieldset class="mt-6">
												<legend class="text-sm font-medium leading-6 text-gray-900"
													>E-Mail an neue Teambegleitung senden</legend
												>
												<div class="space-y-5">
													<div class="relative flex items-start">
														<div class="flex h-6 items-center">
															<input
																id="send_mail"
																name="send_mail"
																type="checkbox"
																class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:checked:bg-gray-300"
																checked
																disabled={anyFormSubmitting}
															/>
														</div>
														<div class="ml-3 text-sm leading-6">
															<label for="send_mail" class=" text-gray-500"
																>Falls du diese Gruppe einer anderen Teambegleitung zuordnest als
																bisher, wird der neuen Teambegleitung eine E-Mail gesendet, in der
																sie über die neu zugeordnete Gruppe informiert wird. Falls du die
																Teambegleitung nicht änderst, wird auch keine E-Mail versendet.</label
															>
														</div>
													</div>
												</div>
											</fieldset>
										</noscript>
										{#if selectedLead != data.group.lead_id}
											<fieldset>
												<legend class="text-sm font-medium leading-6 text-gray-900"
													>E-Mail an neue Teambegleitung senden</legend
												>
												<div class="space-y-5">
													<div class="relative flex items-start">
														<div class="flex h-6 items-center">
															<input
																id="send_mail"
																name="send_mail"
																type="checkbox"
																class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:checked:bg-gray-300"
																checked
																disabled={anyFormSubmitting}
															/>
														</div>
														<div class="ml-3 text-sm leading-6">
															<label for="send_mail" class=" text-gray-500"
																>Der neuen Teambegleitung wird eine E-Mail gesendet, in der sie über
																die neu zugeordnete Gruppe informiert wird.</label
															>
														</div>
													</div>
												</div>
											</fieldset>
										{/if}
									</div>
									<div class="space-y-6 px-4 pb-5 pt-6 sm:space-y-4 sm:px-6">
										<dl class="space-y-6 sm:space-y-4">
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
													Feedbacks
												</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
													{#if data.feedbacks == 1}1 Feedback{:else}{data.feedbacks} Feedbacks{/if}
												</dd>
											</div>
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
													Stimmungsbilder
												</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
													{#if data.pollRounds == 1}1 Stimmungsbild{:else}{data.pollRounds} Stimmungsbilder{/if}
												</dd>
											</div>
										</dl>
										<Button
											class="sm:w-full"
											scheme="danger"
											disabled={anyFormSubmitting}
											spinner={deleteUserFormSubmitting}
											on:click={() => {
												deleteModalShown = true;
											}}>Gruppe löschen</Button
										>
									</div>
								</div>
							</div>
						</div>
						<div class="flex flex-shrink-0 justify-end px-4 py-4">
							<Button
								submit={false}
								href="/admin/groups"
								scheme="white"
								disabled={anyFormSubmitting}>Abbrechen</Button
							>
							<Button
								submit={true}
								spinner={editFormSubmitting}
								disabled={anyFormSubmitting}
								class="ml-4">Bearbeiten</Button
							>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<form
	method="POST"
	action="?/delete"
	bind:this={deleteForm}
	use:enhance={() => {
		deleteUserFormSubmitting = true;
		return async ({ update }) => {
			update({ reset: false });
			deleteUserFormSubmitting = false;
		};
	}}
></form>
<Modal
	style="danger"
	shown={deleteModalShown}
	on:cancelled={() => (deleteModalShown = false)}
	on:confirmed={() => {
		deleteModalShown = false;
		deleteForm.requestSubmit();
	}}
>
	<span slot="title">Gruppe löschen</span>
	<span slot="content"
		><p class="mb-2">
			Du bist dabei, die Gruppe <span class="font-medium text-gray-700">{data.group.number}</span>
			<span class="font-bold text-gray-900">{data.group.name}</span>
			zu löschen. <b>Dieser Vorgang kann nicht rückgängig gemacht werden!</b>
		</p>
		<p class="mb-2">
			Es werden dabei außerdem alle Feedbacks und Stimmungsbilder der Gruppe <b
				>unwiederruflich gelöscht</b
			>.
		</p>
		<p>Bist du sicher, dass du die Gruppe löschen willst?</p>
	</span>
	<span slot="action">Gruppe löschen</span>
</Modal>
