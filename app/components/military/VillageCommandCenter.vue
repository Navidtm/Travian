<script setup lang="ts">
const { movements, groupCounts } = useMovementsData();

const groups: { key: MovementGroupKey; label: string }[] = [
	{ key: 'outgoing', label: 'Outgoing' },
	{ key: 'incoming', label: 'Incoming' },
	{ key: 'returning', label: 'Returning' },
	{ key: 'hero', label: 'Hero' },
	{ key: 'merchants', label: 'Merchants' },
];

const expanded = ref<Record<MovementGroupKey, boolean>>({
	outgoing: true,
	incoming: true,
	returning: false,
	hero: true,
	merchants: false,
});

const forGroup = (key: MovementGroupKey) => movements.filter(m => m.group === key);
</script>

<template>
	<section class="rounded-card border border-border bg-surface p-4 sm:p-5">
		<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-sm font-semibold text-text">Village Command Center</h2>
				<p class="text-[12px] text-text-muted"
					>Live overview of every troop, hero and merchant movement</p
				>
			</div>
			<div class="flex flex-wrap gap-2">
				<span
					v-for="group in groups"
					:key="group.key"
					class="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-text-muted"
				>
					{{ group.label }}
					<span class="font-mono text-text">({{ groupCounts[group.key] }})</span>
				</span>
			</div>
		</div>

		<div class="flex flex-col gap-3">
			<div
				v-for="group in groups"
				:key="group.key"
				class="rounded-lg border border-border-soft"
			>
				<button
					type="button"
					class="flex w-full items-center justify-between px-3.5 py-2.5 text-left"
					:aria-expanded="expanded[group.key]"
					@click="expanded[group.key] = !expanded[group.key]"
				>
					<span class="flex items-center gap-2 text-sm font-medium text-text">
						{{ group.label }}
						<span
							class="rounded-full bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-text-muted"
							>{{ groupCounts[group.key] }}</span
						>
					</span>
					<svg
						viewBox="0 0 24 24"
						class="h-4 w-4 text-text-muted transition-transform"
						:class="{ 'rotate-180': expanded[group.key] }"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				</button>

				<div
					v-show="expanded[group.key]"
					class="space-y-2 border-t border-border-soft p-3"
				>
					<MovementCard
						v-for="movement in forGroup(group.key)"
						:key="movement.id"
						:movement="movement"
					/>
					<MovementEmptyState
						v-if="forGroup(group.key).length === 0"
						:label="group.label"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
