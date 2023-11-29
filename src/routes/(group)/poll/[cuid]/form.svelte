<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/button.svelte';

	export let disabled: boolean = false;

	let formSubmitting: boolean = false;
	let vote: number;
</script>

<form
	method="POST"
	use:enhance={() => {
		formSubmitting = true;
		return async ({ update }) => {
			update({ reset: false });
			formSubmitting = false;
		};
	}}
>
	<div class="space-y-12">
		<div>
			<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="col-span-full">
					<label for="vote" class="block text-sm font-medium leading-6 text-gray-900"
						>Bewertung</label
					>
					<div class="flex items-baseline gap-3">
						<span class="text-sm font-medium text-gray-500">schlecht</span>
						<fieldset class="mt-2 grow">
							<legend class="sr-only">Bitte bewerte von 0 (schlecht) bis 5 (gut)</legend>
							<div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
								{#each { length: 6 } as _, i}
									<label
										class="{vote === i
											? `bg-primary-600 text-white ${
													disabled || formSubmitting ? 'opacity-80' : 'hover:bg-primary-500'
											  }`
											: `text-gray-90 ring-1 ring-inset ring-gray-300 ${
													disabled || formSubmitting ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
											  }`} flex cursor-pointer items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase ring-offset-2 focus-within:ring-2 focus-within:ring-primary-600 focus:outline-none sm:flex-1"
									>
										<input
											type="radio"
											name="vote"
											value={i}
											class="sr-only"
											aria-labelledby="vote-{i}-label"
											checked={vote === i}
											disabled={disabled || formSubmitting}
											required
											on:change={() => {
												vote = i;
											}}
										/>
										<span id="vote-{i}-label">{i}</span>
									</label>
								{/each}
							</div>
						</fieldset>
						<span class="mb-3 self-end text-sm font-medium text-gray-500 sm:mb-0 sm:self-auto"
							>gut</span
						>
					</div>
				</div>
				<div class="col-span-full">
					<label for="comment" class="block text-sm font-medium leading-6 text-gray-900"
						>Kommentar <span class="font-normal text-gray-500">(optional)</span></label
					>
					<div class="mt-2">
						<textarea
							id="comment"
							name="comment"
							rows="2"
							maxlength="2000"
							minlength="3"
							disabled={disabled || formSubmitting}
							aria-describedby="message-description"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 flex items-center justify-end gap-x-6">
		<Button scheme="primary" submit={true} {disabled} spinner={formSubmitting}>Senden</Button>
	</div>
</form>
