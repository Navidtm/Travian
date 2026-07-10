<script setup lang="ts">
const {
	currentTask,
	nextTask,
	queuedTasks,
	activityLog,
	runState,
	setActiveVillage,
	upgradeAllFields,
	upgradeEverything,
	togglePause,
	stopAutomation,
} = useVillageData();
</script>

<template>
	<div>
		<TopBar
			@select-village="setActiveVillage"
			@upgrade-everything="upgradeEverything"
		/>

		<main class="mx-auto max-w-350 space-y-5 px-4 py-5 lg:px-8 lg:py-6">
			<!-- <VillageCommandCenter /> -->
			<div class="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
				<div class="flex flex-col gap-5">
					<ResourceFieldsCard @upgrade-all="upgradeAllFields" />
					<BuildingsGrid />
				</div>

				<div class="lg:sticky lg:top-33">
					<AutomationPanel
						:current-task="currentTask"
						:next-task="nextTask"
						:queued-tasks="queuedTasks"
						:run-state="runState"
						@toggle-pause="togglePause"
						@stop="stopAutomation"
					/>
				</div>
			</div>

			<div class="">
				<ActivityLog :entries="activityLog" />
			</div>
		</main>
	</div>
</template>
