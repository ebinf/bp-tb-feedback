<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/button.svelte';
	import Modal from '$lib/components/modal.svelte';

	export let edit_url: string;
	export let title: string;
	export let edited: Date;

	let deleteForm: HTMLFormElement;
	let deleteModalShown: boolean = false;
</script>

<div class="mt-8 lg:flex lg:items-center lg:justify-between">
	<div class="min-w-0 flex-1">
		<h2 class="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:tracking-tight">
			{title}
		</h2>
		<div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
			<div class="mt-2 flex items-center text-sm text-gray-500">
				<svg
					class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
						clip-rule="evenodd"
					/>
				</svg>
				Zuletzt bearbeitet {edited.toLocaleString()} Uhr
			</div>
		</div>
	</div>
	<div class="mt-5 flex lg:ml-4 lg:mt-0">
		<span>
			<Button scheme="secondary" on:click={() => (deleteModalShown = true)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" slot="icon">
					<path
						fill-rule="evenodd"
						d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
						clip-rule="evenodd"
					/>
				</svg>

				Löschen
			</Button>
		</span>

		<span class="ml-3">
			<Button scheme="primary" href={edit_url}>
				<svg slot="icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"
					/>
				</svg>
				Bearbeiten
			</Button>
		</span>
	</div>
</div>

<form method="POST" action="?/delete" bind:this={deleteForm} use:enhance></form>
<Modal
	style="danger"
	shown={deleteModalShown}
	on:cancelled={() => (deleteModalShown = false)}
	on:confirmed={() => {
		deleteModalShown = false;
		deleteForm.requestSubmit();
	}}
>
	<span slot="title">Notiz löschen</span>
	<span slot="content"
		><p class="mb-2">
			Du bist dabei, die Notiz
			<span class="font-bold text-gray-900">{title}</span>
			zu löschen. <b>Dieser Vorgang kann nicht rückgängig gemacht werden!</b>
		</p>
		<p>Bist du sicher, dass du die Notiz löschen willst?</p>
	</span>
	<span slot="action">Notiz löschen</span>
</Modal>
