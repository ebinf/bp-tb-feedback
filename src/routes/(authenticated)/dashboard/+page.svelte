<script lang="ts">
	import { title, heading } from '../stores';
	heading.set('Dashboard');
	title.set('Dashboard');

	export let data;
</script>

<h2 class="text-xl">Willkommen, {data.full_name}!</h2>
