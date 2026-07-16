<script setup lang="ts">
const building = useBuilding();

const progress = (b: Building) => Math.min(1, b.currentLevel / b.targetLevel);

const activeCount = computed(
	() => building.data?.filter(b => b.status === 'upgrading' || b.status === 'queued').length,
);
</script>

<template>
	<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
		<div class="mb-4 flex items-center justify-between gap-3">
			<div>
				<h2 class="text-text text-sm font-semibold">Buildings</h2>
				<p class="text-text-muted text-[12px]"> {{ activeCount }} in automation queue </p>
			</div>
			<button
				type="button"
				class="border-border bg-surface-2 text-text hover:bg-surface-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
				@click="building.upgrade()"
			>
				<Icon name="mdi:arrow-up" />
				Upgrade All
			</button>
		</div>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
			<article
				v-for="b in building.data"
				:key="b.id"
				class="border-border-soft bg-surface-2 flex flex-col gap-3 rounded-lg border p-3.5"
			>
				<div class="flex items-start justify-between gap-2">
					<div class="flex min-w-0 items-baseline gap-2">
						<span class="text-text truncate text-sm font-medium">{{ b.name }}</span>
						<span class="text-text-faint font-mono text-xs">#{{ b.slot }}</span>
					</div>
					<StatusBadge :status="b.status" />
				</div>

				<div>
					<div class="mb-1 flex items-baseline justify-between">
						<span class="text-text font-mono text-xs font-semibold">
							Lv. {{ b.currentLevel }}
							<span class="text-text-faint">/ {{ b.targetLevel }}</span>
						</span>
						<span
							v-if="b.status === 'upgrading'"
							class="text-run font-mono text-[11px]"
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
