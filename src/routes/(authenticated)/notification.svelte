<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classes from 'svelte-transition-classes';

	export let style: 'success' | 'fail' | 'warning' | 'info' = 'success';
</script>

<div
	class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
	in:classes={{
		base: 'transform ease-out duration-300 transition',
		from: 'translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2',
		to: 'translate-y-0 opacity-100 sm:translate-x-0'
	}}
	out:classes={{
		base: 'ease-in duration-100 transition',
		from: 'opacity-100',
		to: 'opacity-0'
	}}
>
	<div class="p-4">
		<div class="flex items-start">
			<div class="flex-shrink-0">
				<svg
					class="h-6 w-6"
					class:text-green-400={style === 'success'}
					class:text-red-400={style === 'fail'}
					class:text-yellow-400={style === 'warning'}
					class:text-blue-400={style === 'info'}
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					{#if style === 'success'}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					{:else if style === 'fail'}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					{:else if style === 'warning'}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
						/>
					{:else if style === 'info'}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
						/>
					{/if}
				</svg>
			</div>
			<div class="ml-3 w-0 flex-1 pt-0.5">
				<p class="text-sm font-medium text-gray-900"><slot name="title" /></p>
				<p class="mt-1 text-sm text-gray-500"><slot /></p>
			</div>
			<div class="ml-4 flex flex-shrink-0">
				<button
					type="button"
					class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
					on:click
				>
					<span class="sr-only">Schließen</span>
					<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>
