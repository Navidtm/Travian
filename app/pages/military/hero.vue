<script setup lang="ts">
const { hero, experienceProgress, experienceRemaining, revive } = useHeroData();
</script>
<template>
	<div>
		<header class="sticky top-0 z-20 border-b border-border bg-bg/95 backdrop-blur">
			<div
				class="mx-auto flex max-w-350 flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-4"
			>
				<div>
					<p class="text-sm font-semibold leading-tight text-text">Army</p>
					<p class="text-[11px] leading-tight text-text-muted">Display Army</p>
				</div>
				<MilitaryTabs active="operations" />
			</div>
		</header>

		<main class="mx-auto flex max-w-350 flex-col gap-5 px-4 py-5 lg:px-8 lg:py-6">
			<HeroProfileCard
				:hero
				:experience-progress
				:experience-remaining
				@revive="revive"
			/>
		</main>
	</div>
</template>
