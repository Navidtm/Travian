<script setup lang="ts">
import { formatNumber } from '~/composables/useVillageData';

defineProps<{
	targets: FarmTarget[];
}>();

defineEmits<{
	(e: 'add'): void;
	(e: 'edit', id: string): void;
	(e: 'delete', id: string): void;
	(e: 'import'): void;
	(e: 'export'): void;
}>();
</script>

<template>
	<section class="rounded-(--radius-card) border border-border bg-surface p-4 sm:p-5">
		<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-sm font-semibold text-text">Target List</h2>
				<p class="text-[12px] text-(--color-text-muted)">{{ targets.length }} tracked villages</p>
			</div>
			<div class="flex flex-wrap items-center gap-2">
				<button
					type="button"
					class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface-3"
					@click="$emit('import')"
				>
					Import
				</button>
				<button
					type="button"
					class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface-3"
					@click="$emit('export')"
				>
					Export
				</button>
				<button
					type="button"
					class="inline-flex items-center gap-1.5 rounded-lg bg-text px-3 py-1.5 text-xs font-medium text-bg transition-opacity hover:opacity-90"
					@click="$emit('add')"
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
					Add Target
				</button>
			</div>
		</div>

		<div class="overflow-x-auto rounded-lg border border-border-soft">
			<table class="w-full min-w-180 border-collapse text-left text-sm">
				<thead>
					<tr
						class="border-b border-border-soft bg-surface-2 text-[11px] uppercase tracking-wide text-text-faint"
					>
						<th class="px-3 py-2 font-medium">Village</th>
						<th class="px-3 py-2 font-medium">Coordinates</th>
						<th class="px-3 py-2 font-medium">Distance</th>
						<th class="px-3 py-2 font-medium">Last Loot</th>
						<th class="px-3 py-2 font-medium">Status</th>
						<th class="px-3 py-2 font-medium">Last Attack</th>
						<th class="px-3 py-2 font-medium">Next Available</th>
						<th class="px-3 py-2 font-medium text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="target in targets"
						:key="target.id"
						class="border-b border-border-soft last:border-b-0 hover:bg-surface-2"
					>
						<td class="px-3 py-2.5 font-medium text-text">{{ target.villageName }}</td>
						<td class="px-3 py-2.5 font-mono text-(--color-text-muted)">{{
							target.coordinates
						}}</td>
						<td class="px-3 py-2.5 font-mono text-(--color-text-muted)">{{
							target.distance.toFixed(1)
						}}</td>
						<td class="px-3 py-2.5 font-mono text-(--color-text-muted)">
							{{ target.lastLoot !== null ? formatNumber(target.lastLoot) : '\u2014' }}
						</td>
						<td class="px-3 py-2.5"><StatusBadge :status="target.status" /></td>
						<td class="px-3 py-2.5 text-(--color-text-muted)">{{
							target.lastAttack ?? '\u2014'
						}}</td>
						<td class="px-3 py-2.5 font-mono text-(--color-text-muted)">{{
							target.nextAvailable ?? '\u2014'
						}}</td>
						<td class="px-3 py-2.5">
							<div class="flex justify-end gap-1.5">
								<button
									type="button"
									class="rounded-md px-2 py-1 text-xs font-medium text-(--color-text-muted) transition-colors hover:bg-surface-3 hover:text-text"
									@click="$emit('edit', target.id)"
								>
									Edit
								</button>
								<button
									type="button"
									class="rounded-md px-2 py-1 text-xs font-medium text-error transition-colors hover:bg-error-soft"
									@click="$emit('delete', target.id)"
								>
									Delete
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>
