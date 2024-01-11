<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/button.svelte';
	import Toast from '$lib/components/toast.svelte';
	import { classes } from 'svelte-transition-classes';

	export let form;

	let pollTitleFocus = false;
	let formSubmitting: boolean = false;
	let pollTitle: string = '';

	const suggestions = [
		'Wie bewertest du die Stimmung in deiner Gruppe?',
		'Wie findest du deine aktuelle Arbeitsbelastung?',
		'Wie zufrieden bist du mit deiner Zusammenarbeit mit der/dem AG(s)?',
		'Wie zufrieden bist du mit deiner Zusammenarbeit innerhalb der Gruppe?',
		'Wie bewertest du meine Unterstützung als TB?',
		'Wie gut funktioniert die Kommunikation in deiner Gruppe?',
		'Wie gut fühlst du dich auf die Abgabe vorbereitet?'
	];
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
										Neues Stimmungsbild
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<a
											class="relative rounded-md bg-primary-600 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
											href="../polls"
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
								<div class="mt-1">
									<p class="text-sm text-primary-50">
										Du kannst zum Beispiel eine spezielle Frage stellen oder die allgemeine Stimmung
										bewerten lassen. Bewertet wird zwischen <span class="font-semibold text-white"
											>0&nbsp;(schlecht)</span
										>
										und
										<span class="font-semibold text-white">5&nbsp;(gut)</span>.
									</p>
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
												for="question"
												class="block text-sm font-medium leading-6 text-gray-900"
												>Fragestellung</label
											>
											<div class="group relative mt-2">
												<textarea
													rows="2"
													name="question"
													id="question"
													bind:value={pollTitle}
													on:focus={() => {
														pollTitleFocus = true;
													}}
													on:blur={() => {
														setTimeout(() => {
															pollTitleFocus = false;
														}, 500);
													}}
													minlength="5"
													maxlength="255"
													required
													disabled={formSubmitting}
													class="block w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
												/>
												{#if pollTitleFocus && !formSubmitting}
													<div
														class="absolute -left-6 -right-2 z-10 overflow-hidden bg-white py-2 pl-6 pr-2"
														in:classes={{
															base: 'transform transition ease-in-out duration-200',
															from: 'opacity-0 scale-95',
															to: 'opacity-100 scale-100'
														}}
														out:classes={{
															base: 'transform transition ease-in-out duration-200',
															from: 'opacity-100 scale-100',
															to: 'opacity-0 scale-95'
														}}
													>
														<span class="mb-2 block text-sm font-medium leading-6 text-gray-900"
															>Vorschläge</span
														>
														<fieldset>
															<div class="grid grid-cols-1 gap-y-2">
																{#each suggestions as suggestion, i}
																	<label
																		class="{pollTitle === suggestion
																			? 'border-primary-600 ring-2 ring-primary-600'
																			: 'border-gray-300'} relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
																	>
																		<input
																			type="radio"
																			name="suggestions"
																			value={suggestion}
																			class="sr-only"
																			id="suggestion-{i}"
																			aria-labelledby="suggestion-{i}-label"
																			on:change={() => {
																				pollTitle = suggestion;
																			}}
																			disabled={formSubmitting}
																		/>
																		<span class="flex flex-1">
																			<span class="flex flex-col">
																				<label
																					id="suggestion-{i}-label"
																					for="suggestion-{i}"
																					class="flex items-center text-sm text-gray-800"
																					>{suggestion}</label
																				>
																			</span>
																		</span>
																		<svg
																			class:invisible={pollTitle !== suggestion}
																			class="h-5 w-5 text-primary-600"
																			viewBox="0 0 20 20"
																			fill="currentColor"
																			aria-hidden="true"
																		>
																			<path
																				fill-rule="evenodd"
																				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
																				clip-rule="evenodd"
																			/>
																		</svg>
																		<span
																			class:border-2={pollTitle === suggestion}
																			class:border-primary-600={pollTitle === suggestion}
																			class:border-transparent={pollTitle !== suggestion}
																			class="pointer-events-none absolute -inset-px rounded-lg border-2"
																			aria-hidden="true"
																		></span>
																	</label>
																{/each}
															</div>
														</fieldset>
													</div>
												{/if}
											</div>
										</div>
										<fieldset>
											<legend class="text-sm font-medium leading-6 text-gray-900">Zugriff</legend>
											<div class="mt-2 space-y-4">
												<div class="relative flex items-start">
													<div class="absolute flex h-6 items-center">
														<input
															id="state-closed"
															name="state"
															aria-describedby="state-closed-description"
															type="radio"
															class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:checked:bg-gray-300"
															value="closed"
															disabled={formSubmitting}
															required
															checked
														/>
													</div>
													<div class="pl-7 text-sm leading-6">
														<label for="state-closed" class="font-medium text-gray-900"
															>Geschlossen</label
														>
														<p id="state-closed-description" class="text-gray-500">
															Es kann aber erst abgestimmt werden, sobald du die Abstimmung öffnest.
														</p>
													</div>
												</div>
												<div>
													<div class="relative flex items-start">
														<div class="absolute flex h-6 items-center">
															<input
																id="state-open"
																name="state"
																aria-describedby="state-open-description"
																type="radio"
																class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:checked:bg-gray-300"
																disabled={formSubmitting}
																value="open"
															/>
														</div>
														<div class="pl-7 text-sm leading-6">
															<label for="state-open" class="font-medium text-gray-900"
																>Geöffnet</label
															>
															<p id="state-open-description" class="text-gray-500">
																Mit dem Link können sofort Stimmen abgegeben werden.
															</p>
														</div>
													</div>
												</div>
											</div>
										</fieldset>
										<fieldset>
											<legend class="text-sm font-medium leading-6 text-gray-900"
												>Automatisch schließen</legend
											>
											<div class="space-y-5">
												<div class="relative flex items-start">
													<div class="flex h-6 items-center">
														<input
															id="autoclose"
															name="autoclose"
															type="checkbox"
															class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:checked:bg-gray-300"
															disabled={formSubmitting}
															checked
														/>
													</div>
													<div class="ml-3 text-sm leading-6">
														<label for="autoclose" class=" text-gray-500"
															>Das Stimmungsbild wird automatisch geschlossen, sobald fünf Stimmen
															abgegeben wurden. Du kannst es jederzeit wieder öffnen.</label
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
							<Button submit={false} scheme="white" href="../polls">Abbrechen</Button>
							<Button submit={true} spinner={formSubmitting} class="ml-4">Erstellen</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
