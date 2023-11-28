<script>
	import Notification from './notification.svelte';
	import { notification } from './stores';
</script>

<div
	aria-live="assertive"
	class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
	<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
		{#each $notification as { id, message, title, style } (id)}
			<Notification
				on:click={() => {
					notification.remove(id);
				}}
				{style}
			>
				<svelte:fragment slot="title">{title}</svelte:fragment>
				{message}
			</Notification>
		{/each}
	</div>
</div>
