<script lang="ts">
	import Term from './term.svelte';
	import Empty from './empty.svelte';
	import EmptyTerm from './empty_term.svelte';

	import { title, heading } from '../stores';
	title.set('Gruppen');
	heading.set('Meine Gruppen');

	export let data;
</script>

{#await data.streamed.terms}
	<EmptyTerm />
{:then terms}
	{#if terms.length === 0}
		<Empty />
	{/if}
	{#each terms as term}
		<Term {term} />
	{/each}
{/await}
