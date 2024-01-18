<script lang="ts">
	export let createLink: string;
	export let active: boolean = false;
</script>

<div class="mt-8 flow-root rounded-lg bg-white px-4 py-12 text-center shadow">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		class="mx-auto h-12 w-12 text-gray-400"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
		/>
	</svg>

	<h3 class="mt-2 text-sm font-semibold text-gray-900">
		{#if active}Bisher keine Notizen{:else}Keine Notizen{/if}
	</h3>
	<p class="mt-1 text-sm text-gray-500">
		{#if active}
			Du hast noch keine Notizen erstellt. <a
				class="font-medium underline hover:text-gray-600"
				href={createLink}>Erstelle eine neue</a
			> und schreib alles auf, was du nicht vergessen willst.
		{:else}
			Du hast keine Notizen erstellt.
		{/if}
	</p>
</div>
