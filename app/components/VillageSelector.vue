<script setup lang="ts">
import { onClickOutside } from '~/composables/useOnClickOutside';

const { data } = useFetch('/api/profile');

const emit = defineEmits<{ (e: 'select', id: string): void }>();

const isOpen = ref(false);
const rootEl = ref<HTMLElement | null>(null);

onClickOutside(rootEl, () => {
	isOpen.value = false;
});

const activeVillage = computed(() => data.value?.villages?.find(v => v.isActive));

const select = (id: string) => {
	emit('select', id);
	isOpen.value = false;
};

const toStringCoordinates = ([x, y]: [number, number]) => `(${x}|${y})`;
</script>

<template>
	<div
		ref="rootEl"
		v-if="activeVillage"
		class="relative"
	>
		<button
			type="button"
			class="flex w-full items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-left transition-colors hover:bg-surface-2 sm:w-64"
			:aria-expanded="isOpen"
			@click="isOpen = !isOpen"
		>
			<span
				class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-3 text-[11px] font-mono font-semibold text-text-muted"
			>
				{{ activeVillage.name.slice(0, 1) }}
			</span>
			<span class="min-w-0 flex-1">
				<span class="flex items-center gap-1.5">
					<span class="truncate text-sm font-medium text-text">{{ activeVillage.name }}</span>
					<span
						v-if="activeVillage.isCapital"
						class="rounded bg-crop-soft px-1.5 py-0.5 text-[10px] font-medium text-crop"
						>Capital</span
					>
				</span>
				<span class="block truncate font-mono text-[11px] text-text-muted">{{
					toStringCoordinates(activeVillage.coordinates)
				}}</span>
			</span>
			<svg
				viewBox="0 0 24 24"
				class="h-4 w-4 shrink-0 text-text-muted transition-transform"
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
			class="absolute left-0 top-[calc(100%+6px)] z-30 w-full min-w-[16rem] overflow-hidden rounded-lg border border-border bg-surface-2 py-1 shadow-xl shadow-black/40 sm:w-72"
		>
			<button
				v-for="village in data?.villages"
				:key="village.id"
				type="button"
				class="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-surface-3"
				:class="{ 'bg-surface-3': village.isActive }"
				@click="select(village.id)"
			>
				<span
					class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-3 text-[11px] font-mono font-semibold text-text-muted"
				>
					{{ village.name.slice(0, 1) }}
				</span>
				<span class="min-w-0 flex-1">
					<span class="flex items-center gap-1.5">
						<span class="truncate text-sm font-medium text-text">{{ village.name }}</span>
						<span
							v-if="village.isCapital"
							class="rounded bg-crop-soft px-1.5 py-0.5 text-[10px] font-medium text-crop"
							>Capital</span
						>
					</span>
					<span class="block truncate font-mono text-[11px] text-text-muted"
						>{{ toStringCoordinates(village.coordinates) }} · Pop {{ village.population }}</span
					>
				</span>
				<svg
					v-if="village.isActive"
					viewBox="0 0 24 24"
					class="h-4 w-4 shrink-0 text-run"
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
