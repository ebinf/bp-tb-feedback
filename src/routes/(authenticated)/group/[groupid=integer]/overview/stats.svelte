<script lang="ts">
	import { goto } from '$app/navigation';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;

	$: votes = data?.polls?.reduce((acc, p) => acc + p._count.votes, 0) ?? 0;
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
							class="ml-1 items-center rounded bg-primary-100 px-2 py-1 text-lg font-medium text-primary-700 marker:inline-flex"
							>{data?.unread_feedback}&nbsp;ungelesen</span
						>
					{/if}
				</dd>
			</div>
		</a>
		<a
			href="/group/{data.group?.id}/polls"
			class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
		>
			<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
				<dt class="truncate text-sm font-medium text-gray-500">Stimmungsbilder</dt>
				<dd
					class="mt-1 flex items-center gap-x-2 text-3xl font-semibold tracking-tight text-gray-900"
				>
					{data?.polls?.length ?? 0}
					{#if data?.polls?.some((p) => p.open)}
						<span class="relative flex h-3 w-3">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-300 opacity-75"
							></span>
							<span class="relative inline-flex h-3 w-3 rounded-full bg-primary-400"></span>
						</span>
					{/if}
				</dd>
			</div>
		</a>
		<a
			href="/group/{data.group?.id}/polls"
			class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
		>
			<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
				<dt class="truncate text-sm font-medium text-gray-500">Stimmen</dt>
				<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
					{votes}
				</dd>
			</div>
		</a>
	</dl>
</div>
