<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import Button from '$lib/components/button.svelte';
	import Empty from './empty.svelte';
	import Table from './table.svelte';

	export let data;

	let copiedText = false;

	function shareOrCopy() {
		if (navigator.share) {
			navigator.share({
				title: 'Feedback an eure Teambegleitung',
				text: 'Ich freue mich über euer Feedback! Hier könnt ihr es abgeben, anonym und sicher:',
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
</script>

<div class="sm:flex sm:items-center">
	<div class="sm:flex-auto">
		<h1 class="text-base font-semibold leading-6 text-gray-900">Feedback</h1>
		<p class="mt-2 text-sm text-gray-700">
			Hier erscheint das Feedback, das die Gruppe dir über ihren Link gegeben hat. Teile den Link
			mit der Gruppe, um Feedback zu erhalten.
		</p>
	</div>
	<div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
		{#if data.group?.feedback_link?.length}
			<Button on:click={shareOrCopy}
				><svg
					slot="icon"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
					/>
				</svg>
				{#if copiedText}Link kopiert!{:else}Link teilen{/if}</Button
			>
		{:else}
			<form method="POST" action="./overview?/regenerate_feedback_link">
				<Button submit={true}>
					<svg
						slot="icon"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
						/>
					</svg>
					Link erzeugen</Button
				>
			</form>
		{/if}
	</div>
</div>

{#if data.feedback?.length}
	<Table data={data.feedback} />
{:else}
	<Empty data={{ link_created: !!data.group?.feedback_link?.length }} />
{/if}
