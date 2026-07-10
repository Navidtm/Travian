<script setup lang="ts">
defineProps<{ templates: AttackTemplate[] }>();

defineEmits<{ (e: 'create-template'): void }>();
</script>

<template>
	<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
		<div class="mb-4 flex items-center justify-between gap-3">
			<div>
				<h2 class="text-text text-sm font-semibold">Attack Templates</h2>
				<p class="text-text-muted text-[12px]">Reusable troop compositions for operations</p>
			</div>
			<button
				type="button"
				class="border-border bg-surface-2 text-text hover:bg-surface-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
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
				class="border-border-soft bg-surface-2 flex flex-col gap-2.5 rounded-lg border p-3.5"
			>
				<div>
					<p class="text-text text-sm font-medium">{{ template.name }}</p>
					<p
						v-if="template.description"
						class="text-text-muted text-[11px]"
						>{{ template.description }}</p
					>
				</div>
				<ul class="space-y-1">
					<li
						v-for="line in template.troops"
						:key="line.troopName"
						class="text-text-muted flex items-center justify-between font-mono text-xs"
					>
						<span>{{ line.troopName }}</span>
						<span class="text-text">{{ line.quantity }}</span>
					</li>
				</ul>
			</article>
		</div>
	</section>
</template>
