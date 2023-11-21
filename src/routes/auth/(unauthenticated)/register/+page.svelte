<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_REGISTRATION_ENABLED } from '$env/static/public';
	import { title } from '../../store';

	title.set('Sign up');

	export let form;
</script>

<h1 class="font-bold text-3xl mb-4">Sign up</h1>

{#if form?.message}
	<p class="mb-4 bg-red-500 text-white px-4 py-2 rounded font-semibold">{form.message}</p>
{/if}

{#if PUBLIC_REGISTRATION_ENABLED === 'true'}
	<form method="post" use:enhance>
		<div class="mb-6">
			<label for="username" class="block">Username</label>
			<input
				name="username"
				id="username"
				required
				class="rounded bg-gray-50 border-gray-400 w-full focus:ring-2 focus:ring-primary-500"
			/><br />
		</div>
		<div class="mb-6">
			<label for="password" class="block">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				required
				class="rounded bg-gray-50 border-gray-400 w-full focus:ring-2 focus:ring-primary-500"
			/><br />
		</div>
		<div>
			<button type="submit" class="bg-primary-500 px-4 py-2 rounded text-white">Register</button> or
			<a href="/auth/login" class="text-primary-500 font-semibold">Login</a>
		</div>
	</form>
{:else}
	<p class="text-gray-500">
		Registration is currently disabled. If you already have an account, please go to <a
			href="/auth/login"
			class="text-primary-500 font-semibold">Login</a
		>.
	</p>
{/if}
