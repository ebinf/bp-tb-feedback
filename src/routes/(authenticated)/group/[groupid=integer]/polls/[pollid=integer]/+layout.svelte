<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import colors from 'tailwindcss/colors';
	import Header from './header.svelte';
	import { Bar } from 'svelte-chartjs';

	export let data;
	export let form;

	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
	import { createNotification } from '../../../../stores';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	$: if (form?.success) createNotification('', form.success, 'success');

	$: chartData = {
		labels: ['0', '1', '2', '3', '4', '5'],
		datasets: [
			{
				label: 'Stimmen',
				data: votesCount,
				backgroundColor: [
					colors.red[800],
					colors.red[600],
					colors.orange[600],
					colors.yellow[500],
					colors.lime[500],
					colors.lime[700]
				]
			}
		]
	};

	$: votes = data.poll_details.votes;
	$: votesCount = [0, 1, 2, 3, 4, 5].map(
		(i) => data.poll_details.votes.filter((v) => v.vote === i).length
	);
	$: comments = votes.filter((v) => v.comment);
</script>

<Header poll={data.poll_details} {comments} {votes}></Header>

<div
	class="mt-4 grid grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-4 lg:mx-0 lg:max-w-none lg:grid-cols-3"
>
	<div
		class="flow-root grow rounded-lg bg-white p-4 shadow lg:col-span-2 lg:row-span-2 lg:row-end-2"
	>
		<Bar
			data={chartData}
			options={{
				responsive: true,
				plugins: { legend: { display: false } },
				scales: { y: { ticks: { stepSize: 1 } } }
			}}
		/>
	</div>
	<div class="flow-root rounded-lg bg-white shadow">
		<dl class="grid grid-cols-2 divide-x divide-gray-100 sm:grid-cols-1 sm:divide-y">
			<div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
				<dt class="text-sm font-medium leading-6 text-gray-900">Durchschnitt</dt>
				<dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
					{#if votes.length === 0}0{:else}{Number(
							votes.reduce((a, b) => a + b.vote, 0) / votes.length
						).toFixed(2)}{/if}
				</dd>
			</div>
			<div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
				<dt class="text-sm font-medium leading-6 text-gray-900">Zustimmung</dt>
				<dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
					{#if votes.length === 0}0&nbsp;%{:else}{Number(
							votes.reduce((a, b) => a + b.vote * 20, 0) / votes.length
						).toFixed(0)}&nbsp;%{/if}
				</dd>
			</div>
		</dl>
	</div>
	<div class="flow-root rounded-lg bg-white p-4 shadow">
		<h3 class="text-lg font-medium leading-6 text-gray-900">Kommentare</h3>
		<div class="mt-2">
			{#if comments.length === 0}
				<p class="py-10 text-center text-sm text-gray-500">Bisher keine Kommentare.</p>
			{:else}
				<ul role="list" class="divide-y divide-gray-200">
					{#each comments as comment}
						<li class="py-3">
							<p class="text-sm font-medium text-gray-800">{comment.vote}/5</p>
							<p class="text-md text-gray-600">{comment.comment}</p>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>

<slot />
