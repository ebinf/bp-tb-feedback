<script lang="ts">
	export let lead_name: string;
</script>

<div class="lg:col-start-3 lg:row-end-1">
	<div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
		<dl class="flex flex-wrap">
			<div class="flex-auto pl-6 pt-6">
				<dt class="text-sm leading-6 text-gray-500">Feedback an</dt>
				<dd class="mt-1 text-base font-semibold leading-6 text-gray-900">
					{lead_name || 'Teambegleitung'}
				</dd>
			</div>
			<div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
				<dt class="flex-none flex items-center">
					<svg
						class="h-6 w-5 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z"
						/>
					</svg>
				</dt>
				<dd class="text-sm leading-6 text-gray-500">Feedback hilft uns, besser zu werden</dd>
			</div>
			<div class="mt-4 flex w-full flex-none gap-x-4 px-6">
				<dt class="flex-none">
					<svg
						class="h-6 w-5 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 01-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.75zm4.196 5.954a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clip-rule="evenodd"
						/>
					</svg>
				</dt>
				<dd class="text-sm leading-6 text-gray-500">
					<time datetime="2023-01-31">Deine Daten sind sicher</time>
				</dd>
			</div>
			<div class="mt-4 flex w-full flex-none gap-x-4 px-6">
				<dt class="flex-none">
					<svg
						class="h-6 w-5 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 01-.82-1.256A8 8 0 0118 9a22.47 22.47 0 01-1.228 7.351.75.75 0 11-1.417-.49A20.97 20.97 0 0016.5 9 6.5 6.5 0 0010 2.5zM4.333 4.416a.75.75 0 01.218 1.038A6.466 6.466 0 003.5 9a7.966 7.966 0 01-1.293 4.362.75.75 0 01-1.257-.819A6.466 6.466 0 002 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 011.038-.219zM10 6.12a3 3 0 00-3.001 3.041 11.455 11.455 0 01-2.697 7.24.75.75 0 01-1.148-.965A9.957 9.957 0 005.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 018.996.084V9.15l-.005.297a.75.75 0 11-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 00-3-2.965zm0 2.13a.75.75 0 01.75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 11-1.186-.918A13.687 13.687 0 009.25 9a.75.75 0 01.75-.75zm3.529 3.698a.75.75 0 01.584.885 18.883 18.883 0 01-2.257 5.84.75.75 0 11-1.29-.764 17.386 17.386 0 002.078-5.377.75.75 0 01.885-.584z"
							clip-rule="evenodd"
						/>
					</svg>
				</dt>
				<dd class="text-sm leading-6 text-gray-500">Komplett anonym, wenn du das willst</dd>
			</div>
		</dl>
		<div class="mt-6 border-t border-gray-900/5 px-6 py-6">
			<a
				href="https://github.com/ebinf/bp-tb-feedback"
				target="_blank"
				class="text-sm font-semibold leading-6 text-gray-900"
				>Mehr über das Projekt <span aria-hidden="true">&rarr;</span></a
			>
		</div>
	</div>
</div>
