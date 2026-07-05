<script setup lang="ts">
import { isEqual } from 'es-toolkit';

const inputs = ref();

const { data, refresh, status } = await useFetch('/api/profile', {
	onResponse: ({ response }) => {
		inputs.value = response._data?.towns.map(v => v.name) ?? [];
	},
});

const { execute, pending } = useFetch('/api/profile', {
	method: 'post',
	immediate: false,
	onRequest: ctx => {
		ctx.options.body = {
			townNames: inputs.value,
		};
	},
	onResponse: async () => {
		await refresh();
	},
});
</script>

<template>
	<div class="w-full p-4 flex flex-col items-center text-white">
		<UCard
			variant="solid"
			class="max-w-md w-full relative"
		>
			<template #header>
				<p class="text-center">پروفایل</p>
			</template>
			<div
				v-if="status == 'pending'"
				class="text-center"
			>
				در حال دریافت اطلاعات...
			</div>
			<div
				v-if="data && status == 'success'"
				class="space-y-4"
			>
				<div class="text-center">
					<span class="text-xl font-bold">
						{{ data.username }}
					</span>
					({{ data.rank }} ام)
				</div>
				<div class="flex flex-col items-center gap-4">
					<p class="text-center mb-4">دهکده ها</p>
					<div
						v-for="({ isMain, population }, i) in data.towns"
						:key="i"
						class="flex items-center justify-center w-full"
						:class="{ 'text-white/60': isMain }"
					>
						<div class="">
							<UInput
								v-model="inputs[i]"
								dir="ltr"
								class="*:bg-transparent *:text-white max-w-32 text-center"
							/>
							<span>
								({{ population }}
								<span class="opacity-50">نفر</span>
								)
							</span>
						</div>
					</div>
				</div>
				<div class="flex w-full justify-center gap-4">
					<UButton
						:disabled="
							isEqual(
								inputs,
								data.towns.map(v => v.name),
							)
						"
						@click="execute()"
					>
						{{ pending ? 'در حال ویرایش...' : 'ویرایش' }}
					</UButton>
					<UButton @click="refresh()"> بروزرسانی </UButton>
				</div>
			</div>
		</UCard>
	</div>
</template>
