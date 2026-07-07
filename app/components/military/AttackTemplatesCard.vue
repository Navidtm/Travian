<script setup lang="ts">
defineProps<{ templates: AttackTemplate[] }>();

defineEmits<{ (e: 'create-template'): void }>();
</script>

<template>
	<section class="rounded-card border border-border bg-surface p-4 sm:p-5">
		<div class="mb-4 flex items-center justify-between gap-3">
			<div>
				<h2 class="text-sm font-semibold text-text">Attack Templates</h2>
				<p class="text-[12px] text-text-muted">Reusable troop compositions for operations</p>
			</div>
			<button
				type="button"
				class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface-3"
				@click="$emit('create-template')"
			>
				<svg
					viewBox="0 0 24 24"
					class="h-3.5 w-3.5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M12 5v14M5 12h14" />
				</svg>
				New Template
			</button>
		</div>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
			<article
				v-for="template in templates"
				:key="template.id"
				class="flex flex-col gap-2.5 rounded-lg border border-border-soft bg-surface-2 p-3.5"
			>
				<div>
					<p class="text-sm font-medium text-text">{{ template.name }}</p>
					<p
						v-if="template.description"
						class="text-[11px] text-text-muted"
						>{{ template.description }}</p
					>
				</div>
				<ul class="space-y-1">
					<li
						v-for="line in template.troops"
						:key="line.troopName"
						class="flex items-center justify-between font-mono text-xs text-text-muted"
					>
						<span>{{ line.troopName }}</span>
						<span class="text-text">{{ line.quantity }}</span>
					</li>
				</ul>
			</article>
		</div>
	</section>
</template>
