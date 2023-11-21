<script lang="ts">
	import { title } from '../../store';

	title.set('User Settings');

	export let data;
</script>

<h1 class="font-bold text-3xl mb-4">User</h1>

<p class="text-gray-500 mb-4">
	You are logged in as <span class="text-black font-medium">{data.username}</span>.
</p>

<div class="grid grid-cols-1 gap-4">
	<div>
		<a
			href="/auth/change_password"
			class="bg-secondary-500 block text-center w-full px-4 py-2 rounded text-white"
			>Change password</a
		>
	</div>
	<div>
		<form method="post" action="/auth/logout?/logout_everywhere">
			<button type="submit" class="bg-secondary-500 w-full px-4 py-2 rounded text-white"
				>Log out everywhere</button
			>
		</form>
	</div>
	<div>
		<a
			href="/auth/delete_account"
			class="bg-secondary-500 block text-center w-full px-4 py-2 rounded text-white"
			>Delete account</a
		>
	</div>
	<div>
		<form method="post" action="/auth/logout?/logout">
			<button type="submit" class="bg-primary-500 w-full px-4 py-2 rounded text-white"
				>Log out</button
			>
		</form>
	</div>
</div>
