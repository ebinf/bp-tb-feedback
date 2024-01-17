<script lang="ts">
	export let data;
</script>

<div>
	<h3 class="text-base font-semibold leading-6 text-gray-900">Statistiken</h3>
	<dl class="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
		<a
			href="/admin/terms"
			class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
		>
			<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
				<dt class="truncate text-sm font-medium text-gray-500">Semester</dt>
				<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
					{data.terms}
				</dd>
			</div>
		</a>
		<a
			href="/admin/users"
			class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
		>
			<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
				<dt class="truncate text-sm font-medium text-gray-500">Nutzer:innen</dt>
				<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
					{data.users}
				</dd>
			</div>
		</a>
		<a
			href="/admin/groups"
			class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
		>
			<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
				<dt class="truncate text-sm font-medium text-gray-500">Gruppen</dt>
				<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
					{data.groups}
				</dd>
			</div>
		</a>
		<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
			<dt class="truncate text-sm font-medium text-gray-500">Feedbacks</dt>
			<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.feedbacks}</dd>
		</div>
		<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
			<dt class="truncate text-sm font-medium text-gray-500">Stimmungsbilder</dt>
			<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.polls}</dd>
		</div>
		<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
			<dt class="truncate text-sm font-medium text-gray-500">Stimmen</dt>
			<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.votes}</dd>
		</div>
		<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
			<dt class="truncate text-sm font-medium text-gray-500">Notizen</dt>
			<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.notes}</dd>
		</div>
	</dl>
</div>
