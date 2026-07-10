<script setup lang="ts">
const { availableAdventures, currentAdventureCount, nextAdventure, travelState, startAdventure } =
	useAdventuresData();

const startingId = ref<string | null>(null);

const onStart = async (id: string) => {
	startingId.value = id;
	await startAdventure(id);
	startingId.value = null;
};

const difficultyMeta: Record<
	AdventureDifficulty,
	{ label: string; tone: 'green' | 'orange' | 'red' }
> = {
	easy: { label: 'Easy', tone: 'green' },
	medium: { label: 'Medium', tone: 'orange' },
	hard: { label: 'Hard', tone: 'red' },
};

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

const remainingSeconds = computed(() =>
	Math.max(0, Math.round((travelState.value.arrivalTimestamp - nowTick.value) / 1000)),
);
const travelProgress = computed(() => {
	const total = travelState.value.durationSeconds || 1;
	return Math.min(1, Math.max(0, 1 - remainingSeconds.value / total));
});
const returnTime = computed(() =>
	new Date(travelState.value.arrivalTimestamp).toLocaleTimeString('en-US', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
	}),
);
</script>

<template>
	<div class="border-border-soft bg-surface-2 rounded-lg border p-3.5">
		<div class="mb-3 flex items-center justify-between gap-2">
			<div>
				<h3 class="text-text text-sm font-medium">Hero Adventures</h3>
				<p class="text-text-muted text-[11px]">
					{{ currentAdventureCount }} available
					<span v-if="nextAdventure"> &middot; next at {{ nextAdventure.coordinates }}</span>
				</p>
			</div>
		</div>

		<!-- Hero currently traveling -->
		<div
			v-if="travelState.isTraveling"
			class="border-run-soft bg-run-soft/40 rounded-lg border p-3"
		>
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
		</div>

		<!-- Adventure list -->
		<EmptyState
			v-else-if="availableAdventures.length === 0"
			title="No adventures available"
			description="Check back once new adventures are discovered."
		/>
		<div
			v-else
			class="grid grid-cols-1 gap-2 sm:grid-cols-2"
		>
			<article
				v-for="adventure in availableAdventures"
				:key="adventure.id"
				class="border-border-soft bg-surface-3/40 flex flex-col gap-2 rounded-lg border p-2.5"
			>
				<div class="flex items-center gap-2">
					<span
						class="bg-surface-3 text--muted flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg"
					>
						<AsyncImage
							:src="getAdventureIcon(adventure.difficulty).src"
							:alt="getAdventureIcon(adventure.difficulty).alt"
						>
							<template #fallback>
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
							</template>
						</AsyncImage>
					</span>
					<div class="min-w-0 flex-1">
						<p class="text-text truncate font-mono text-xs font-medium">{{
							adventure.coordinates
						}}</p>
						<StatusPill
							:label="difficultyMeta[adventure.difficulty].label"
							:tone="difficultyMeta[adventure.difficulty].tone"
						/>
					</div>
				</div>

				<div class="text-text-muted flex items-center justify-between font-mono text-[11px]">
					<span>{{ adventure.distance.toFixed(1) }} fields</span>
					<span>{{ formatDuration(adventure.durationSeconds) }}</span>
				</div>

				<p class="text-text-faint text-[11px]">{{ adventure.rewardPreview }}</p>

				<button
					type="button"
					class="border-border bg-surface text-text hover:bg-surface-2 inline-flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
					:disabled="travelState.isTraveling || startingId === adventure.id"
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
	</div>
</template>
