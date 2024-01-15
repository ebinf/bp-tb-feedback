<script lang="ts">
	import type { Prisma, User } from '@prisma/client';

	export let users: Prisma.UserGetPayload<{
		include: {
			Group: true;
		};
	}>[];

	let editSlideOverShown = false;
	let editUser: Prisma.UserGetPayload<{
		include: {
			Group: true;
		};
	}>;
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
								>E-Mail-Adresse</th
							>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>Rolle</th
							>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>Gruppen</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 bg-white">
						{#each users as user (user.id)}
							<tr class="hover:bg-gray-50 focus-visible:bg-gray-100">
								<td class="p-0 text-sm text-gray-500"
									><a
										href="/admin/users/edit/{user.id}"
										class="block w-full whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6"
									>
										{user.full_name}
									</a>
								</td>
								<td class="max-w-3xl p-0 text-sm text-gray-500"
									><a
										href="/admin/users/edit/{user.id}"
										class="block w-full truncate whitespace-nowrap px-3 py-4">{user.email}</a
									></td
								>
								<td class="max-w-3xl p-0 text-sm text-gray-500"
									><a
										href="/admin/users/edit/{user.id}"
										class="block w-full truncate whitespace-nowrap px-3 py-4"
										>{user.admin ? 'Administrator:in' : 'Teambegleiter:in'}</a
									></td
								>
								<td class="p-0 text-sm text-gray-500"
									><a
										href="/admin/users/edit/{user.id}"
										class="block w-full whitespace-nowrap px-3 py-4"
										>{user._count.Group}
										{user._count.Group === 1 ? 'Gruppe' : 'Gruppen'}</a
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
