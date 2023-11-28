<script lang="ts">
	export let data: {
		link_created: Boolean;
	};
</script>

<div class="text-center py-12 mt-8 flow-root shadow bg-white sm:rounded-lg">
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
			d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
		/>
	</svg>

	<h3 class="mt-2 text-sm font-semibold text-gray-900">Bisher kein Feedback</h3>
	<p class="mt-1 text-sm text-gray-500">
		{#if data.link_created}
			Bislang hat die Gruppe dir kein Feedback gegeben. Bitte warte noch einen Moment ab und stelle
			sicher, dass du der Gruppe <a
				href="overview"
				class="underline font-medium hover:text-gray-600">den aktuellen Link</a
			> mitgeteilt hat.
		{:else}
			Die Gruppe hat dir noch kein Feedback gegeben. Bitte <a
				href="overview"
				class="underline font-medium hover:text-gray-600">generiere einen Link</a
			> und teile ihn der Gruppe mit.
		{/if}
	</p>
</div>
