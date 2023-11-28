<div class="my-8 animate-pulse">
	<span class="block w-40 h-4 rounded bg-gray-200" />
	<ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
		{#each { length: 3 } as _}
			<li class="col-span-1 flex rounded-md shadow-sm">
				<div
					class="flex h-14 w-16 flex-shrink-0 items-center justify-center bg-gray-200 rounded-l-md text-lg font-medium text-white"
				/>
				<div
					class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-gray-100"
				/>
			</li>
		{/each}
	</ul>
</div>
