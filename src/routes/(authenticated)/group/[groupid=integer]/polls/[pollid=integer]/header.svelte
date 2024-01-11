<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import Button from '$lib/components/button.svelte';
	import type { PollRound, Vote } from '@prisma/client';

	export let poll: PollRound & { votes: Vote[] };
	export let votes: Vote[];
	export let comments: Vote[];

	let copiedText = false;

	function shareOrCopy() {
		if (navigator.share) {
			navigator.share({
				title: poll.question,
				text: `${poll.question} Hier am Stimmungsbild teilnehmen:`,
				url: `${PUBLIC_BASE_URL}/poll/${poll.link}`
			});
		} else {
			copiedText = true;
			setTimeout(() => {
				copiedText = false;
			}, 2000);
			navigator.clipboard.writeText(`${PUBLIC_BASE_URL}/poll/${poll.link}`);
		}
	}
</script>

<div class="mt-8 lg:flex lg:items-center lg:justify-between">
	<div class="min-w-0 flex-1">
		<h2 class="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:tracking-tight">
			{poll.question}
		</h2>
		<div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
			<div class="mt-2 flex items-center text-sm text-gray-500">
				{#if poll.open}
					<svg
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M14.5 1A4.5 4.5 0 0010 5.5V9H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1.5V5.5a3 3 0 116 0v2.75a.75.75 0 001.5 0V5.5A4.5 4.5 0 0014.5 1z"
							clip-rule="evenodd"
						/>
					</svg>
					Offen
				{:else}
					<svg
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
							clip-rule="evenodd"
						/>
					</svg>
					Geschlossen
				{/if}
			</div>
			<div class="mt-2 flex items-center text-sm text-gray-500">
				<svg
					class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z"
					/>
				</svg>
				{#if votes.length == 0}Keine Stimmen{:else if votes.length == 1}1 Stimme{:else}{votes.length}
					Stimmen{/if}
			</div>
			<div class="mt-2 flex items-center text-sm text-gray-500">
				<svg
					class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M3.43 2.524A41.29 41.29 0 0110 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.102 41.102 0 01-3.55.414c-.28.02-.521.18-.643.413l-1.712 3.293a.75.75 0 01-1.33 0l-1.713-3.293a.783.783 0 00-.642-.413 41.108 41.108 0 01-3.55-.414C1.993 13.245 1 11.986 1 10.574V5.426c0-1.413.993-2.67 2.43-2.902z"
						clip-rule="evenodd"
					/>
				</svg>
				{#if comments.length == 0}Keine Kommentare{:else if comments.length == 1}1 Kommentar{:else}{comments.length}
					Kommentare{/if}
			</div>
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
				Erstellt am {poll.created.toLocaleString()} Uhr
			</div>
		</div>
	</div>
	<div class="mt-5 flex lg:ml-4 lg:mt-0">
		<span>
			<Button scheme="secondary" href="{poll.id}/edit">
				<svg slot="icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"
					/>
				</svg>
				Bearbeiten
			</Button>
		</span>

		<span class="ml-3">
			<Button scheme="secondary" on:click={shareOrCopy}>
				<svg slot="icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z"
					/>
					<path
						d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z"
					/>
				</svg>
				{#if copiedText}Link kopiert!{:else}Teilen{/if}
			</Button>
		</span>

		<span class="ml-3">
			{#if poll.open}
				<form method="POST" action="?/close" use:enhance>
					<Button scheme="primary" submit={true}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							slot="icon"
						>
							<path
								fill-rule="evenodd"
								d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
								clip-rule="evenodd"
							/>
						</svg>

						Schließen
					</Button>
				</form>
			{:else}
				<form method="POST" action="?/open" use:enhance>
					<Button scheme="primary" submit={true}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							slot="icon"
						>
							<path
								fill-rule="evenodd"
								d="M14.5 1A4.5 4.5 0 0010 5.5V9H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1.5V5.5a3 3 0 116 0v2.75a.75.75 0 001.5 0V5.5A4.5 4.5 0 0014.5 1z"
								clip-rule="evenodd"
							/>
						</svg>

						Öffnen
					</Button>
				</form>
			{/if}
		</span>
	</div>
</div>
