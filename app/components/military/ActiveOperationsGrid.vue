<script setup lang="ts">
defineProps<{ operations: Operation[] }>();

defineEmits<{
	(e: 'pause', id: string): void;
	(e: 'resume', id: string): void;
	(e: 'stop', id: string): void;
}>();
</script>

<template>
	<section class="rounded-card border border-border bg-surface p-4 sm:p-5">
		<div class="mb-4">
			<h2 class="text-sm font-semibold text-text">Active Operations</h2>
			<p class="text-[12px] text-text-muted">{{ operations.length }} running or queued</p>
		</div>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
			<article
				v-for="op in operations"
				:key="op.id"
				class="flex flex-col gap-3 rounded-lg border border-border-soft bg-surface-2 p-3.5"
			>
				<div class="flex items-start justify-between gap-2">
					<p class="min-w-0 truncate text-sm font-medium text-text">{{ op.name }}</p>
					<StatusBadge :status="op.status" />
				</div>

				<p class="truncate text-xs text-text-muted">Target: {{ op.currentTarget }}</p>

				<ProgressBar
					:progress="op.progress"
					color="var(--color-run)"
				/>

				<div class="flex items-center justify-between font-mono text-[11px] text-text-muted">
					<span>Start {{ op.startTime }}</span>
					<span>Next {{ op.nextExecution ?? '\u2014' }}</span>
				</div>

				<div class="flex gap-2 border-t border-border-soft pt-3">
					<button
						v-if="op.status === 'running'"
						type="button"
						class="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface-3"
						@click="$emit('pause', op.id)"
					>
						<svg
							viewBox="0 0 24 24"
							class="h-3.5 w-3.5"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<rect
								x="6"
								y="4"
								width="4"
								height="16"
								rx="1"
							/>
							<rect
								x="14"
								y="4"
								width="4"
								height="16"
								rx="1"
							/>
						</svg>
						Pause
					</button>
					<button
						v-else
						type="button"
						class="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface-3"
						@click="$emit('resume', op.id)"
					>
						<svg
							viewBox="0 0 24 24"
							class="h-3.5 w-3.5"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M6 4l14 8-14 8V4Z" />
						</svg>
						Resume
					</button>
					<button
						type="button"
						class="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-error-soft bg-error-soft px-3 py-1.5 text-xs font-medium text-error transition-colors hover:bg-error/20"
						@click="$emit('stop', op.id)"
					>
						<svg
							viewBox="0 0 24 24"
							class="h-3.5 w-3.5"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<rect
								x="5"
								y="5"
								width="14"
								height="14"
								rx="1.5"
							/>
						</svg>
						Stop
					</button>
				</div>
			</article>
		</div>
	</section>
</template>
