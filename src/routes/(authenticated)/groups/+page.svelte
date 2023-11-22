<script lang="ts">
	import Term from './term.svelte';
	import Empty from './empty.svelte';

	import { title, heading } from '../stores';
	title.set('Gruppen');
	heading.set('Meine Gruppen');

	export let data;
</script>

{#if data.terms.length === 0}
	<Empty />
{/if}
{#each data.terms as term}
	<Term {term} />
{/each}
