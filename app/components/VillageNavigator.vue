<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';

import VillageNameEditor from '~/components/VillageNameEditor.vue';
import { useVillageData, formatNumber } from '~/composables/useVillageData';

const renameVillage = (id: string, newName: string) =>
	new Promise(() => ({ success: true, error: 'string' })).then(v => ({
		success: true,
		error: 'string',
	}));
const activeVillageId = computed(() => '');

const profile = useProfile();
const villages = computed(() => profile.data?.villages);

const { setActiveVillage } = useVillageData();

const query = ref('');
const showResources = ref(false);
const cardRefs = ref<Record<string, HTMLElement | null>>({});

const farm = useFarm();

const filteredVillages = computed<Village[]>(() => {
	return [];
	// const q = query.value.trim().toLowerCase();
	// if (!q) return villages.value;
	// return villages.value;
	// return villages.value?.filter(v => v.name.toLowerCase().includes(q));
});

// Roving-tabindex keyboard navigation across the (possibly filtered) list.
const focusedId = ref(villages.value?.[0]?.id);

const setCardRef = (id: string, el: unknown) => {
	cardRefs.value[id] = el as HTMLElement | null;
};

const focusIndex = async (index: number) => {
	const list = filteredVillages.value ?? [];
	if (!list.length) return;
	const clamped = Math.max(0, Math.min(list.length - 1, index));
	focusedId.value = list[clamped]?.id;
	await nextTick();
	if (focusedId.value) cardRefs.value[focusedId.value]?.focus();
};

const onKeydown = (event: KeyboardEvent) => {
	const list = filteredVillages.value;
	const currentIndex = list.findIndex(v => v.id === focusedId.value);

	if (event.key === 'ArrowDown') {
		event.preventDefault();
		focusIndex(currentIndex + 1);
	} else if (event.key === 'ArrowUp') {
		event.preventDefault();
		focusIndex(currentIndex - 1);
	} else if (event.key === 'Enter' && focusedId.value) {
		event.preventDefault();
		setActiveVillage(focusedId.value);
	}
};

const selectVillage = (id: string) => {
	focusedId.value = id;
	setActiveVillage(id);
};

const handleRename = (id: string) => (newName: string) => renameVillage(id, newName);
</script>

<template>
	<div class="border-border flex flex-col gap-2 border-b px-3 py-3">
		<div class="flex items-center justify-between px-1">
			<p class="text-text-faint text-[11px] font-medium tracking-wide uppercase">Villages</p>
			<button
				type="button"
				class="text-text-faint hover:text-text-muted text-[10px] transition-colors"
				@click="showResources = !showResources"
			>
				{{ showResources ? 'Hide resources' : 'Show resources' }}
			</button>
		</div>

		<div class="relative px-1">
			<svg
				viewBox="0 0 24 24"
				class="text-text-faint pointer-events-none absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<circle
					cx="11"
					cy="11"
					r="7"
				/>
				<path d="m21 21-4.3-4.3" />
			</svg>
			<input
				v-model="query"
				type="text"
				placeholder="Search villages…"
				class="border-border bg-surface-2 text-text placeholder:text-text-faint focus:border-run w-full rounded-lg border py-1.5 pr-2.5 pl-8 text-xs"
				@keydown="onKeydown"
			/>
		</div>

		<div
			role="listbox"
			aria-label="Villages"
			class="flex max-h-80 flex-col gap-1.5 overflow-y-auto px-1 pb-0.5"
			@keydown="onKeydown"
		>
			<div
				v-for="village in filteredVillages"
				:key="village.id"
				:ref="el => setCardRef(village.id, el)"
				role="option"
				:aria-selected="village.id === activeVillageId"
				tabindex="0"
				class="group cursor-pointer rounded-lg border px-2.5 py-2 transition-colors focus:outline-none"
				:class="
					village.id === activeVillageId
						? 'border-run bg-run-soft'
						: 'bg-surface-2 hover:bg-surface-3 border-transparent'
				"
				@click="selectVillage(village.id)"
				@focus="focusedId = village.id"
			>
				<div class="flex items-start justify-between gap-1.5">
					<VillageNameEditor
						:name="village.name"
						:on-save="handleRename(village.id)"
					/>
					<span
						v-if="village.id === activeVillageId"
						class="bg-run mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
						aria-label="Active village"
					/>
				</div>

				<div class="text-text-muted mt-1 flex items-center gap-2 font-mono text-[10px]">
					<span>{{ village.coordinates }}</span>
					<span
						v-if="village.isCapital"
						class="bg-crop-soft text-crop rounded px-1 py-0.5 font-sans text-[9px] font-medium"
						>Capital</span
					>
					<span class="ml-auto">Pop {{ formatNumber(village.population) }}</span>
				</div>

				<div
					v-if="showResources"
					class="mt-1.5 grid grid-cols-4 gap-1 font-mono text-[9px]"
				>
					<span class="bg-wood-soft text-wood rounded px-1 py-0.5 text-center">{{
						formatNumber(farm.data?.resourses.wood.value)
					}}</span>
					<span class="bg-clay-soft text-clay rounded px-1 py-0.5 text-center">{{
						formatNumber(farm.data?.resourses.clay.value)
					}}</span>
					<span class="bg-iron-soft text-iron rounded px-1 py-0.5 text-center">{{
						formatNumber(farm.data?.resourses.iron.value)
					}}</span>
					<span class="bg-crop-soft text-crop rounded px-1 py-0.5 text-center">{{
						formatNumber(farm.data?.resourses.crop.value)
					}}</span>
				</div>
			</div>

			<p
				v-if="!filteredVillages.length"
				class="text-text-faint px-1 py-3 text-center text-[11px]"
			>
				No villages match "{{ query }}"
			</p>
		</div>
	</div>
</template>
