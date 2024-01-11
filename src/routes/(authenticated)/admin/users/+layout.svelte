<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Table from './table.svelte';

	export let data;
</script>

<div class="sm:flex sm:items-center">
	<div class="sm:flex-auto">
		<h1 class="text-base font-semibold leading-6 text-gray-900">Nutzer:innen</h1>
		<p class="mt-2 text-sm text-gray-700">
			Hier kannst du die Nutzerinnen und Nutzer verwalten und neue anlegen. Nutzer:innen können
			sowohl Teambegleitungen sein, als auch Administrator:innen.
		</p>
	</div>
	<div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
		<Button href="/admin/users/create" scheme="primary"
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

			Nutzer:in hinzufügen</Button
		>
	</div>
</div>

<Table users={data.users}></Table>

<slot />
