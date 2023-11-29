<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/button.svelte';
	import { comment } from 'postcss';
	import { onMount } from 'svelte';
	import colors from 'tailwindcss/colors';
	import Header from './header.svelte';
	import { Bar } from 'svelte-chartjs';
	import { invalidate, invalidateAll } from '$app/navigation';

	export let data;

	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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

	onMount(() => {
		const eventSource = new EventSource(`/group/3/polls/1/sse`);
		eventSource.onmessage = (event) => {
			invalidateAll();
		};
	});

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
		Durschschnitt: {#if votes.length === 0}0{:else}{Number(
				votes.reduce((a, b) => a + b.vote, 0) / votes.length
			).toFixed(2)}{/if}
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
