<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_SUPPORT_ADDRESS } from '$env/static/public';
	import { title, heading } from './stores';
	title.set('Fehler');
	heading.set('Fehler');
</script>

<div class="mt-4 rounded-md border border-red-100 bg-red-50 p-4">
	<div class="flex">
		<div class="flex-shrink-0">
			<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>
		<div class="ml-3">
			<h3 class="text-sm font-medium text-red-800">
				Bei der Verarbeitung deiner Anfrage ist ein Fehler aufgetreten. Folgendes kannst du
				versuchen:
			</h3>
			<div class="mt-2 text-sm text-red-700">
				<ul role="list" class="list-disc space-y-1 pl-5">
					<li>Bitte probiere es in wenigen Minuten erneut.</li>
					<li>
						Falls du einen Link kopiert hast, stelle bitte sicher, dass er vollständig und korrekt
						ist.
					</li>
					<li>
						Wenn das Problem weiterhin besteht, <a
							href="mailto:{PUBLIC_SUPPORT_ADDRESS}"
							class="font-medium text-red-800 underline hover:text-red-900"
							>nimm bitte Kontakt auf</a
						>.
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<div class="mt-4 text-gray-500">
	<h3 class="text-lg font-medium">Fehlerdetails</h3>
	<div class="font-mono">
		Status {$page.status}<br />
		{$page.error?.message}
	</div>
</div>
