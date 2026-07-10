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
	<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
		<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-text text-sm font-semibold">Village Command Center</h2>
				<p class="text-text-muted text-[12px]"
					>Live overview of every troop, hero and merchant movement</p
				>
			</div>
			<div class="flex flex-wrap gap-2">
				<span
					v-for="group in groups"
					:key="group.key"
					class="bg-surface-2 text-text-muted rounded-full px-2.5 py-1 text-[11px] font-medium"
				>
					{{ group.label }}
					<span class="text-text font-mono">({{ groupCounts[group.key] }})</span>
				</span>
			</div>
		</div>

		<div class="flex flex-col gap-3">
			<div
				v-for="group in groups"
				:key="group.key"
				class="border-border-soft rounded-lg border"
			>
				<button
					type="button"
					class="flex w-full items-center justify-between px-3.5 py-2.5 text-left"
					:aria-expanded="expanded[group.key]"
					@click="expanded[group.key] = !expanded[group.key]"
				>
					<span class="text-text flex items-center gap-2 text-sm font-medium">
						{{ group.label }}
						<span
							class="bg-surface-3 text-text-muted rounded-full px-1.5 py-0.5 font-mono text-[10px]"
							>{{ groupCounts[group.key] }}</span
						>
					</span>
					<svg
						viewBox="0 0 24 24"
						class="text-text-muted h-4 w-4 transition-transform"
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
					class="border-border-soft space-y-2 border-t p-3"
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
