<script lang="ts">
	import { page } from '$app/stores';

	const menu_entries = [
		{
			name: 'Dashboard',
			href: '/dashboard'
		},
		{
			name: 'Gruppen',
			href: '/groups'
		}
	];

	const user_menu = [
		{
			name: 'Passwort ändern',
			href: '/auth/change_password'
		},
		{
			name: 'Abmelden',
			href: '/auth/logout'
		}
	];

	export let user_data: {
		username: string;
		full_name: string;
	};
</script>

<nav class="bg-white shadow-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<div class="flex flex-shrink-0 items-center">
					<img
						class="block h-8 w-auto lg:hidden"
						src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
						alt="Your Company"
					/>
					<img
						class="hidden h-8 w-auto lg:block"
						src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
						alt="Your Company"
					/>
				</div>
				<div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
					{#each menu_entries as entry}
						<a
							href={entry.href}
							class="{$page?.url?.pathname === entry.href
								? 'border-primary-500 text-gray-900'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}  inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
							>{entry.name}</a
						>
					{/each}
				</div>
			</div>
			<div class="hidden sm:ml-6 sm:flex sm:items-center">
				<button
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
				</button>

				<!-- Profile dropdown -->
				<div class="relative ml-3">
					<div>
						<button
							type="button"
							class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
						>
							<span class="absolute -inset-1.5" />
							<span class="sr-only">Open user menu</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
								/>
							</svg>
						</button>
					</div>

					<!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
					<div
						class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="user-menu-button"
						tabindex="-1"
					>
						<!-- Active: "bg-gray-100", Not Active: "" -->
						<div class="block px-4 py-2 text-sm">
							<div class="font-medium text-gray-800">{user_data.full_name}</div>
							<div class="font-medium text-gray-500">{user_data.username}</div>
						</div>
						{#each user_menu as entry}
							<a
								href={entry.href}
								class="{$page?.url?.pathname === entry.href
									? 'bg-gray-100'
									: ''} block px-4 py-2 text-sm text-gray-700"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-0">{entry.name}</a
							>
						{/each}
					</div>
				</div>
			</div>
			<div class="-mr-2 flex items-center sm:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="absolute -inset-0.5" />
					<span class="sr-only">Open main menu</span>
					<!-- Menu open: "hidden", Menu closed: "block" -->
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
					<!-- Menu open: "block", Menu closed: "hidden" -->
					<svg
						class="hidden h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="sm:hidden" id="mobile-menu">
		<div class="space-y-1 pb-3 pt-2">
			{#each menu_entries as entry}
				<a
					href={entry.href}
					class="{$page?.url?.pathname === entry.href
						? 'border-primary-500 bg-primary-50 text-primary-700'
						: 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
					>{entry.name}</a
				>
			{/each}
		</div>
		<div class="border-t border-gray-200 pb-3 pt-4">
			<div class="flex items-center px-4">
				<div>
					<div class="text-base font-medium text-gray-800">{user_data.full_name}</div>
					<div class="text-sm font-medium text-gray-500">{user_data.username}</div>
				</div>
				<button
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
				</button>
			</div>
			<div class="mt-3 space-y-1">
				{#each user_menu as entry}
					<a
						href={entry.href}
						class="{$page?.url?.pathname === entry.href
							? 'border-primary-500 bg-primary-50 text-primary-700'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-800'}  block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
						>{entry.name}</a
					>
				{/each}
			</div>
		</div>
	</div>
</nav>
