<script lang="ts">
	import Navbar from './navbar.svelte';
	import { title, heading } from './stores';

	export let data;
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<div class="min-h-full">
	<Navbar user_data={data} />
	<div class="py-10">
		<header>
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">
					{@html $heading}
				</h1>
			</div>
		</header>
		<main>
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<slot />
			</div>
		</main>
	</div>
</div>
