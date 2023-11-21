<script lang="ts">
	import { title } from './store';
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<div class="h-full bg-gray-100 flex">
	<div
		class="bg-white m-auto p-6 h-full sm:h-auto md:rounded shadow w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4"
	>
		<slot />
	</div>
</div>
