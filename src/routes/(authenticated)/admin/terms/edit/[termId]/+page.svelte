<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/button.svelte';
	import Toast from '$lib/components/toast.svelte';
	import { classes } from 'svelte-transition-classes';
	import Modal from '$lib/components/modal.svelte';

	export let data;
	export let form;

	let editFormSubmitting: boolean = false;
	let deleteTermFormSubmitting: boolean = false;
	$: anyFormSubmitting = editFormSubmitting || deleteTermFormSubmitting;

	let deleteModalShown: boolean = false;
	let deleteForm: HTMLFormElement;
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
										Semester bearbeiten
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<a
											href="/admin/terms"
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
										<div>
											<label
												for="full_name"
												class="block text-sm font-medium leading-6 text-gray-900">Name</label
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
													value={data.term.name}
													class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
										<fieldset>
											<legend class="text-sm font-medium leading-6 text-gray-900">Aktiv</legend>
											<div class="space-y-5">
												<div class="relative flex items-start">
													<div class="flex h-6 items-center">
														<input
															id="active"
															name="active"
															type="checkbox"
															class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:checked:bg-gray-300"
															checked={data.term.active}
															disabled={anyFormSubmitting}
														/>
													</div>
													<div class="ml-3 text-sm leading-6">
														<label for="active" class=" text-gray-500"
															>Das Semester ist aktiv, es können Feedbacks entgegengenommen und
															Stimmungsbilder erstellt werden.</label
														>
													</div>
												</div>
											</div>
										</fieldset>
									</div>
									<div class="space-y-6 px-4 pb-5 pt-6 sm:space-y-4 sm:px-6">
										<dl class="space-y-6 sm:space-y-4">
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
													Gruppen
												</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
													{#if data.term.groups.length > 0}
														<table class="w-full">
															<tbody class="bg-white">
																{#each data.term.groups as group (group.id)}
																	<tr class="border-y border-gray-300">
																		<td
																			class="whitespace-nowrap py-2 pl-4 pr-1 text-sm font-medium text-gray-900 sm:pl-3"
																			>{group.number}</td
																		>
																		<td
																			class="truncate whitespace-nowrap px-3 py-2 text-sm text-gray-500"
																			>{group.name}</td
																		>
																		<td
																			class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-3"
																		>
																			<a
																				href="/admin/groups/edit/{group.id}"
																				class="text-primary-600 hover:text-primary-900"
																				>Bearbeiten</a
																			>
																		</td>
																	</tr>
																{/each}
															</tbody>
														</table>
													{:else}
														Keinen Gruppen zugeordnet
													{/if}
												</dd>
											</div>
										</dl>
										<Button
											class="sm:w-full"
											scheme="danger"
											disabled={anyFormSubmitting}
											spinner={deleteTermFormSubmitting}
											on:click={() => {
												deleteModalShown = true;
											}}>Semester löschen</Button
										>
									</div>
								</div>
							</div>
						</div>
						<div class="flex flex-shrink-0 justify-end px-4 py-4">
							<Button submit={false} href="/admin/terms" scheme="white" disabled={anyFormSubmitting}
								>Abbrechen</Button
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
		deleteTermFormSubmitting = true;
		return async ({ update }) => {
			update({ reset: false });
			deleteTermFormSubmitting = false;
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
	<span slot="title">Semester löschen</span>
	<span slot="content"
		><p class="mb-2">
			Du bist dabei, das Semester <span class="font-bold text-gray-900">{data.term.name}</span>
			zu löschen. <b>Dieser Vorgang kann nicht rückgängig gemacht werden!</b>
		</p>
		<p class="mb-2">
			{#if data.term.groups.length > 0}
				{#if data.term.groups.length == 1}
					Es wird dabei außerdem die folgende zugeordnete Gruppe inklusive aller Feedbacks und
					Stimmungsbilder <b>unwiederruflich gelöscht</b>:
				{:else}
					Es werden dabei außerdem die folgenden zugeordneten Gruppen inklusive aller Feedbacks und
					Stimmungsbilder <b>unwiederruflich gelöscht</b>:
				{/if}
				<ul class="my-1 ml-2 list-inside list-disc">
					{#each data.term.groups as group (group.id)}
						<li>
							<span class="font-medium text-gray-700">{group.number}</span>
							<span class="font-bold text-gray-900">{group.name}</span>
						</li>
					{/each}
				</ul>
				{#if data.term.groups.length == 1}
					Falls die Gruppe nicht gelöscht werden soll, weise sie zuerst einem anderen Semester zu.
				{:else}
					Falls die Gruppen nicht gelöscht werden sollen, weise sie zuerst einem anderen Semester
					zu.
				{/if}
			{:else}
				Dabei werden keine Gruppen gelöscht.
			{/if}
		</p>
		<p>Bist du sicher, dass du das Semester löschen willst?</p>
	</span>
	<span slot="action"
		>{#if data.term.groups.length > 0}Semester & {#if data.term.groups.length == 1}Gruppe{:else}Gruppen{/if}
			löschen{:else}Semester löschen{/if}</span
	>
</Modal>
