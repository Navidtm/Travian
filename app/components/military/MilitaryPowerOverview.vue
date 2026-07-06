<script setup lang="ts">
import OverviewStatCard from '~/components/ui/OverviewStatCard.vue';
import type { MilitaryOverviewStat } from '~/types/army';

defineProps<{ stats: MilitaryOverviewStat[] }>();
</script>

<template>
	<section
		class="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5"
	>
		<h2 class="mb-4 text-sm font-semibold text-[var(--color-text)]">Military Power Overview</h2>
		<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
			<OverviewStatCard
				v-for="stat in stats"
				:key="stat.id"
				:label="stat.label"
				:value="stat.value"
				:subtitle="stat.subtitle"
				:color-var="stat.colorVar"
				:trend="stat.trend"
			/>
		</div>
	</section>
</template>
