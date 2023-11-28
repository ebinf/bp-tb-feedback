<script lang="ts">
	import { goto } from '$app/navigation';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;
</script>

<div>
	<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
		<a
			href="/group/{data.group?.id}/feedback"
			class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
		>
			<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
				<dt class="truncate text-sm font-medium text-gray-500">Feedbacks</dt>
				<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
					{data?.feedback?.length ?? 0}
					{#if data?.unread_feedback && data?.unread_feedback > 0}
						<span
							class="bg-primary-100 text-primary-700 marker:inline-flex items-center rounded ml-1 px-2 py-1 text-lg font-medium"
							>{data?.unread_feedback}&nbsp;ungelesen</span
						>
					{/if}
				</dd>
			</div>
		</a>
		<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
			<dt class="truncate text-sm font-medium text-gray-500">Avg. Open Rate</dt>
			<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">58.16%</dd>
		</div>
		<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
			<dt class="truncate text-sm font-medium text-gray-500">Avg. Click Rate</dt>
			<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">24.57%</dd>
		</div>
	</dl>
</div>
