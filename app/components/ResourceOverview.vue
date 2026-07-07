<script setup lang="ts">
import { formatNumber } from '~/composables/useVillageData';

const { data } = useFetch('/api/farm', {
	key: 'farm',
});

const items = computed(() => [
	{
		key: 'wood',
		label: 'Wood',
		value: data.value?.resourses.wood.value,
		rate: data.value?.production.wood,
		cap: data.value?.resourses.wood.capacity,
		color: 'var(--color-wood)',
		soft: 'var(--color-wood-soft)',
	},
	{
		key: 'clay',
		label: 'Clay',
		value: data.value?.resourses.clay.value,
		rate: data.value?.production.clay,
		cap: data.value?.resourses.clay.capacity,
		color: 'var(--color-clay)',
		soft: 'var(--color-clay-soft)',
	},
	{
		key: 'iron',
		label: 'Iron',
		value: data.value?.resourses.iron.value,
		rate: data.value?.production.iron,
		cap: data.value?.resourses.iron.capacity,
		color: 'var(--color-iron)',
		soft: 'var(--color-iron-soft)',
	},
	{
		key: 'crop',
		label: 'Crop',
		value: data.value?.resourses.crop.value,
		rate: data.value?.production.crop,
		cap: data.value?.resourses.crop.capacity,
		color: 'var(--color-crop)',
		soft: 'var(--color-crop-soft)',
	},
]);

const population = computed(() => ({
	value: data.value?.resourses.population.value,
	cap: data.value?.resourses.population.capacity,
}));
</script>

<template>
	<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
		<div
			v-for="item in items"
			:key="item.key"
			class="flex items-center gap-3 rounded-(--radius-card) border border-border bg-surface px-3 py-2.5"
		>
			<span
				class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
				:style="{ backgroundColor: item.soft, color: item.color }"
			>
				<svg
					v-if="item.key === 'wood'"
					viewBox="0 0 24 24"
					class="h-4 w-4"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<rect
						x="3"
						y="9"
						width="18"
						height="6"
						rx="1.5"
					/>
					<path d="M3 12h18" />
				</svg>
				<svg
					v-else-if="item.key === 'clay'"
					viewBox="0 0 24 24"
					class="h-4 w-4"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<path d="M12 3c3 3.5 6 7 6 10.5A6 6 0 0 1 6 13.5C6 10 9 6.5 12 3Z" />
				</svg>
				<svg
					v-else-if="item.key === 'iron'"
					viewBox="0 0 24 24"
					class="h-4 w-4"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
					<path d="M3 7l9 5 9-5M12 12v10" />
				</svg>
				<svg
					v-else
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<path d="M12 3v10M12 3c-2 1.5-3 3-3 5s1 2.5 3 3M12 3c2 1.5 3 3 3 5s-1 2.5-3 3M12 13v8" />
				</svg>
			</span>
			<div class="min-w-0">
				<p class="truncate font-mono text-sm font-semibold leading-tight text-text">
					{{ formatNumber(item.value)
					}}<span class="text-text-faint">/{{ formatNumber(item.cap) }}</span>
				</p>
				<p class="truncate text-[11px] text-(--color-text-muted)">
					{{ item.label }} · <span class="font-mono">+{{ formatNumber(item.rate) }}/h</span>
				</p>
			</div>
		</div>

		<div
			class="flex items-center gap-3 rounded-(--radius-card) border border-border bg-surface px-3 py-2.5"
		>
			<span
				class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
				:style="{ backgroundColor: 'var(--color-pop-soft)', color: 'var(--color-pop)' }"
			>
				<svg
					viewBox="0 0 24 24"
					class="h-4 w-4"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<circle
						cx="12"
						cy="8"
						r="3.2"
					/>
					<path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
				</svg>
			</span>
			<div class="min-w-0">
				<p class="truncate font-mono text-sm font-semibold leading-tight text-text">
					{{ formatNumber(population.value)
					}}<span class="text-text-faint">/{{ formatNumber(population.cap) }}</span>
				</p>
				<p class="truncate text-[11px] text-(--color-text-muted)">Population</p>
			</div>
		</div>
	</div>
</template>
