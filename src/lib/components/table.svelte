<script lang="ts">
	export let columns: { key: string; title: string }[];
	export let rows: {
		highlight?: boolean;
		link?: string;
		data: Record<string, string>;
	}[] = [];
</script>

<div class="mt-8 flow-root">
	<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
			<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
				<table class="min-w-full divide-y divide-gray-300" data-sveltekit-preload-data="tap">
					<thead class="bg-gray-50">
						<tr>
							{#each columns as column, index}
								<th
									scope="col"
									class="py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900"
									class:sm:pl-6={index == 0}
									class:pl-4={index == 0}>{column.title}</th
								>
							{/each}
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 bg-white">
						{#each rows as row}
							<tr class="hover:bg-gray-50 focus-visible:bg-gray-100">
								{#each columns as column, index}
									<td
										class="relative p-0 text-sm text-gray-500"
										class:text-gray-900={row.highlight}
										class:font-medium={row.highlight}
									>
										{#if index == 0 && row.highlight}
											<div class="absolute inset-y-0 left-0 w-1 bg-gray-900"></div>
										{/if}
										{#if row.link}
											<a
												href={row.link}
												class="block w-full whitespace-nowrap py-4 pl-3 pr-3"
												class:sm:pl-6={index == 0}
												class:pl-4={index == 0}
											>
												{row.data[column.key]}
											</a>
										{:else}
											<span
												class="block w-full whitespace-nowrap py-4 pl-3 pr-3"
												class:sm:pl-6={index == 0}
												class:pl-4={index == 0}
											>
												{row.data[column.key]}
											</span>
										{/if}
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
