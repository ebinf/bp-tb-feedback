<script lang="ts">
	import Toast from '$lib/components/toast.svelte';
	import Form from './form.svelte';
	import Sidebar from '../../sidebar.svelte';

	export let data;
	export let form;
</script>

<svelte:head>
	<title>Feedback {data.group.number}: {data.group.name}</title>
</svelte:head>

<main>
	<header class="relative isolate border-b border-gray-200 bg-white">
		<div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
			<div
				class="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80"
			>
				<div
					class="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-primary-800 to-primary-500"
					style="clip-path: polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)"
				/>
			</div>
			<div class="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
		</div>

		<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
			<div
				class="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none"
			>
				<div class="flex items-center gap-x-6">
					<div
						class="hidden h-16 w-16 flex-none items-center justify-center rounded-full text-primary-600 ring-1 ring-gray-900/10 sm:flex"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="h-10 w-10"
						>
							<path
								fill-rule="evenodd"
								d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
								clip-rule="evenodd"
							/>
							<path
								d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z"
							/>
						</svg>
					</div>

					<h1>
						<div class="text-sm leading-6 text-gray-500">
							Gruppe <span class="text-gray-700">{data.group.number}</span>
						</div>
						<div class="mt-1 text-base font-semibold leading-6 text-gray-900">
							{data.group.name}
						</div>
					</h1>
				</div>
			</div>
		</div>
	</header>

	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
		>
			<div
				class="-mx-4 bg-white px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-8 xl:py-8"
			>
				{#if form?.error}
					<div class="mb-6">
						<Toast dismissable={true} style="fail">{form.error}</Toast>
					</div>
				{:else if form?.success}
					<div class="mb-6">
						<Toast dismissable={false} style="success">{form.success}</Toast>
					</div>
				{/if}
				<Form disabled={!!form?.success} />
			</div>

			<Sidebar lead_name={data.group?.lead?.full_name} />
		</div>
	</div>
</main>
