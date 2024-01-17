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
		<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
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
