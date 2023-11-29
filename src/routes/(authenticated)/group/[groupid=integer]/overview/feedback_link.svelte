<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import type { PageData } from './$types';
	import Modal from '$lib/components/modal.svelte';
	import Button from '$lib/components/button.svelte';

	export let data: PageData;

	function shareOrCopy() {
		if (navigator.share) {
			navigator.share({
				title: 'Feedback-Link',
				text: `Sende deiner Gruppe diesen Link zu, um Feedback zu erhalten: ${PUBLIC_BASE_URL}/feedback/${data.group?.feedback_link}`,
				url: `${PUBLIC_BASE_URL}/feedback/${data.group?.feedback_link}`
			});
		} else {
			copiedText = true;
			setTimeout(() => {
				copiedText = false;
			}, 2000);
			navigator.clipboard.writeText(`${PUBLIC_BASE_URL}/feedback/${data.group?.feedback_link}`);
		}
	}

	let copiedText = false;

	let regenerateModal = false;
	let regenerateForm: HTMLFormElement;
	let formSubmitting: boolean = false;
</script>

<div class="rounded-lg bg-white shadow">
	<div class="px-4 py-5 sm:p-6">
		<h3 class="text-base font-semibold leading-6 text-gray-900">Feedback-Link</h3>
		<div class="mt-2 max-w-xl text-sm text-gray-500">
			<p>Sende deiner Gruppe diesen Link zu, um Feedback zu erhalten.</p>
		</div>
		<div class="mt-5 sm:flex sm:items-center sm:gap-x-3">
			{#if data?.group?.term.active}
				{#if data.group?.feedback_link}
					<div class="w-full sm:max-w-md">
						<label for="feedback_link" class="sr-only">Feedback-Link</label>
						<input
							type="text"
							readonly
							id="feedback_link"
							on:click={() => {
								navigator.clipboard.writeText(
									`${PUBLIC_BASE_URL}/feedback/${data.group?.feedback_link}`
								);
								copiedText = true;
								setTimeout(() => {
									copiedText = false;
								}, 2000);
							}}
							class="block w-full rounded-md border-0 bg-gray-50 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
							class:text-center={copiedText}
							class:font-medium={copiedText}
							value={copiedText
								? 'Kopiert!'
								: `${PUBLIC_BASE_URL}/feedback/${data.group?.feedback_link}`}
						/>
					</div>

					<Button scheme="primary" on:click={shareOrCopy}>Teilen</Button>

					<Button
						on:click={() => {
							regenerateModal = true;
						}}
						spinner={formSubmitting}
						scheme="secondary">Neu generieren</Button
					>
				{:else}
					<form
						method="POST"
						use:enhance={() => {
							formSubmitting = true;
							return async ({ update }) => {
								update();
								formSubmitting = false;
							};
						}}
						action="?/regenerate_feedback_link"
					>
						<Button spinner={formSubmitting} submit={true} scheme="primary">Link erzeugen</Button>
					</form>
				{/if}
			{:else}
				<span class="italic"
					>Das Semester dieser Gruppe ist nicht mehr aktiv. Du kannst daher kein Feedback mehr
					erhalten.</span
				>
			{/if}

			<form
				method="POST"
				action="?/regenerate_feedback_link"
				bind:this={regenerateForm}
				use:enhance={() => {
					formSubmitting = true;
					return async ({ update }) => {
						update();
						formSubmitting = false;
					};
				}}
			/>
			<Modal
				style="danger"
				shown={regenerateModal}
				on:cancelled={() => (regenerateModal = false)}
				on:confirmed={() => {
					regenerateModal = false;
					regenerateForm.requestSubmit();
				}}
			>
				<span slot="title">Feedback-Link neu erzeugen</span>
				<span slot="content"
					>Du bist dabei, den Feedback-Link für <span class="font-medium text-gray-700"
						>{data.group?.number}</span
					>&nbsp;<span class="font-bold text-gray-900">{data.group?.name}</span> neu zu erzeugen. Wenn
					du das tust, wird der alte Link ungültig und kann nicht mehr verwendet werden! Bist du sicher,
					dass du den Link neu erzeugen möchtest?</span
				>
				<span slot="action">Neu erzeugen</span>
			</Modal>
		</div>
	</div>
</div>
