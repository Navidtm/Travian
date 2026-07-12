<script setup lang="ts">
import { capitalize } from 'es-toolkit';

// const { travelState } = useAdventuresData();

const startingId = ref<string | null>(null);

const { data: adventures, refresh } = useFetch('/api/hero/adventures');
const { execute: startAdventure } = useFetch(() => '/api/hero/adventures?id=' + startingId.value, {
	method: 'post',
	immediate: false,
});

const onStart = async (id: string) => {
	startingId.value = id;
	await startAdventure();
	startingId.value = null;
	await refresh();
};

const difficultyTone: Record<AdventureDifficulty, 'orange' | 'red'> = {
	medium: 'orange',
	hard: 'red',
};

const adventureColor = (adventure: Adventure) =>
	adventure.durationSeconds > 120
		? 'text-error'
		: adventure.durationSeconds > 60
			? 'text-orange-400'
			: 'text-done';

// Live countdown for the hero's current travel.
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

// const remainingSeconds = computed(() =>
// 	Math.max(0, Math.round((travelState.value.arrivalTimestamp - nowTick.value) / 1000)),
// );
// const travelProgress = computed(() => {
// 	const total = travelState.value.durationSeconds || 1;
// 	return Math.min(1, Math.max(0, 1 - remainingSeconds.value / total));
// });
// const returnTime = computed(() =>
// 	new Date(travelState.value.arrivalTimestamp).toLocaleTimeString('en-US', {
// 		hour12: false,
// 		hour: '2-digit',
// 		minute: '2-digit',
// 	}),
// );
</script>

<template>
	<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
		<div class="mb-3 flex items-center justify-between gap-2">
			<div>
				<h3 class="text-text text-sm font-medium">Hero Adventures</h3>
				<p class="text-text-muted text-[11px]">
					{{ adventures?.length }} available
					<span> &middot; next at {{ adventures?.[0]?.coordinates }}</span>
				</p>
			</div>
		</div>

		<!-- Hero currently traveling -->
		<!-- v-if="travelState.isTraveling" -->
		<!-- <div class="border-run-soft bg-run-soft/40 rounded-lg border p-3">
			<div class="mb-1.5 flex items-center justify-between">
				<StatusPill
					label="Hero Traveling"
					tone="blue"
				/>
				<span class="text-run font-mono text-[11px]"
					>{{ formatDuration(remainingSeconds) }} left</span
				>
			</div>
			<p class="text-text-muted mb-2 text-xs">Destination: {{ travelState.destination }}</p>
			<ProgressBar
				:progress="travelProgress"
				color="var(--color-run)"
			/>
			<p class="text-text-faint mt-1.5 text-[11px]">Returns at {{ returnTime }}</p>
		</div> -->

		<!-- Adventure list -->
		<EmptyState
			v-if="adventures?.length === 0"
			title="No adventures available"
			description="Check back once new adventures are discovered."
		/>
		<div
			v-else
			class="space-y-2"
		>
			<article
				v-for="adventure in adventures"
				:key="adventure.id"
				class="border-border-soft bg-surface-3/40 grid grid-cols-[70px_80px_120px_70px_150px] items-center justify-between gap-4 rounded-lg border p-2.5"
			>
				<p class="text-text truncate font-mono text-xs font-medium">
					{{ adventure.location }}
				</p>
				<div class="flex gap-2">
					<svg
						viewBox="0 0 24 24"
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
					>
						<path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
						<path d="M12 8v4l3 2" />
					</svg>
					<div
						class="flex items-center justify-between font-mono text-[11px]"
						:class="adventureColor(adventure)"
					>
						<span>{{ formatDuration(adventure.durationSeconds) }}</span>
					</div>
				</div>
				<p class="text-text truncate font-mono text-xs font-medium">
					{{ adventure.coordinates }}
				</p>
				<StatusPill
					:label="capitalize(adventure.difficulty)"
					:tone="difficultyTone[adventure.difficulty]"
				/>
				<button
					type="button"
					class="border-border bg-surface text-text hover:bg-surface-2 inline-flex items-center justify-center gap-1.5 rounded-lg border px-3.5 py-2.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
					:disabled="startingId === adventure.id"
					@click="onStart(adventure.id)"
				>
					<svg
						v-if="startingId === adventure.id"
						viewBox="0 0 24 24"
						class="h-3.5 w-3.5 animate-spin"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M20 11A8 8 0 1 0 18 16" />
						<path d="M20 5v6h-6" />
					</svg>
					Start Adventure
				</button>
			</article>
		</div>
	</section>
</template>
