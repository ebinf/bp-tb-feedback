<script lang="ts">
	export let data;

	import { title, heading } from '../../stores';
	title.set(`Gruppe ${data?.group?.number}: ${data?.group?.name}`);
	heading.set(
		`<span class="text-gray-500 font-medium pr-3">${data?.group?.number} </span>${data?.group?.name}`
	);
</script>

<p class="text-gray-500">{data.group?.term?.name}</p>

<div class="border-b border-gray-200 pb-5 sm:pb-0">
	<div class="mt-3 sm:mt-4">
		<!-- Dropdown menu on small screens -->
		<div class="sm:hidden">
			<label for="current-tab" class="sr-only">Wähle einen Tab aus</label>
			<select
				id="current-tab"
				name="current-tab"
				class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
			>
				<option selected>Übersicht</option>
				<option>Feedback</option>
				<option>Stimmung</option>
			</select>
		</div>
		<!-- Tabs at small breakpoint and up -->
		<div class="hidden sm:block">
			<nav class="-mb-px flex space-x-8">
				<!-- Current: "border-primary-500 text-primary-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
				<a
					href="#"
					class="border-primary-500 text-primary-600 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
					aria-current="page">Übersicht</a
				>
				<a
					href="#"
					class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
					>Feedback</a
				>
				<a
					href="#"
					class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
					>Stimmung</a
				>
			</nav>
		</div>
	</div>
</div>

<div class="mt-4">
	<pre>{data}</pre>
</div>
