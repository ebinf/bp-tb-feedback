<script lang="ts">
	import { classes } from 'svelte-transition-classes';
	import { page } from '$app/stores';
	import { PUBLIC_SITE_NAME } from '$env/static/public';

	export let user_data: {
		email: string | undefined;
		full_name: string | undefined;
		is_admin: boolean | undefined;
	};

	$: menu_entries = [
		{
			name: 'Dashboard',
			href: '/dashboard'
		},
		{
			name: 'Gruppen',
			href: '/groups',
			active: [
				'/(authenticated)/group/[groupid=integer]/overview',
				'/(authenticated)/group/[groupid=integer]/feedback',
				'/(authenticated)/group/[groupid=integer]/feedback/[feedbackid=integer]',
				'/(authenticated)/group/[groupid=integer]/polls/(tabular)',
				'/(authenticated)/group/[groupid=integer]/polls/(tabular)/create',
				'/(authenticated)/group/[groupid=integer]/polls/[pollid=integer]',
				'/(authenticated)/group/[groupid=integer]/polls/[pollid=integer]/edit'
			]
		},
		{
			name: 'Einstellungen',
			href: '/settings'
		},
		...(user_data.is_admin
			? [
					{
						name: 'Verwaltung',
						href: '/admin',
						active: [
							'/(authenticated)/admin/overview',
							'/(authenticated)/admin/groups',
							'/(authenticated)/admin/terms',
							'/(authenticated)/admin/users',
							'/(authenticated)/admin/users/create',
							'/(authenticated)/admin/users/edit/[userId]'
						]
					}
				]
			: [])
	];

	const user_menu = [
		{
			name: 'Passwort ändern',
			href: '/settings'
		},
		{
			name: 'Abmelden',
			form: '/logout?/logout'
		}
	];

	let userMenuShown = false;
	let mobileMenuShown = false;
</script>

<nav class="bg-white shadow-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<div class="flex flex-shrink-0 items-center">
					<img
						class="block h-8 w-auto lg:hidden"
						src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
						alt={PUBLIC_SITE_NAME}
					/>
					<img
						class="hidden h-8 w-auto lg:block"
						src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
						alt={PUBLIC_SITE_NAME}
					/>
				</div>
				<div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
					{#each menu_entries as entry}
						<a
							href={entry.href}
							class="{$page?.url?.pathname === entry.href ||
							entry.active?.includes($page?.route?.id ?? '')
								? 'border-primary-500 text-gray-900'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}  inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
							>{entry.name}</a
						>
					{/each}
				</div>
			</div>
			<div class="hidden sm:ml-6 sm:flex sm:items-center">
				<!-- <button
					type="button"
					class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
				>
					<span class="absolute -inset-1.5" />
					<span class="sr-only">View notifications</span>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
						/>
					</svg>
				</button> -->

				<!-- Profile dropdown -->
				<div class="relative ml-3">
					<div>
						<button
							type="button"
							class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
							on:click={() => (userMenuShown = !userMenuShown)}
						>
							<span class="absolute -inset-1.5" />
							<span class="sr-only">Open user menu</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-6 w-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
								/>
							</svg>
						</button>
					</div>

					{#if userMenuShown}
						<div
							class="absolute right-0 z-10 mt-2 w-48 min-w-fit origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="user-menu-button"
							tabindex="-1"
							in:classes={{
								base: 'transition ease-out duration-200',
								from: 'transform opacity-0 scale-95',
								to: 'transform opacity-100 scale-100'
							}}
							out:classes={{
								base: 'transition ease-in duration-75',
								from: 'transform opacity-100 scale-100',
								to: 'transform opacity-0 scale-95'
							}}
						>
							<div class="block px-4 py-2 text-sm">
								<div class="whitespace-nowrap font-medium text-gray-800">{user_data.full_name}</div>
								<div class="whitespace-nowrap font-medium text-gray-500">{user_data.email}</div>
							</div>
							{#each user_menu as entry}
								{#if entry.href}
									<a
										href={entry.href}
										class="{$page?.url?.pathname === entry.href
											? 'bg-gray-100'
											: ''} block px-4 py-2 text-sm text-gray-700"
										role="menuitem"
										tabindex="-1"
										on:click={() => (userMenuShown = false)}
										id="user-menu-item-0">{entry.name}</a
									>
								{:else if entry.form}
									<form method="POST" action={entry.form}>
										<button
											class="{$page?.url?.pathname === entry.href
												? 'bg-gray-100'
												: ''}  px-4 py-2 text-sm text-gray-700"
										>
											{entry.name}
										</button>
									</form>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			</div>
			<div class="-mr-2 flex items-center sm:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
					aria-controls="mobile-menu"
					aria-expanded="false"
					on:click={() => (mobileMenuShown = !mobileMenuShown)}
				>
					<span class="absolute -inset-0.5" />
					<span class="sr-only">Menü öffnen</span>
					{#if mobileMenuShown}
						<svg
							class="block h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg
							class="block h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	{#if mobileMenuShown}
		<div class="sm:hidden" id="mobile-menu">
			<div class="space-y-1 pb-3 pt-2">
				{#each menu_entries as entry}
					<a
						href={entry.href}
						class="{$page?.url?.pathname === entry.href ||
						entry.active?.includes($page?.route?.id ?? '')
							? 'border-primary-500 bg-primary-50 text-primary-700'
							: 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
						on:click={() => (mobileMenuShown = false)}>{entry.name}</a
					>
				{/each}
			</div>
			<div class="border-t border-gray-200 pb-3 pt-4">
				<div class="flex items-center px-4">
					<div>
						<div class="text-base font-medium text-gray-800">{user_data.full_name}</div>
						<div class="text-sm font-medium text-gray-500">{user_data.email}</div>
					</div>
					<!-- <button
						type="button"
						class="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
					>
						<span class="absolute -inset-1.5" />
						<span class="sr-only">View notifications</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
							/>
						</svg>
					</button> -->
				</div>
				<div class="mt-3 space-y-1">
					{#each user_menu as entry}
						{#if entry.href}
							<a
								href={entry.href}
								class="{$page?.url?.pathname === entry.href
									? 'border-primary-500 bg-primary-50 text-primary-700'
									: 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-800'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
								on:click={() => (mobileMenuShown = false)}>{entry.name}</a
							>
						{:else if entry.form}
							<form method="POST" action={entry.form}>
								<button
									class="{$page?.url?.pathname === entry.href
										? 'border-primary-500 bg-primary-50 text-primary-700'
										: 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-800'} block w-full border-l-4 py-2 pl-3 pr-4 text-left text-base font-medium"
								>
									{entry.name}
								</button>
							</form>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	{/if}
</nav>
