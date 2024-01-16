<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Table from './table.svelte';

	export let data;
</script>

<div class="sm:flex sm:items-center">
	<div class="sm:flex-auto">
		<h1 class="text-base font-semibold leading-6 text-gray-900">Gruppen</h1>
		<p class="mt-2 text-sm text-gray-700">
			Hier kannst du die Gruppen verwalten und neue anlegen. Du kannst sie einem Semester und einer
			Teambegleitung zuordnen.
		</p>
	</div>
	<div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
		<Button href="/admin/groups/create" scheme="primary"
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

			Gruppe hinzufügen</Button
		>
	</div>
</div>

<Table groups={data.groups}></Table>

<slot />
