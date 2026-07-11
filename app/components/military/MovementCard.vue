<script setup lang="ts">
const props = defineProps<{ movement: Movement }>();

const isExpanded = ref(false);

// Local ticking clock so each card's countdown updates independently.
const nowTick = ref(Date.now());
let intervalId: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
	intervalId = setInterval(() => {
		nowTick.value = Date.now();
	}, 1000);
});
onBeforeUnmount(() => {
	if (intervalId) clearInterval(intervalId);
});

const remainingSeconds = computed(() =>
	Math.max(0, Math.round((props.movement.arrivalTimestamp - nowTick.value) / 1000)),
);

const progress = computed(() => {
	const total = props.movement.durationSeconds || 1;
	return Math.min(1, Math.max(0, 1 - remainingSeconds.value / total));
});

const typeMeta: Record<MovementType, { label: string; color: string; icon: string }> = {
	attack: { label: 'Attack', color: 'var(--color-error)', icon: 'sword' },
	raid: { label: 'Raid', color: '#fb923c', icon: 'sword' },
	'reinforcement-sent': { label: 'Reinforcement Sent', color: 'var(--color-run)', icon: 'shield' },
	'reinforcement-received': {
		label: 'Reinforcement Received',
		color: 'var(--color-run)',
		icon: 'shield',
	},
	'hero-adventure': { label: 'Hero Adventure', color: '#c084fc', icon: 'hero' },
	'hero-returning': { label: 'Hero Returning', color: '#c084fc', icon: 'hero' },
	'merchant-sent': { label: 'Merchant Sent', color: 'var(--color-done)', icon: 'cart' },
	'merchant-returning': { label: 'Merchant Returning', color: 'var(--color-done)', icon: 'cart' },
	settlers: { label: 'Settlers', color: 'var(--color-crop)', icon: 'flag' },
	scout: { label: 'Scout Mission', color: 'var(--color-iron)', icon: 'eye' },
};

const statusMeta: Record<
	MovementStatus,
	{ label: string; tone: 'gray' | 'blue' | 'orange' | 'purple' | 'green' }
> = {
	preparing: { label: 'Preparing', tone: 'gray' },
	traveling: { label: 'Traveling', tone: 'blue' },
	arriving: { label: 'Arriving', tone: 'orange' },
	returning: { label: 'Returning', tone: 'purple' },
	completed: { label: 'Completed', tone: 'green' },
};

const meta = computed(() => typeMeta[props.movement.type]);
const status = computed(() => statusMeta[props.movement.status]);

const tribeLabel: Record<Tribe, string> = {
	romans: 'Romans',
	gauls: 'Gauls',
	teutons: 'Teutons',
	egyptians: 'Egyptians',
	huns: 'Huns',
};
</script>

<template>
	<article class="border-border-soft bg-surface-2 rounded-lg border transition-colors">
		<button
			type="button"
			class="flex w-full items-center gap-3 p-3.5 text-left"
			:aria-expanded="isExpanded"
			@click="isExpanded = !isExpanded"
		>
			<!-- Large movement icon -->
			<span
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
				:style="{ backgroundColor: meta.color + '1a', color: meta.color }"
			>
				<svg
					v-if="meta.icon === 'sword'"
					viewBox="0 0 24 24"
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<path d="M14.5 2 22 9.5 12 19.5 9 21l1.5-3L20.5 8" />
					<path d="M3 21l4-4" />
				</svg>
				<svg
					v-else-if="meta.icon === 'shield'"
					viewBox="0 0 24 24"
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
				</svg>
				<svg
					v-else-if="meta.icon === 'hero'"
					viewBox="0 0 24 24"
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<circle
						cx="12"
						cy="8"
						r="3.5"
					/>
					<path d="M5 20a7 7 0 0 1 14 0" />
				</svg>
				<svg
					v-else-if="meta.icon === 'cart'"
					viewBox="0 0 24 24"
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<circle
						cx="9"
						cy="20"
						r="1.4"
					/>
					<circle
						cx="18"
						cy="20"
						r="1.4"
					/>
					<path d="M3 4h2l2.2 11h11l1.8-7H6.4" />
				</svg>
				<svg
					v-else-if="meta.icon === 'flag'"
					viewBox="0 0 24 24"
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<path d="M5 21V4h13l-3 4 3 4H5" />
				</svg>
				<svg
					v-else
					viewBox="0 0 24 24"
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
					<circle
						cx="12"
						cy="12"
						r="2.5"
					/>
				</svg>
			</span>

			<div class="min-w-0 flex-1">
				<div class="flex flex-wrap items-center gap-2">
					<p class="text-text text-sm font-medium">{{ meta.label }}</p>
					<StatusPill
						:label="status.label"
						:tone="status.tone"
					/>
					<span
						v-if="movement.hasHero"
						class="inline-flex items-center gap-1 rounded-full bg-purple-400/10 px-2 py-0.5 text-[10px] font-medium text-purple-400"
					>
						<svg
							viewBox="0 0 24 24"
							class="h-2.5 w-2.5"
							fill="currentColor"
						>
							<circle
								cx="12"
								cy="12"
								r="10"
							/>
						</svg>
						Hero
					</span>
				</div>
				<p class="text-text-muted) mt-0.5 truncate text-xs">
					{{ movement.sourceVillage }} <span class="text-text-faint">&rarr;</span>
					{{ movement.destinationVillage }}
					<span class="text-text-faint font-mono">{{ movement.coordinates }}</span>
				</p>
			</div>

			<div class="hidden shrink-0 items-center gap-2 sm:flex">
				<span class="bg-surface-3 text-text-muted rounded-md px-2 py-1 font-mono text-[10px]">
					{{ tribeLabel[movement.tribe] }}
				</span>
			</div>

			<svg
				viewBox="0 0 24 24"
				class="text-text-muted h-4 w-4 shrink-0 transition-transform"
				:class="{ 'rotate-180': isExpanded }"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</button>

		<div class="px-3.5 pb-3.5">
			<ProgressBar
				:progress="progress"
				:color="meta.color"
			/>
			<div
				class="text-text-muted mt-1.5 flex flex-wrap items-center justify-between gap-1 font-mono text-[11px]"
			>
				<span
					>Departs {{ movement.departureTime }} &middot; Arrives {{ movement.arrivalTime }}</span
				>
				<span :style="{ color: meta.color }">{{
					remainingSeconds > 0 ? formatDuration(remainingSeconds) + ' left' : 'Arriving'
				}}</span>
			</div>
		</div>

		<div
			v-if="isExpanded"
			class="border-border-soft space-y-3 border-t px-3.5 py-3.5"
		>
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
				<div>
					<p class="text-text-faint text-[10px] tracking-wide uppercase">Distance</p>
					<p class="text-text font-mono text-xs">{{ movement.distance.toFixed(1) }} fields</p>
				</div>
				<div>
					<p class="text-text-faint text-[10px] tracking-wide uppercase">Travel Duration</p>
					<p class="text-text font-mono text-xs">{{ formatDuration(movement.durationSeconds) }}</p>
				</div>
				<div v-if="movement.attackTemplate">
					<p class="text-text-faint text-[10px] tracking-wide uppercase">Template</p>
					<p class="text-text text-xs">{{ movement.attackTemplate }}</p>
				</div>
				<div v-if="movement.heroInfo">
					<p class="text-text-faint text-[10px] tracking-wide uppercase">Hero</p>
					<p class="text-text text-xs">{{ movement.heroInfo }}</p>
				</div>
			</div>

			<div v-if="movement.troops.length">
				<p class="text-text-faint mb-1.5 text-[10px] tracking-wide uppercase">Troop Composition</p>
				<ul class="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
					<li
						v-for="line in movement.troops"
						:key="line.troopName"
						class="bg-surface-3 text-text-muted flex items-center justify-between rounded-md px-2 py-1 font-mono text-[11px]"
					>
						<span>{{ line.troopName }}</span>
						<span class="text-text">{{ line.quantity }}</span>
					</li>
				</ul>
			</div>

			<div v-if="movement.resourcesCarried">
				<p class="text-text-faint mb-1.5 text-[10px] tracking-wide uppercase">Resources Carried</p>
				<div class="grid grid-cols-4 gap-1.5">
					<div
						class="bg-wood-soft text-wood rounded-md px-2 py-1 text-center font-mono text-[11px]"
						>{{ formatNumber(movement.resourcesCarried.wood) }}</div
					>
					<div
						class="bg-clay-soft text-clay rounded-md px-2 py-1 text-center font-mono text-[11px]"
						>{{ formatNumber(movement.resourcesCarried.clay) }}</div
					>
					<div
						class="bg-iron-soft text-iron rounded-md px-2 py-1 text-center font-mono text-[11px]"
						>{{ formatNumber(movement.resourcesCarried.iron) }}</div
					>
					<div
						class="bg-crop-soft text-crop rounded-md px-2 py-1 text-center font-mono text-[11px]"
						>{{ formatNumber(movement.resourcesCarried.crop) }}</div
					>
				</div>
			</div>

			<p
				v-if="movement.notes"
				class="text-text-muted text-xs italic"
				>{{ movement.notes }}</p
			>
		</div>
	</article>
</template>
