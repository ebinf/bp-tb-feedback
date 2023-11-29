<script lang="ts">
	import { goto } from '$app/navigation';

	export let polls: {
		id: number;
		group_id: number;
		question: string | null;
		created: Date;
		open: boolean;
		_count: {
			votes: number;
		};
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
								>Erstellt</th
							>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>Fragestellung</th
							>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>Stimmen</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 bg-white">
						{#each polls as poll}
							<tr
								class="cursor-pointer hover:bg-gray-50 focus-visible:bg-gray-100"
								role="link"
								tabindex="0"
								on:keydown={(e) => {
									if (e.key === 'Enter') goto(`/group/${poll.group_id}/polls/${poll.id}`);
								}}
								on:click={() => goto(`/group/${poll.group_id}/polls/${poll.id}`)}
							>
								<td
									class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
									class:text-gray-900={poll.open}
									class:font-medium={poll.open}
									><a href="/group/{poll.group_id}/polls/{poll.id}">
										{poll.created.toLocaleString()} Uhr
									</a>
								</td>
								<td
									class="max-w-3xl truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500"
									class:text-gray-900={poll.open}
									class:font-medium={poll.open}
									><a href="/group/{poll.group_id}/polls/{poll.id}">{poll.question}</a></td
								>
								<td
									class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
									class:text-gray-900={poll.open}
									class:font-medium={poll.open}
									><a href="/group/{poll.group_id}/polls/{poll.id}">{poll._count.votes}</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
