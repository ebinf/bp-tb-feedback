<script lang="ts">
	import Button from './button.svelte';

	export let href: string | null = null;
</script>

<div class="sm:flex sm:items-center">
	<div class="sm:flex-auto">
		<h1 class="text-base font-semibold leading-6 text-gray-900"><slot name="heading" /></h1>
		<p class="mt-2 text-sm text-gray-700">
			<slot name="description" />
		</p>
	</div>
	{#if href || $$slots.buttons}
		<div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
			<slot name="buttons" />
			{#if href}
				<Button {href} scheme="primary">
					<slot name="icon" slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</slot>
					<slot name="cta" /></Button
				>{/if}
		</div>
	{/if}
</div>
