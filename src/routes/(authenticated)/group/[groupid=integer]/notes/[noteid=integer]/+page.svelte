<script>
	import { marked } from 'marked';
	import Header from './header.svelte';
	import { page } from '$app/stores';
	import { createNotification } from '../../../../stores';
	import DOMPurify from 'isomorphic-dompurify';

	export let data;

	if ($page.url.searchParams.has('created')) {
		createNotification('Die Notiz wurde erfolgreich erstellt.', 'Notiz erstellt', 'success');
	}

	if ($page.url.searchParams.has('edited')) {
		createNotification('Die Notiz wurde erfolgreich bearbeitet.', 'Notiz bearbeitet', 'success');
	}
</script>

<Header
	title={data.note.title}
	edited={data.note.edited}
	edit_url="/group/{data.group?.id}/notes/{data.note.id}/edit"
></Header>

<div class="mt-8 rounded-lg bg-white p-4 shadow">
	<div class="prose prose-sm leading-relaxed">
		{#await marked.parse(data.note.note)}
			<span class="text-sm italic">Lädt...</span>
		{:then mdcontent}
			{@html DOMPurify.sanitize(mdcontent)}
		{/await}
	</div>
</div>
