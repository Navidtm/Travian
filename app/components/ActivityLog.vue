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
	<section class="rounded-card border-border bg-surface border">
		<button
			type="button"
			class="flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-5"
			:aria-expanded="isOpen"
			@click="isOpen = !isOpen"
		>
			<div class="flex items-center gap-2">
				<h2 class="text-text text-sm font-semibold">Activity Log</h2>
				<span class="bg-surface-3 text-text-muted rounded-full px-2 py-0.5 font-mono text-[11px]">{{
					entries.length
				}}</span>
			</div>
			<Icon
				name="material-symbols:keyboard-arrow-down-rounded"
				:class="{ '-rotate-180': !isOpen }"
			/>
		</button>

		<div
			v-show="isOpen"
			class="border-border-soft max-h-72 overflow-y-auto border-t px-4 py-3 font-mono text-xs sm:px-5"
		>
			<div
				v-for="entry in entries"
				:key="entry.id"
				class="flex items-start gap-3 py-1.5"
			>
				<span class="text-text-faint shrink-0">{{ entry.time }}</span>
				<span
					class="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold"
					:style="{
						color: levelMeta[entry.level].color,
						backgroundColor: levelMeta[entry.level].color + '1a',
					}"
					>{{ levelMeta[entry.level].label }}</span
				>
				<span class="text-text min-w-0 flex-1">
					<span
						v-if="entry.villageName"
						class="text-text-muted"
						>[{{ entry.villageName }}]</span
					>
					{{ entry.message }}
				</span>
			</div>
		</div>
	</section>
</template>
