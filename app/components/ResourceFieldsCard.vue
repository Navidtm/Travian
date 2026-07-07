<script setup lang="ts">
const props = defineProps<{
	fields?: ResourceField[];
}>();

defineEmits<{ (e: 'upgrade-all'): void }>();

const colorFor: Record<ResourceType, string> = {
	wood: 'var(--color-wood)',
	clay: 'var(--color-clay)',
	iron: 'var(--color-iron)',
	crop: 'var(--color-crop)',
};

const labelFor: Record<ResourceType, string> = {
	wood: 'Woodcutter',
	clay: 'Clay Pit',
	iron: 'Iron Mine',
	crop: 'Cropland',
};

const groups = computed(() => {
	const order: ResourceType[] = ['wood', 'clay', 'iron', 'crop'];
	return order.map(type => {
		const items = props.fields?.filter(f => f.type === type);
		const pending = items?.filter(f => f.currentLevel < f.targetLevel).length;
		return { type, items, pending };
	});
});

const totalPending = computed(
	() => props.fields?.filter(f => f.currentLevel < f.targetLevel).length,
);

const progress = (field: ResourceField) => Math.min(1, field.currentLevel / field.targetLevel);
</script>

<template>
	<div class="image rounded-(--radius-card) overflow-hidden relative">
		<section class="border border-border bg-surface/40 p-4 sm:p-5">
			<div class="mb-4 flex items-center justify-between gap-3 z-10">
				<div>
					<h2 class="text-sm font-semibold text-text">Resource Fields</h2>
					<p class="text-[12px] text-text">
						{{ totalPending }} field{{ totalPending === 1 ? '' : 's' }} below target level
					</p>
				</div>
				<button
					type="button"
					class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface-3 disabled:cursor-not-allowed disabled:opacity-40"
					:disabled="totalPending === 0"
					@click="$emit('upgrade-all')"
				>
					<svg
						viewBox="0 0 24 24"
						class="h-3.5 w-3.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M12 19V5M5 12l7-7 7 7" />
					</svg>
					Upgrade All
				</button>
			</div>

			<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
				<div
					v-for="group in groups"
					:key="group.type"
					class="rounded-lg border border-border-soft backdrop-blur-[2px] bg-surface-2/60 px-6 py-4"
				>
					<div class="mb-2 flex items-center gap-2">
						<span
							class="h-2 w-2 rounded-full"
							:style="{ backgroundColor: colorFor[group.type] }"
						/>
						<h3 class="text-xs font-medium text-text">{{ labelFor[group.type] }}</h3>
						<span class="text-[11px] text-text-faint">{{ group.items?.length }} fields</span>
					</div>

					<ul class="space-y-2">
						<li
							v-for="field in group.items"
							:key="field.id"
							class="flex items-center gap-3 py-2"
						>
							<span class="shrink-0 font-mono text-[11px] text-text-faint">#{{ field.slot }}</span>
							<div class="min-w-0 flex-1">
								<div class="mb-1 flex items-baseline justify-between gap-2">
									<span class="font-mono text-xs font-semibold text-text">
										Lv. {{ field.currentLevel }}
										<span class="text-text-faint">/ {{ field.targetLevel }}</span>
									</span>
									<span
										v-if="field.currentLevel >= field.targetLevel"
										class="text-[10px] font-medium text-done"
										>On target</span
									>
									<span
										v-else
										class="text-[10px] text-(--color-text-muted)"
										>{{ Math.round(progress(field) * 100) }}%</span
									>
								</div>
								<ProgressBar
									:progress="progress(field)"
									:color="colorFor[group.type]"
								/>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</template>
<style scoped>
.image {
	background: url(/images/village.png);
}
</style>
