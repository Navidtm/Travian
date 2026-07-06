<script setup lang="ts">
defineProps<{ entries: ActivityLogEntry[] }>();

const isOpen = ref(true);

const levelMeta: Record<LogLevel, { color: string; label: string }> = {
	info: { color: 'var(--color-run)', label: 'INFO' },
	success: { color: 'var(--color-done)', label: 'OK' },
	warning: { color: 'var(--color-paused)', label: 'WARN' },
	error: { color: 'var(--color-error)', label: 'ERR' },
};
</script>

<template>
	<section class="rounded-(--radius-card) border border-border bg-surface">
		<button
			type="button"
			class="flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-5"
			:aria-expanded="isOpen"
			@click="isOpen = !isOpen"
		>
			<div class="flex items-center gap-2">
				<h2 class="text-sm font-semibold text-text">Activity Log</h2>
				<span
					class="rounded-full bg-surface-3 px-2 py-0.5 text-[11px] font-mono text-(--color-text-muted)"
					>{{ entries.length }}</span
				>
			</div>
			<svg
				viewBox="0 0 24 24"
				class="h-4 w-4 text-(--color-text-muted) transition-transform"
				:class="{ '-rotate-180': !isOpen }"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</button>

		<div
			v-show="isOpen"
			class="max-h-72 overflow-y-auto border-t border-border-soft px-4 py-3 font-mono text-xs sm:px-5"
		>
			<div
				v-for="entry in entries"
				:key="entry.id"
				class="flex items-start gap-3 py-1.5"
			>
				<span class="shrink-0 text-text-faint">{{ entry.time }}</span>
				<span
					class="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold"
					:style="{
						color: levelMeta[entry.level].color,
						backgroundColor: levelMeta[entry.level].color + '1a',
					}"
					>{{ levelMeta[entry.level].label }}</span
				>
				<span class="min-w-0 flex-1 text-text">
					<span
						v-if="entry.villageName"
						class="text-(--color-text-muted)"
						>[{{ entry.villageName }}]</span
					>
					{{ entry.message }}
				</span>
			</div>
		</div>
	</section>
</template>
