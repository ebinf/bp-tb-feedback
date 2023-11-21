<script lang="ts">
	import { title } from '../../store';

	title.set('Log out');
</script>

<h1 class="font-bold text-3xl mb-4">Logout</h1>

<p class="text-gray-500 mb-4">If you really want to log out, please click on the button below.</p>

<form method="post" action="?/logout">
	<div>
		<button type="submit" class="bg-primary-500 px-4 py-2 rounded text-white">Log out</button>
	</div>
</form>
