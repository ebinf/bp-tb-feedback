<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/button.svelte';
	import { Chart, registerables } from 'chart.js';
	import { comment } from 'postcss';
	import { onMount } from 'svelte';
	import colors from 'tailwindcss/colors';
	import Header from './header.svelte';

	export let data;

	Chart.register(...registerables);

	let barChartElement: HTMLCanvasElement;

	$: chartData = {
		labels: ['0', '1', '2', '3', '4', '5'],
		datasets: [
			{
				label: 'Stimmen',
				data: [0, 1, 2, 3, 4, 5].map(
					(i) => data.poll_details.votes.filter((v) => v.vote === i).length
				),
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
		if (browser) {
			new Chart(barChartElement, {
				type: 'bar',
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						y: {
							ticks: {
								stepSize: 1
							}
						}
					}
				}
			});
		}
	});

	$: votes = data.poll_details.votes;
	$: comments = votes.filter((v) => v.comment);
</script>

<Header poll={data.poll_details} {comments} {votes}></Header>

<div class="mt-4 flow-root bg-white p-4 shadow sm:rounded-lg">
	<canvas bind:this={barChartElement} />
</div>
