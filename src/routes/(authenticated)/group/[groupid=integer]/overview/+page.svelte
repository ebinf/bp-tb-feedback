<script lang="ts">
	import { createNotification } from '../../../stores';
	import Stats from './stats.svelte';
	import FeedbackLink from './feedback_link.svelte';
	import Toast from '$lib/components/toast.svelte';

	export let data;
	export let form;

	$: if (form?.success) {
		createNotification('', form.success, 'success');
	} else if (form?.fail) {
		createNotification('', form.fail, 'fail');
	}
</script>

<div class="flex flex-col gap-y-4">
	<Stats {data} />
	<FeedbackLink {data} />
</div>
