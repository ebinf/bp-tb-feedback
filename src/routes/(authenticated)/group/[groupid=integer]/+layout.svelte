<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;

	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { title, heading } from '../../stores';
	import type { PollRound } from '@prisma/client';
	$: title.set(`Gruppe ${data?.group?.number}: ${data?.group?.name}`);
	$: heading.set(
		`<span class="text-gray-500 font-medium pr-3">${data?.group?.number} </span>${data?.group?.name}`
	);

	const tabs = [
		{
			name: 'Übersicht',
			href: `/group/${data.group?.id}/overview`
		},

		{
			name: 'Feedback',
			href: `/group/${data.group?.id}/feedback`,
			feedback_badge: true,
			active: ['/(authenticated)/group/[groupid=integer]/feedback/[feedbackid=integer]']
		},
		{
			name: 'Stimmungsbilder',
			href: `/group/${data.group?.id}/polls`,
			polls_badge: true,
			active: [
				'/(authenticated)/group/[groupid=integer]/polls/(tabular)',
				'/(authenticated)/group/[groupid=integer]/polls/(tabular)/create',
				'/(authenticated)/group/[groupid=integer]/polls/[pollid=integer]',
				'/(authenticated)/group/[groupid=integer]/polls/[pollid=integer]/edit'
			]
		},
		{
			name: 'Notizen',
			href: `/group/${data.group?.id}/notes`,
			active: [
				'/(authenticated)/group/[groupid=integer]/notes/create',
				'/(authenticated)/group/[groupid=integer]/notes/[noteid=integer]',
				'/(authenticated)/group/[groupid=integer]/notes/[noteid=integer]/edit'
			]
		}
	];

	$: unread_feedback = $page.data.unread_feedback;
	$: poll_active = $page.data.polls.some((p: PollRound) => p.open);

	let mobileMenu: HTMLSelectElement;
</script>

<p class="text-gray-500">
	{data.group?.term?.name}
	{#if !data.group?.term.active}<span class="italic">(nicht aktiv)</span>{/if}
</p>

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
						{#if tab.feedback_badge && unread_feedback && unread_feedback > 0}
							&nbsp;({unread_feedback})
						{/if}
						{#if tab.polls_badge && poll_active}
							&nbsp;&#9679;
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
						{#if tab.feedback_badge && unread_feedback && unread_feedback > 0}
							<span
								class="{$page.url.pathname === tab.href ||
								tab.active?.includes($page.route?.id ?? '')
									? 'bg-primary-100 text-primary-700'
									: 'bg-gray-200  text-gray-700 group-hover:bg-gray-300 group-hover:text-gray-800'} inline-flex items-center rounded px-2 py-1 text-xs font-medium"
								>{unread_feedback}</span
							>
						{/if}
						{#if tab.polls_badge && poll_active}
							<span class="self-top relative inline-flex h-2 w-2">
								{#if $page.url.pathname === tab.href || tab.active?.includes($page.route?.id ?? '')}
									<span
										class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"
									></span>
									<span class="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
								{:else}
									<span
										class="relative inline-flex h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400"
									></span>
								{/if}
							</span>
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
