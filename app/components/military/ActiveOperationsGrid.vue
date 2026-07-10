<script setup lang="ts">
defineProps<{ operations: Operation[] }>();

defineEmits<{
	(e: 'pause', id: string): void;
	(e: 'resume', id: string): void;
	(e: 'stop', id: string): void;
}>();
</script>

<template>
	<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
		<div class="mb-4">
			<h2 class="text-text text-sm font-semibold">Active Operations</h2>
			<p class="text-text-muted text-[12px]">{{ operations.length }} running or queued</p>
		</div>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
			<article
				v-for="op in operations"
				:key="op.id"
				class="border-border-soft bg-surface-2 flex flex-col gap-3 rounded-lg border p-3.5"
			>
				<div class="flex items-start justify-between gap-2">
					<p class="text-text min-w-0 truncate text-sm font-medium">{{ op.name }}</p>
					<StatusBadge :status="op.status" />
				</div>

				<p class="text-text-muted truncate text-xs">Target: {{ op.currentTarget }}</p>

				<ProgressBar
					:progress="op.progress"
					color="var(--color-run)"
				/>

				<div class="text-text-muted flex items-center justify-between font-mono text-[11px]">
					<span>Start {{ op.startTime }}</span>
					<span>Next {{ op.nextExecution ?? '\u2014' }}</span>
				</div>

				<div class="border-border-soft flex gap-2 border-t pt-3">
					<button
						v-if="op.status === 'running'"
						type="button"
						class="border-border bg-surface text-text hover:bg-surface-3 flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
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
						class="border-border bg-surface text-text hover:bg-surface-3 flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
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
						class="border-error-soft bg-error-soft text-error hover:bg-error/20 flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
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
