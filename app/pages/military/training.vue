<script setup lang="ts">
import { useMilitaryData } from '~/composables/useMilitaryData';

const {
	troopTypes,
	currentTraining,
	upcomingTraining,
	autoQueueEnabled,
	totalPendingTroops,
	updateTroopTarget,
	trainMissingTroops,
	toggleAutoQueue,
} = useMilitaryData();
</script>

<template>
	<div>
		<header class="border-border bg-bg/95 sticky top-0 z-20 border-b backdrop-blur">
			<div
				class="mx-auto flex max-w-350 flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-4"
			>
				<div>
					<p class="text-text text-sm leading-tight font-semibold">Military</p>
					<p class="text-text-muted text-[11px] leading-tight">Troop training automation</p>
				</div>
				<MilitaryTabs active="training" />
			</div>
		</header>

		<main class="mx-auto max-w-350 px-4 py-5 lg:px-8 lg:py-6">
			<div class="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
				<TroopRosterCard
					:troops="troopTypes"
					:auto-queue="autoQueueEnabled"
					:total-pending="totalPendingTroops"
					@update-target="updateTroopTarget"
					@train-missing="trainMissingTroops"
					@toggle-auto-queue="toggleAutoQueue"
				/>

				<div class="lg:sticky lg:top-33">
					<TrainingQueuePanel
						:current="currentTraining"
						:upcoming="upcomingTraining"
					/>
				</div>
			</div>
		</main>
	</div>
</template>
