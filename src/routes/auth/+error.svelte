<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="font-bold text-3xl mb-4">{$page.status} {$page.error?.message}</h1>

<p class="text-gray-500">
	While handling your request, the above mentioned error occured. Please try again in a few moments.
	If the problem persists, please contact us.
</p>
