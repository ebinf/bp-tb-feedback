<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/button.svelte';

	export let disabled: boolean = false;

	let formSubmitting: boolean = false;
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
				<div class="sm:col-span-4">
					<label for="name" class="block text-sm font-medium leading-6 text-gray-900"
						>Dein Name <span class="font-normal text-gray-500">(optional)</span></label
					>
					<div class="mt-2">
						<input
							id="name"
							name="name"
							type="text"
							autocomplete="name"
							maxlength="50"
							placeholder="Leer lassen für anonymes Feedback"
							disabled={disabled || formSubmitting}
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="about" class="block text-sm font-medium leading-6 text-gray-900"
						>Dein Feedback</label
					>
					<div class="mt-2">
						<textarea
							id="message"
							name="message"
							rows="5"
							required
							maxlength="20000"
							minlength="10"
							disabled={disabled || formSubmitting}
							aria-describedby="message-description"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
						/>
					</div>
					<p class="mt-2 text-sm text-gray-500" id="message-description">
						<span class="font-medium">Falls du noch Inspiration suchst:</span> Was läuft aus deiner Sicht
						gut, was schlecht? Worin könnte deine Gruppe noch Unterstützung gebrauchen? Gibt es ein akutes
						Problem?
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 flex items-center justify-end gap-x-6">
		<Button scheme="primary" submit={true} {disabled} spinner={formSubmitting}>Senden</Button>
	</div>
</form>
