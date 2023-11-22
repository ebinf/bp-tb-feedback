<script lang="ts">
	import { title, heading } from '../stores';

	title.set('Logout');
	heading.set('Logout');
</script>

<p class="text-gray-500">
	Wenn du dich wirklich abmelden möchtest, drücke einfach auf den Button unten.
</p>

<form class="mt-4" method="POST" action="?/logout">
	<div>
		<button
			type="submit"
			class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
			>Abmelden</button
		>
	</div>
</form>
