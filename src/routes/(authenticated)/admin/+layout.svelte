<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { title, heading } from '../stores';

	export let data;

	$: tabs = [
		{
			name: 'Übersicht',
			href: `/admin/overview`
		},
		{
			name: 'Semester',
			href: `/admin/terms`,
			badge: data.terms,
			active: ['/(authenticated)/admin/terms/edit/[termId]', '/(authenticated)/admin/terms/create']
		},
		{
			name: 'Nutzer:innen',
			href: `/admin/users`,
			badge: data.users,
			active: ['/(authenticated)/admin/users/edit/[userId]', '/(authenticated)/admin/users/create']
		},
		{
			name: 'Gruppen',
			href: `/admin/groups`,
			badge: data.groups,
			active: [
				'/(authenticated)/admin/groups/edit/[groupId]',
				'/(authenticated)/admin/groups/create'
			]
		}
	];

	let mobileMenu: HTMLSelectElement;

	title.set('Verwaltung');
	heading.set('Verwaltung');
</script>

<div class="border-b border-gray-200 pb-5 sm:pb-0">
	<div class="mt-3 sm:mt-4">
		<!-- Dropdown menu on small screens -->
		<div class="sm:hidden">
			<label for="current-tab" class="sr-only">Wähle einen Tab aus</label>
			<select
				id="current-tab"
				name="current-tab"
				class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
				bind:this={mobileMenu}
				on:change={() => goto(mobileMenu.value)}
			>
				{#each tabs as tab}
					<option
						selected={$page.url.pathname === tab.href ||
							tab.active?.includes($page.route?.id ?? '')}
						value={tab.href}
						>{tab.name}
						{#if tab.badge}({tab.badge})
						{/if}
					</option>
				{/each}
			</select>
		</div>
		<!-- Tabs at small breakpoint and up -->
		<div class="hidden sm:block">
			<nav class="-mb-px flex space-x-8">
				{#each tabs as tab}
					<a
						href={tab.href}
						class="{$page.url.pathname === tab.href || tab.active?.includes($page.route?.id ?? '')
							? 'border-primary-500 text-primary-600'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} group flex items-center gap-x-2 whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
						aria-current="page"
						>{tab.name}
						{#if tab.badge}
							<span
								class="{$page.url.pathname === tab.href ||
								tab.active?.includes($page.route?.id ?? '')
									? 'bg-primary-100 text-primary-700'
									: 'bg-gray-200  text-gray-700 group-hover:bg-gray-300 group-hover:text-gray-800'} inline-flex items-center rounded px-2 py-1 text-xs font-medium"
								>{tab.badge}</span
							>
						{/if}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</div>

<div class="mt-4">
	<slot />
</div>
