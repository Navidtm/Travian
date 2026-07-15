<script setup lang="ts">
const { troops, blacksmiths, overviewStats, armyStatistics } = useArmyData();

// Brief loading state so the troop grid's skeleton cards are demonstrated on
// first mount and whenever the tribe changes (mirrors a real async fetch).
const isLoading = ref(true);

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
