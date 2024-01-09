<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { classes } from 'svelte-transition-classes';

	export let style: 'danger' | 'success' | 'primary' = 'primary';
	export let shown = true;

	const dispatch = createEventDispatcher();
</script>

{#if shown}
	<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div
			class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
			in:classes={{
				base: 'ease-out duration-300',
				from: 'opacity-0',
				to: 'opacity-100'
			}}
			out:classes={{
				base: 'ease-in duration-200',
				from: 'opacity-100',
				to: 'opacity-0'
			}}
		/>

		<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<div
					class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
					in:classes={{
						base: 'ease-out duration-300',
						from: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
						to: 'opacity-100 translate-y-0 sm:scale-100'
					}}
					out:classes={{
						base: 'ease-in duration-200',
						from: 'opacity-100 translate-y-0 sm:scale-100',
						to: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					}}
				>
					<div class="sm:flex sm:items-start">
						<div
							class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
							class:bg-red-100={style === 'danger'}
							class:bg-green-100={style === 'success'}
							class:bg-primary-100={style === 'primary'}
						>
							<slot name="icon"
								><svg
									class="h-6 w-6"
									class:text-red-600={style === 'danger'}
									class:text-green-600={style === 'success'}
									class:text-primary-600={style === 'primary'}
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									{#if style === 'danger'}
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
										/>
									{:else if style === 'success'}
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M4.5 12.75l6 6 9-13.5"
										/>
									{/if}
								</svg></slot
							>
						</div>
						<div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
							<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
								<slot name="title" />
							</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500">
									<slot name="content" />
								</p>
							</div>
						</div>
					</div>
					<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							on:click={() => {
								dispatch('confirmed');
							}}
							class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
							class:hover:bg-red-500={style === 'danger'}
							class:bg-red-600={style === 'danger'}
							class:hover:bg-green-500={style === 'success'}
							class:bg-green-600={style === 'success'}
							class:hover:bg-primary-500={style === 'primary'}
							class:bg-primary-600={style === 'primary'}><slot name="action" /></button
						>
						<button
							type="button"
							on:click={() => {
								dispatch('cancelled');
							}}
							class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
							>Abbrechen</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
