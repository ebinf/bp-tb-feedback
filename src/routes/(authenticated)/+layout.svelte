<script lang="ts">
	import Navbar from './navbar.svelte';

	export let data;
</script>

<div class="min-h-full">
	<Navbar user_data={data} />
	<div class="py-10">
		<header>
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
			</div>
		</header>
		<main>
			<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
				<slot />
			</div>
		</main>
	</div>
</div>
