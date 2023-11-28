<script lang="ts">
	import { goto } from '$app/navigation';

	export let data: {
		id: number;
		group_id: number;
		feedback: string;
		timestamp: Date;
		name: string | null;
		read: Date | null;
	}[];
</script>

<div class="mt-8 flow-root">
	<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
			<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
				<table class="min-w-full divide-y divide-gray-300" data-sveltekit-preload-data="tap">
					<thead class="bg-gray-50">
						<tr>
							<th
								scope="col"
								class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
								>Name</th
							>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>Datum</th
							>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>Nachricht</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 bg-white">
						{#each data as feedback}
							<tr
								class="cursor-pointer hover:bg-gray-50 focus-visible:bg-gray-100"
								role="link"
								tabindex="0"
								on:keydown={(e) => {
									if (e.key === 'Enter')
										goto(`/group/${feedback.group_id}/feedback/${feedback.id}`);
								}}
								on:click={() => goto(`/group/${feedback.group_id}/feedback/${feedback.id}`)}
							>
								<td
									class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
									class:text-gray-900={feedback.read === null}
									class:font-medium={feedback.read === null}
									><a href="/group/{feedback.group_id}/feedback/{feedback.id}">
										{#if feedback.name}{feedback?.name}{:else}<span class="italic">Anonym</span
											>{/if}
									</a>
								</td>
								<td
									class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
									class:text-gray-900={feedback.read === null}
									class:font-medium={feedback.read === null}
									><a href="/group/{feedback.group_id}/feedback/{feedback.id}">
										{feedback.timestamp.toLocaleString()} Uhr
									</a>
								</td>
								<td
									class="max-w-3xl truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500"
									class:text-gray-900={feedback.read === null}
									class:font-medium={feedback.read === null}
									><a href="/group/{feedback.group_id}/feedback/{feedback.id}"
										>{feedback.feedback}</a
									></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
