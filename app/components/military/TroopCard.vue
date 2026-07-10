<script setup lang="ts">
import { formatDuration, formatNumber } from '~/composables/useVillageData';

const props = defineProps<{
	troop: TroopDefinition;
	/** Resolved via app/utils/assetMap.ts (getTroopImage); null src falls back to the icon below. */
	image?: { src: string | null; alt: string };
}>();

defineEmits<{
	(e: 'train', id: string): void;
	(e: 'upgrade', id: string): void;
	(e: 'research', id: string): void;
}>();

const isExpanded = ref(false);

const roleMeta: Record<
	TroopRole,
	{ label: string; tone: 'red' | 'blue' | 'gray' | 'orange' | 'green' }
> = {
	offensive: { label: 'Offensive', tone: 'red' },
	defensive: { label: 'Defensive', tone: 'blue' },
	scout: { label: 'Scout', tone: 'gray' },
	siege: { label: 'Siege', tone: 'orange' },
	support: { label: 'Support', tone: 'green' },
};

const trainingBuilding = computed(() => {
	switch (props.troop.role) {
		case 'siege':
			return 'Workshop';
		case 'defensive':
			return 'Barracks';
		case 'scout':
			return 'Barracks';
		default:
			return props.troop.speed >= 9 ? 'Stable' : 'Barracks';
	}
});

const trainingStatusLabel = computed(() => {
	switch (props.troop.trainingStatus) {
		case 'training':
			return 'Training';
		case 'queued':
			return 'Queued';
		default:
			return 'Idle';
	}
});
</script>

<template>
	<article
		class="group border-border-soft bg-surface-2 flex flex-col gap-3 rounded-lg border p-3.5 transition-transform hover:-translate-y-0.5"
	>
		<div class="flex items-start justify-between gap-2">
			<div class="flex items-center gap-3">
				<!-- Illustration placeholder (icon-based avatar in lieu of artwork) -->
				<span class="bg-surface-3 text-muted h-12 w-12 shrink-0 overflow-hidden rounded-xl">
					<AsyncImage
						:src="image?.src ?? null"
						:alt="image?.alt ?? troop.name"
						rounded="rounded-xl"
					>
						<template #fallback>
							<svg
								viewBox="0 0 24 24"
								class="h-6 w-6"
								fill="none"
								stroke="currentColor"
								stroke-width="1.6"
							>
								<path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
								<path d="M3 7l9 5 9-5" />
							</svg>
						</template>
					</AsyncImage>
				</span>
				<div class="min-w-0">
					<p class="text-text truncate text-sm font-medium">{{ troop.name }}</p>
					<StatusPill
						:label="roleMeta[troop.role].label"
						:tone="roleMeta[troop.role].tone"
					/>
				</div>
			</div>
		</div>

		<!-- Locked / research-not-done state -->
		<template v-if="!troop.isResearched">
			<div
				class="border-border flex flex-col items-center gap-2 rounded-lg border border-dashed px-3 py-5 text-center"
			>
				<span
					class="bg-surface-3 text-text-faint flex h-10 w-10 items-center justify-center rounded-full"
				>
					<svg
						viewBox="0 0 24 24"
						class="h-5 w-5"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
					>
						<rect
							x="5"
							y="10"
							width="14"
							height="10"
							rx="2"
						/>
						<path d="M8 10V7a4 4 0 0 1 8 0v3" />
					</svg>
				</span>
				<p class="text-text text-xs font-medium">Not Researched</p>
				<ul
					v-if="troop.requirements?.length"
					class="text-text-muted space-y-0.5 text-[11px]"
				>
					<li
						v-for="req in troop.requirements"
						:key="req"
						>{{ req }}</li
					>
				</ul>
				<p
					v-if="troop.requiredBuildings?.length"
					class="text-text-faint text-[11px]"
				>
					Requires: {{ troop.requiredBuildings.join(', ') }}
				</p>
				<p class="text-text-faint font-mono text-[11px]">
					Est. research time {{ formatDuration(troop.estimatedResearchSeconds) }}
				</p>
			</div>
			<button
				type="button"
				class="bg-text text-bg inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
				@click="$emit('research', troop.id)"
			>
				Research
			</button>
		</template>

		<!-- Researched: stats + training -->
		<template v-else>
			<div class="text-text-muted grid grid-cols-3 gap-2 font-mono text-[11px]">
				<div class="bg-surface-3 rounded-md px-2 py-1.5 text-center">
					<p class="text-text">{{ troop.attack }}</p>
					<p class="text-[10px]">Attack</p>
				</div>
				<div class="bg-surface-3 rounded-md px-2 py-1.5 text-center">
					<p class="text-text">{{ troop.defenseInfantry }}</p>
					<p class="text-[10px]">Def. Inf.</p>
				</div>
				<div class="bg-surface-3 rounded-md px-2 py-1.5 text-center">
					<p class="text-text">{{ troop.defenseCavalry }}</p>
					<p class="text-[10px]">Def. Cav.</p>
				</div>
				<div class="bg-surface-3 rounded-md px-2 py-1.5 text-center">
					<p class="text-text">{{ troop.speed }}</p>
					<p class="text-[10px]">Speed</p>
				</div>
				<div class="bg-surface-3 rounded-md px-2 py-1.5 text-center">
					<p class="text-text">{{ troop.carryCapacity }}</p>
					<p class="text-[10px]">Carry</p>
				</div>
				<div class="bg-surface-3 rounded-md px-2 py-1.5 text-center">
					<p class="text-text">{{ troop.cropConsumption }}</p>
					<p class="text-[10px]">Crop</p>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<span class="text-text-muted text-xs">Current count</span>
				<span class="text-text font-mono text-sm font-semibold">{{
					formatNumber(troop.currentCount)
				}}</span>
			</div>

			<div class="border-border-soft bg-surface-3/40 rounded-lg border p-2.5">
				<div class="mb-1.5 flex items-center justify-between">
					<StatusPill
						:label="trainingStatusLabel"
						:tone="troop.trainingStatus === 'training' ? 'blue' : 'gray'"
					/>
					<span
						v-if="troop.trainingStatus !== 'idle'"
						class="text-text-muted font-mono text-[11px]"
					>
						Queue: {{ troop.queueSize }}
					</span>
				</div>
				<template v-if="troop.trainingStatus === 'training'">
					<p class="text-text-muted mb-1 text-[11px]"
						>Training {{ troop.currentBatchQuantity }} units</p
					>
					<ProgressBar
						:progress="
							1 -
							troop.remainingTrainingSeconds /
								(troop.trainingTimeSeconds * troop.currentBatchQuantity || 1)
						"
						color="var(--color-run)"
					/>
					<p class="text-run mt-1 font-mono text-[11px]"
						>ETA {{ formatDuration(troop.remainingTrainingSeconds) }}</p
					>
				</template>
				<p
					v-else
					class="text-text-faint text-[11px]"
					>No active training batch</p
				>
			</div>

			<div class="grid grid-cols-2 gap-2">
				<button
					type="button"
					class="border-border bg-surface-3 text-text hover:bg-surface inline-flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors"
					@click="$emit('train', troop.id)"
				>
					Train
				</button>
				<button
					type="button"
					class="border-border bg-surface-3 text-text hover:bg-surface inline-flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors"
					@click="$emit('upgrade', troop.id)"
				>
					Upgrade
				</button>
			</div>

			<button
				type="button"
				class="text-text-muted hover:bg-surface-3 hover:text-text flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors"
				@click="isExpanded = !isExpanded"
			>
				View Details
				<svg
					viewBox="0 0 24 24"
					class="h-3.5 w-3.5 transition-transform"
					:class="{ 'rotate-180': isExpanded }"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</button>

			<div
				v-if="isExpanded"
				class="border-border-soft text-text-muted space-y-2 border-t pt-3 text-[11px]"
			>
				<div class="flex justify-between"
					><span>Upkeep</span
					><span class="text-text font-mono">{{ troop.cropConsumption }} crop</span></div
				>
				<div class="flex justify-between"
					><span>Training building</span><span class="text-text">{{ trainingBuilding }}</span></div
				>
				<div class="flex justify-between"
					><span>Required buildings</span
					><span class="text-text">{{
						troop.requiredBuildings?.join(', ') || trainingBuilding
					}}</span></div
				>
				<!-- TODO: replace with real upgrade history once the blacksmith API is wired up -->
				<div class="flex justify-between"
					><span>Upgrade history</span><span class="text-text">Last upgraded 3 days ago</span></div
				>
				<div class="flex justify-between"
					><span>Current bonuses</span
					><span class="text-text">Blacksmith attack bonus applied</span></div
				>
			</div>
		</template>
	</article>
</template>
