<script setup lang="ts">
const { selectedTribe, troops, blacksmiths, overviewStats, armyStatistics, setTribe } =
	useArmyData();

const tribes: { key: Tribe; label: string }[] = [
	{ key: 'romans', label: 'Romans' },
	{ key: 'gauls', label: 'Gauls' },
	{ key: 'teutons', label: 'Teutons' },
	{ key: 'egyptians', label: 'Egyptians' },
	{ key: 'huns', label: 'Huns' },
];

// Brief loading state so the troop grid's skeleton cards are demonstrated on
// first mount and whenever the tribe changes (mirrors a real async fetch).
const isLoading = ref(true);

const loadTribe = (tribe: Tribe) => {
	setTribe(tribe);
	isLoading.value = true;
	// TODO: replace with the real per-tribe army fetch; simulated delay for now.
	setTimeout(() => {
		isLoading.value = false;
	}, 400);
};

onMounted(() => {
	setTimeout(() => {
		isLoading.value = false;
	}, 400);
});

// TODO: wire these handlers to the real training/upgrade/research endpoints.
const onTrain = (_id: string) => {};
const onUpgrade = (_id: string) => {};
const onResearch = (_id: string) => {};
const onBlacksmithUpgrade = (_troopName: string) => {};
</script>

<template>
	<div class="flex flex-col gap-5">
		<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
			<div class="mb-1 flex items-center justify-between gap-3">
				<h2 class="text-text text-sm font-semibold">Army Management</h2>
			</div>
			<p class="text-text-muted mb-3 text-[12px]">Adapts automatically to the selected tribe</p>
			<div class="flex flex-wrap gap-1.5">
				<button
					v-for="tribe in tribes"
					:key="tribe.key"
					type="button"
					class="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
					:class="
						selectedTribe === tribe.key
							? 'bg-text text-bg'
							: 'border-border bg-surface-2 text-text-muted hover:bg-surface-3 border'
					"
					@click="loadTribe(tribe.key)"
				>
					{{ tribe.label }}
				</button>
			</div>
		</section>

		<MilitaryPowerOverview :stats="overviewStats" />

		<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
			<h2 class="text-text mb-4 text-sm font-semibold">Troops</h2>
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
				<template v-if="isLoading">
					<SkeletonCard
						v-for="i in 5"
						:key="i"
						:lines="4"
					/>
				</template>
				<TroopCard
					v-else
					v-for="troop in troops"
					:key="troop.id"
					:troop="troop"
					@train="onTrain"
					@upgrade="onUpgrade"
					@research="onResearch"
				/>
			</div>
		</section>

		<BlacksmithCard
			:entries="blacksmiths!"
			@upgrade="onBlacksmithUpgrade"
		/>

		<ArmyStatistics :stats="armyStatistics" />
	</div>
</template>
