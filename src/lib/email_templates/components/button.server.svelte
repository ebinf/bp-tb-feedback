<script lang="ts">
	export let link: string;
</script>

<p style="margin: 1.75rem 0;">
	<a role="button" href={link} class="button"><slot /></a>
</p>
