<script setup lang="ts">
const token = useCookie<string>('token');
</script>
<template>
	<div class="bg-bg min-h-screen lg:flex">
		<Login v-if="!token" />
		<template v-else>
			<AppSidebar />
			<div class="min-w-0 flex-1">
				<NuxtPage />
			</div>
		</template>
	</div>
</template>
