<script setup lang="ts">
const { data, refresh } = useFetch('/api/camp/blacksmith');
const { execute } = await useFetch('/api/camp/blacksmith', {
	method: 'post',
	immediate: false,
});
</script>

<template>
	<div class="">
		<div class="flex justify-center items-center">
			<UCard
				variant="solid"
				class="bg-blue-400/10 *:py-3 w-full max-w-max"
			>
				<div class="flex flex-col items-center gap-2">
					<div class="">آهنگری</div>
					<UCard
						v-if="data"
						variant="solid"
						class="bg-blue-400/10 *:py-3 w-full max-w-max"
					>
						<div
							v-for="{ level, name } in data"
							:key="name"
							class=""
						>
							<span class=""> {{ name }} </span>: {{ level }}
						</div>
					</UCard>
					<div class="flex gap-2">
						<UButton @click="execute()"> ارتقا همه </UButton>
						<UButton @click="refresh()"> بروزرسانی </UButton>
					</div>
				</div>
			</UCard>
		</div>
	</div>
</template>
