<script setup lang="ts">
import ResourceOverview from '~/components/ResourceOverview.vue';
import VillageSelector from '~/components/VillageSelector.vue';
import type { Village } from '~/types';

defineProps<{
	villages: Village[];
	activeVillage: Village;
	activeId: string;
}>();

defineEmits<{
	(e: 'select-village', id: string): void;
	(e: 'upgrade-everything'): void;
}>();
</script>

<template>
	<header
		class="sticky top-0 z-20 border-b border-border bg-bg/95 backdrop-blur"
	>
		<div class="mx-auto flex max-w-350 flex-col gap-3 px-4 py-3 lg:px-8 lg:py-4">
			<div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
				<div class="flex items-center gap-3">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-run-soft text-run"
					>
						<svg
							viewBox="0 0 24 24"
							class="size-4.5"
							fill="none"
							stroke="currentColor"
							stroke-width="1.8"
						>
							<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
						</svg>
					</div>
					<div class="hidden sm:block">
						<p class="text-sm font-semibold leading-tight text-text"
							>Automation Panel</p
						>
						<p class="text-[11px] leading-tight text-(--color-text-muted)"
							>Village control console</p
						>
					</div>
				</div>

				<VillageSelector
					:villages="villages"
					:active-id="activeId"
					@select="id => $emit('select-village', id)"
				/>

				<button
					type="button"
					class="inline-flex items-center justify-center gap-2 rounded-lg bg-text px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90 active:opacity-80"
					@click="$emit('upgrade-everything')"
				>
					<svg
						viewBox="0 0 24 24"
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M12 19V5M5 12l7-7 7 7" />
					</svg>
					Upgrade Everything to Target
				</button>
			</div>

			<ResourceOverview :village="activeVillage" />
		</div>
	</header>
</template>
