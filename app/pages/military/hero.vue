<script setup lang="ts">
const { data: hero } = useFetch('/api/hero/info');
</script>
<template>
	<div>
		<header class="border-border bg-bg/95 sticky top-0 z-20 border-b backdrop-blur">
			<div
				class="mx-auto flex max-w-350 flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-4"
			>
				<div>
					<p class="text-text text-sm leading-tight font-semibold">Hero</p>
					<p class="text-text-muted text-[11px] leading-tight"></p>
				</div>
				<MilitaryTabs active="operations" />
			</div>
		</header>

		<main class="flex max-w-150 flex-col gap-5 px-4 py-5 lg:px-8 lg:py-6">
			<HeroProfileCard :hero />
		</main>
	</div>
</template>
