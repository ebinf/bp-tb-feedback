<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>Feedback</title>
</svelte:head>

<h1>Feedback</h1>

<h3>Gruppe {data.group.number} {data.group.name}</h3>

<h3>TB: {data.group.lead.full_name}</h3>
