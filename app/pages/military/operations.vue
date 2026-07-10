<script setup lang="ts">
import { useMilitaryData } from '~/composables/useMilitaryData';

const {
	targetGroups,
	groupVillageCount,
	farmTargets,
	removeFarmTarget,
	attackTemplates,
	farmingJobs,
	toggleFarmingJob,
	operations,
	pauseOperation,
	resumeOperation,
	stopOperation,
	militaryLog,
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
					<p class="text-text-muted text-[11px] leading-tight">Attacks and farming automation</p>
				</div>
				<MilitaryTabs active="operations" />
			</div>
		</header>

		<main class="mx-auto flex max-w-350 flex-col gap-5 px-4 py-5 lg:px-8 lg:py-6">
			<TargetGroupsCard
				:groups="targetGroups"
				:village-count="groupVillageCount"
			/>

			<TargetListTable
				:targets="farmTargets"
				@delete="removeFarmTarget"
			/>

			<AttackTemplatesCard :templates="attackTemplates" />

			<FarmingSchedulerCard
				:jobs="farmingJobs"
				:groups="targetGroups"
				:templates="attackTemplates"
				@toggle-job="toggleFarmingJob"
			/>

			<ActiveOperationsGrid
				:operations="operations"
				@pause="pauseOperation"
				@resume="resumeOperation"
				@stop="stopOperation"
			/>

			<ActivityLog :entries="militaryLog" />
		</main>
	</div>
</template>
