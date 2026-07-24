<script setup lang="ts">
import { capitalize } from 'es-toolkit';

const farm = useFarm();

const resourses = ['wood', 'clay', 'iron', 'crop'] as const;
const items = computed(() =>
	resourses.map(r => ({
		key: r,
		label: capitalize(r),
		value: farm.data?.resourses[r].value,
		rate: farm.data?.production[r],
		cap: farm.data?.resourses[r].capacity,
		color: `var(--color-${r})`,
		soft: `var(--color-${r}-soft)`,
	})),
);
</script>

<template>
	<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
		<div
			v-for="item in items"
			:key="item.key"
			class="rounded-card border-border bg-surface flex items-center gap-3 border px-3 py-2.5"
		>
			<span
				class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
				:style="{ backgroundColor: item.soft, color: item.color }"
			>
				<Icon
					v-if="item.key === 'wood'"
					class="h-4 w-4"
					name="icon:wood"
				/>
				<Icon
					v-else-if="item.key === 'clay'"
					class="h-4 w-4"
					name="icon:clay"
				/>
				<Icon
					v-else-if="item.key === 'iron'"
					class="h-4 w-4"
					name="icon:iron"
				/>
				<Icon
					v-else
					class="h-4 w-4"
					name="icon:crop"
				/>
			</span>
			<div class="min-w-0">
				<p class="text-text truncate font-mono text-sm leading-tight font-semibold">
					{{ formatNumber(item.value)
					}}<span class="text-text-faint">/{{ formatNumber(item.cap) }}</span>
				</p>
				<p class="text-text-muted truncate text-[11px]">
					{{ item.label }} · <span class="font-mono">+{{ formatNumber(item.rate) }}/h</span>
				</p>
			</div>
		</div>

		<div class="rounded-card border-border bg-surface flex items-center gap-3 border px-3 py-2.5">
			<span
				class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
				:style="{ backgroundColor: 'var(--color-pop-soft)', color: 'var(--color-pop)' }"
			>
				<Icon
					class="h-4 w-4"
					name="icon:population"
				/>
			</span>
			<div class="min-w-0">
				<p class="text-text truncate font-mono text-sm leading-tight font-semibold">
					{{ formatNumber(farm.data?.resourses.population.value) }}
				</p>
				<p class="text-text-muted truncate text-[11px]">Population</p>
			</div>
		</div>
	</div>
</template>
