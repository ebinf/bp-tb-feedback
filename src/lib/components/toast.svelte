<script lang="ts">
	import { classes } from 'svelte-transition-classes';

	let show = true;

	export let style: 'success' | 'fail' | 'warning' | 'info' = 'success';
	export let dismissable: Boolean = true;
</script>

{#if show}
	<div
		class="rounded-md p-4"
		class:bg-green-100={style === 'success'}
		class:bg-red-100={style === 'fail'}
		class:bg-yellow-100={style === 'warning'}
		class:bg-blue-100={style === 'info'}
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
		<div class="flex">
			<div class="flex-shrink-0">
				<svg
					class="h-5 w-5"
					class:text-green-400={style === 'success'}
					class:text-red-400={style === 'fail'}
					class:text-yellow-400={style === 'warning'}
					class:text-blue-400={style === 'info'}
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					{#if style === 'success'}
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clip-rule="evenodd"
						/>
					{:else if style === 'fail'}
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
							clip-rule="evenodd"
						/>
					{:else if style === 'warning'}
						<path
							fill-rule="evenodd"
							d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
							clip-rule="evenodd"
						/>
					{:else if style === 'info'}
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
							clip-rule="evenodd"
						/>
					{/if}
				</svg>
			</div>
			<div class="ml-3">
				<p
					class="text-sm font-medium"
					class:text-green-800={style === 'success'}
					class:text-red-800={style === 'fail'}
					class:text-yellow-800={style === 'warning'}
					class:text-blue-800={style === 'info'}
				>
					<slot />
				</p>
			</div>
			{#if dismissable}
				<div class="ml-auto pl-3">
					<div class="-mx-1.5 -my-1.5">
						<button
							type="button"
							class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
							class:text-green-500={style === 'success'}
							class:bg-green-100={style === 'success'}
							class:hover:bg-green-200={style === 'success'}
							class:focus:ring-green-600={style === 'success'}
							class:focus:ring-offset-green-50={style === 'success'}
							class:bg-red-100={style === 'fail'}
							class:text-red-500={style === 'fail'}
							class:hover:bg-red-200={style === 'fail'}
							class:focus:ring-red-600={style === 'fail'}
							class:focus:ring-offset-red-50={style === 'fail'}
							class:bg-yellow-100={style === 'warning'}
							class:text-yellow-500={style === 'warning'}
							class:hover:bg-yellow-200={style === 'warning'}
							class:focus:ring-yellow-600={style === 'warning'}
							class:focus:ring-offset-yellow-50={style === 'warning'}
							class:bg-blue-100={style === 'info'}
							class:text-blue-500={style === 'info'}
							class:hover:bg-blue-200={style === 'info'}
							class:focus:ring-blue-600={style === 'info'}
							class:focus:ring-offset-blue-50={style === 'info'}
							on:click={() => (show = false)}
						>
							<span class="sr-only">Ausblenden</span>
							<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path
									d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
								/>
							</svg>
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
