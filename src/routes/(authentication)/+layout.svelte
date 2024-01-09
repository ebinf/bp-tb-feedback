<script lang="ts">
	import { PUBLIC_SITE_NAME } from '$env/static/public';
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="mb-10 lg:mx-auto lg:w-full lg:max-w-sm">
		<img
			class="mx-auto h-10 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
			alt={PUBLIC_SITE_NAME}
		/>
	</div>
	<slot />
</div>
