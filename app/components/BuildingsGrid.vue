<script setup lang="ts">
import { computed } from 'vue';

import { formatDuration } from '~/composables/useVillageData';

const props = defineProps<{ buildings?: Building[] }>();

const progress = (b: Building) => Math.min(1, b.currentLevel / b.targetLevel);

const activeCount = computed(
	() => props.buildings?.filter(b => b.status === 'upgrading' || b.status === 'queued').length,
);
</script>

<template>
	<section class="rounded-card border border-border bg-surface p-4 sm:p-5">
		<div class="mb-4 flex items-center justify-between gap-3">
			<div>
				<h2 class="text-sm font-semibold text-text">Buildings</h2>
				<p class="text-[12px] text-(--color-text-muted)"> {{ activeCount }} in automation queue </p>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
			<article
				v-for="b in buildings"
				:key="b.id"
				class="flex flex-col gap-3 rounded-lg border border-border-soft bg-surface-2 p-3.5"
			>
				<div class="flex items-start justify-between gap-2">
					<div class="min-w-0 flex items-baseline gap-2">
						<span class="truncate text-sm font-medium text-text">{{ b.name }}</span>
						<span class="font-mono text-xs text-text-faint">#{{ b.slot }}</span>
					</div>
					<StatusBadge :status="b.status" />
				</div>

				<div>
					<div class="mb-1 flex items-baseline justify-between">
						<span class="font-mono text-xs font-semibold text-text">
							Lv. {{ b.currentLevel }}
							<span class="text-text-faint">/ {{ b.targetLevel }}</span>
						</span>
						<span
							v-if="b.status === 'upgrading'"
							class="font-mono text-[11px] text-run"
						>
							ETA {{ formatDuration(b.etaSeconds) }}
						</span>
					</div>
					<ProgressBar
						:progress="progress(b)"
						color="var(--color-run)"
					/>
				</div>
			</article>
		</div>
	</section>
</template>
