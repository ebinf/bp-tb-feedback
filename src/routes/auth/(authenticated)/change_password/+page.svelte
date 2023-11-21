<script lang="ts">
	import { enhance } from '$app/forms';
	import { title } from '../../store';

	title.set('Change password');

	export let form;
</script>

<h1 class="font-bold text-3xl mb-4">Change Password</h1>

{#if form?.error}
	<p class="mb-4 bg-red-500 text-white px-4 py-2 rounded font-semibold">{form.error}</p>
{/if}

{#if form?.success}
	<p class="mb-4 bg-green-500 text-white px-4 py-2 rounded font-semibold">{form.success}</p>
{/if}

<form method="post" use:enhance>
	<div class="mb-6">
		<label for="current_password" class="block">Current password</label>
		<input
			type="password"
			name="current_password"
			id="current_password"
			required
			class="rounded bg-gray-50 border-gray-400 w-full focus:ring-2 focus:ring-primary-500"
		/>
	</div>
	<div class="mb-6">
		<label for="new_password" class="block">New password</label>
		<input
			type="password"
			name="new_password"
			id="new_password"
			required
			class="rounded bg-gray-50 border-gray-400 w-full focus:ring-2 focus:ring-primary-500"
		/>
	</div>
	<div class="mb-6">
		<label for="repeat_password" class="block">Repeat password</label>
		<input
			type="password"
			name="repeat_password"
			id="repeat_password"
			required
			class="rounded bg-gray-50 border-gray-400 w-full focus:ring-2 focus:ring-primary-500"
		/>
	</div>
	<div>
		<button type="submit" class="bg-primary-500 px-4 py-2 rounded text-white"
			>Change password</button
		>
	</div>
</form>
