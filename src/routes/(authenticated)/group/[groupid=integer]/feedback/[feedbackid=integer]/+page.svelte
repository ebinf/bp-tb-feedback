<script lang="ts">
	import { afterNavigate, invalidate, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	afterNavigate(() => {
		invalidateAll();
	});
</script>

<div class="overflow-hidden bg-white shadow sm:rounded-lg">
	<div class="px-4 py-6 sm:px-6">
		<h3 class="text-base font-semibold leading-7 text-gray-900">Feedback</h3>
		<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Daten des abgesendeten Formulars:</p>
	</div>
	<div class="border-t border-gray-100">
		<dl class="divide-y divide-gray-100">
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt class="text-sm font-medium text-gray-900">Name</dt>
				<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
					{#if data.feedback_details?.name}{data.feedback_details.name}{:else}<span class="italic"
							>Anonym</span
						>{/if}
				</dd>
			</div>
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt class="text-sm font-medium text-gray-900">Abgesendet</dt>
				<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
					{data.feedback_details?.timestamp.toLocaleString()} Uhr
				</dd>
			</div>
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt class="text-sm font-medium text-gray-900">
					Gelesen <span class="font-normal text-gray-700">(von dir)</span>
				</dt>
				<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
					{#if data.feedback_details?.read}{data.feedback_details.read.toLocaleString()} Uhr{:else}<div
							class="h-2 w-32 bg-gray-300 rounded animate-pulse"
						/>{/if}
				</dd>
			</div>
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt class="text-sm font-medium text-gray-900">Nachricht</dt>
				<dd class="grow mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 leading-loose">
					{#each data.feedback_details?.feedback.split('\n') as line}
						<p class="mb-2">{line}</p>
					{/each}
				</dd>
			</div>
		</dl>
	</div>
</div>
