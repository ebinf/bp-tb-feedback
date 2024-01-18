<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/button.svelte';
	import Toast from '$lib/components/toast.svelte';
	import { marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';

	export let form;

	let preview: boolean = false;
	let content: string;

	let textArea: HTMLTextAreaElement;

	function typeInTextarea(newText: string) {
		const [start, end] = [textArea.selectionStart, textArea.selectionEnd];
		textArea.setRangeText(newText, start, end, 'select');
		textArea.focus();
	}

	let formSubmitting: boolean = false;
</script>

{#if form?.error}
	<Toast style="fail">{form.error}</Toast>
{/if}

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
	<div class="mb-6">
		<label for="title" class="block text-sm font-medium leading-6 text-gray-900">Titel</label>
		<div class="group relative mt-2">
			<input
				type="text"
				name="title"
				id="title"
				minlength="2"
				maxlength="255"
				required
				disabled={formSubmitting}
				class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600 sm:text-sm sm:leading-6"
			/>
		</div>
	</div>
	<div>
		<div class="flex items-center" aria-orientation="horizontal" role="tablist">
			<div class="border-b border-gray-200">
				<nav class="-mb-px flex space-x-8" aria-label="Tabs">
					<button
						type="button"
						on:click={() => (preview = false)}
						class="whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium {!preview
							? 'border-primary-500 text-primary-600'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
						>Schreiben</button
					>
					<button
						type="button"
						on:click={() => (preview = true)}
						class="whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium {preview
							? 'border-primary-500 text-primary-600'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
						>Vorschau</button
					>
				</nav>
			</div>

			{#if !preview}
				<div class="ml-auto flex items-center space-x-5">
					<div class="flex items-center">
						<button
							type="button"
							class="-m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
							on:click={() => typeInTextarea('[Beschreibung](https://)')}
						>
							<span class="sr-only">Link einfügen</span>
							<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path
									d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z"
								/>
								<path
									d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z"
								/>
							</svg>
						</button>
					</div>
					<div class="flex items-center">
						<button
							type="button"
							class="-m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
							on:click={() => typeInTextarea('\n```\ncode\n```\n')}
						>
							<span class="sr-only">Code einfügen</span>
							<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.377 2.011a.75.75 0 01.612.867l-2.5 14.5a.75.75 0 01-1.478-.255l2.5-14.5a.75.75 0 01.866-.612z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
					<div class="flex items-center">
						<button
							type="button"
							class="-m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
							on:click={() => typeInTextarea(' - Stichpunkt')}
						>
							<span class="sr-only">Liste einfügen</span>
							<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-5 w-5">
								<path
									fill-rule="evenodd"
									d="M6 4.75A.75.75 0 0 1 6.75 4h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 4.75ZM6 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 10Zm0 5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75ZM1.99 4.75a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 15.25a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 10a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1V10Z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>
			{/if}
		</div>
		<div class="mt-2">
			{#if preview}
				<div
					id="tabs-1-panel-2"
					class="-m-0.5 rounded-lg p-0.5"
					aria-labelledby="tabs-1-tab-2"
					role="tabpanel"
					tabindex="0"
				>
					<div class="border-b">
						<div class="prose prose-sm mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
							{#if content}
								{#await marked.parse(content)}
									<span class="text-sm italic">Lädt...</span>
								{:then mdcontent}
									{@html DOMPurify.sanitize(mdcontent)}
								{/await}
							{:else}
								<span class="text-sm italic">Dein Text wird dir hier angezeigt.</span>
							{/if}
						</div>
					</div>
				</div>
				<input type="hidden" name="note" value={content} />
			{:else}
				<div
					id="tabs-1-panel-1"
					class="-m-0.5 rounded-lg p-0.5"
					aria-labelledby="tabs-1-tab-1"
					role="tabpanel"
					tabindex="0"
				>
					<label for="note" class="sr-only">Notiz</label>
					<div>
						<textarea
							rows="15"
							name="note"
							id="note"
							required
							minlength="5"
							bind:this={textArea}
							bind:value={content}
							disabled={formSubmitting}
							class="block w-full rounded-md border-0 py-1.5 font-mono text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:bg-gray-50 disabled:text-gray-600"
							placeholder="Dein Text (Markdown erlaubt)"
						></textarea>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="mt-2 flex justify-end">
		<Button submit={true} spinner={formSubmitting} scheme="primary">Erstellen</Button>
	</div>
</form>
