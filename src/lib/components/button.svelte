<script lang="ts">
	export let scheme: 'primary' | 'secondary' | 'white' | 'danger' = 'primary';
	export let href: string | null = null;
	export let submit: boolean = false;
	export let spinner: boolean = false;
	export let disabled: boolean = false;
	export let clazz: string | null = null;
	export let title: string | null = null;
	export { clazz as class };
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="mt-3 inline-flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:mt-0 sm:w-auto {clazz}"
	class:text-white={scheme === 'primary' || scheme === 'secondary' || scheme === 'danger'}
	class:bg-primary-600={scheme === 'primary'}
	class:hover:bg-primary-500={scheme === 'primary'}
	class:disabled:hover:bg-primary-600={scheme === 'primary'}
	class:bg-gray-600={scheme === 'secondary'}
	class:hover:bg-gray-500={scheme === 'secondary'}
	class:disabled:hover:bg-gray-600={scheme === 'secondary'}
	class:text-gray-900={scheme === 'white'}
	class:ring-1={scheme === 'white'}
	class:ring-inset={scheme === 'white'}
	class:ring-gray-300={scheme === 'white'}
	class:bg-white={scheme === 'white'}
	class:hover:bg-gray-50={scheme === 'white'}
	class:disabled:hover:bg-gray-100={scheme === 'white'}
	class:bg-red-600={scheme === 'danger'}
	class:hover:bg-red-500={scheme === 'danger'}
	class:disabled:hover:bg-red-600={scheme === 'danger'}
	class:disabled:opacity-80={disabled || spinner}
	type={submit && !href ? 'submit' : 'button'}
	disabled={disabled || spinner}
	{href}
	{title}
	role="button"
	tabindex="0"
	on:click
>
	{#if spinner}
		<svg
			class="h-5 w-5 animate-spin"
			class:text-white={scheme === 'primary' || scheme === 'secondary' || scheme === 'danger'}
			class:text-gray-900={scheme === 'white'}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	{:else}
		{#if $$slots.icon}
			<span
				class="-ml-0.5 mr-1.5 inline-block h-5 w-5"
				class:text-gray-300={scheme === 'secondary'}
			>
				<slot name="icon" />
			</span>
		{/if}
		<slot />
	{/if}
</svelte:element>
