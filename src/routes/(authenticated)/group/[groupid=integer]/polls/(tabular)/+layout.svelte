<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Empty from './empty.svelte';
	import Table from './table.svelte';

	export let data;
</script>

<div class="sm:flex sm:items-center">
	<div class="sm:flex-auto">
		<h1 class="text-base font-semibold leading-6 text-gray-900">Stimmung</h1>
		<p class="mt-2 text-sm text-gray-700">
			Hier kannst von der Gruppe Stimmungsbilder einholen. Du kannst dabei eine spezielle Frage
			stellen oder die allgemeine Stimmung bewerten lassen.
		</p>
	</div>
	<div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
		<Button href="/group/{data.group?.id}/polls/create"
			><svg
				slot="icon"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>

			Neue Runde</Button
		>
	</div>
</div>

{#if data?.polls?.length}
	<Table polls={data.polls} />
{:else}
	<Empty createLink="/group/{data.group?.id}/polls/create" />
{/if}

<slot />
