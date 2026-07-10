<script setup lang="ts">
const profile = useProfile();

const isOpen = ref(false);
const rootEl = useTemplateRef('rootEl');

onClickOutside(rootEl, () => {
	isOpen.value = false;
});

const activeVillage = computed(() => profile.data?.villages?.find(v => v.isActive));

const select = async (id: string) => {
	isOpen.value = false;
	villageId.value = id;
	await move();
	await profile.updateData();
	await profile.execute();
};

const toStringCoordinates = ([x, y]: [number, number]) => `(${x}|${y})`;

const villageId = ref();
const { execute: move } = useFetch(() => `/api/village/move`, {
	onRequest: ({ options }) => {
		options.body = { id: villageId.value };
	},
	method: 'POST',
	immediate: false,
});
</script>

<template>
	<div
		ref="rootEl"
		v-if="activeVillage"
		class="relative"
	>
		<button
			type="button"
			class="border-border bg-surface hover:bg-surface-2 flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors sm:w-64"
			:aria-expanded="isOpen"
			@click="isOpen = !isOpen"
		>
			<span
				class="bg-surface-3 text-text-muted flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-semibold"
			>
				{{ activeVillage.name.slice(0, 1) }}
			</span>
			<span class="min-w-0 flex-1">
				<span class="flex items-center gap-1.5">
					<span class="text-text truncate text-sm font-medium">{{ activeVillage.name }}</span>
					<span
						v-if="activeVillage.isCapital"
						class="bg-crop-soft text-crop rounded px-1.5 py-0.5 text-[10px] font-medium"
						>Capital</span
					>
				</span>
				<span class="text-text-muted block truncate font-mono text-[11px]">
					{{ toStringCoordinates(activeVillage.coordinates) }}</span
				>
			</span>
			<svg
				viewBox="0 0 24 24"
				class="text-text-muted h-4 w-4 shrink-0 transition-transform"
				:class="{ 'rotate-180': isOpen }"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</button>

		<div
			v-if="isOpen"
			class="border-border bg-surface-2 absolute top-[calc(100%+6px)] left-0 z-30 w-full min-w-[16rem] overflow-hidden rounded-lg border py-1 shadow-xl shadow-black/40 sm:w-72"
		>
			<button
				v-for="village in profile.data?.villages"
				:key="village.id"
				type="button"
				class="hover:bg-surface-3 flex w-full items-center gap-2 px-3 py-2 text-left transition-colors"
				:class="{ 'bg-surface-3': village.isActive }"
				@click="select(village.id)"
			>
				<span
					class="bg-surface-3 text-text-muted flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-semibold"
				>
					{{ village.name.slice(0, 1) }}
				</span>
				<span class="min-w-0 flex-1">
					<span class="flex items-center gap-1.5">
						<span class="text-text truncate text-sm font-medium">
							{{ village.name }}
						</span>
						<span
							v-if="village.isCapital"
							class="bg-crop-soft text-crop rounded px-1.5 py-0.5 text-[10px] font-medium"
						>
							Capital
						</span>
					</span>
					<span class="text-text-muted block truncate font-mono text-[11px]"
						>{{ toStringCoordinates(village.coordinates) }} · Pop {{ village.population }}
					</span>
				</span>
				<svg
					v-if="village.isActive"
					viewBox="0 0 24 24"
					class="text-run h-4 w-4 shrink-0"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M20 6 9 17l-5-5" />
				</svg>
			</button>
		</div>
	</div>
</template>
