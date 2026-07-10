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
	<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
		<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-text text-sm font-semibold">Target List</h2>
				<p class="text-text-muted text-[12px]">{{ targets.length }} tracked villages</p>
			</div>
			<div class="flex flex-wrap items-center gap-2">
				<button
					type="button"
					class="border-border bg-surface-2 text-text hover:bg-surface-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
					@click="$emit('import')"
				>
					Import
				</button>
				<button
					type="button"
					class="border-border bg-surface-2 text-text hover:bg-surface-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
					@click="$emit('export')"
				>
					Export
				</button>
				<button
					type="button"
					class="bg-text text-bg inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
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

		<div class="border-border-soft overflow-x-auto rounded-lg border">
			<table class="w-full min-w-180 border-collapse text-left text-sm">
				<thead>
					<tr
						class="border-border-soft bg-surface-2 text-text-faint border-b text-[11px] tracking-wide uppercase"
					>
						<th class="px-3 py-2 font-medium">Village</th>
						<th class="px-3 py-2 font-medium">Coordinates</th>
						<th class="px-3 py-2 font-medium">Distance</th>
						<th class="px-3 py-2 font-medium">Last Loot</th>
						<th class="px-3 py-2 font-medium">Status</th>
						<th class="px-3 py-2 font-medium">Last Attack</th>
						<th class="px-3 py-2 font-medium">Next Available</th>
						<th class="px-3 py-2 text-right font-medium">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="target in targets"
						:key="target.id"
						class="border-border-soft hover:bg-surface-2 border-b last:border-b-0"
					>
						<td class="text-text px-3 py-2.5 font-medium">{{ target.villageName }}</td>
						<td class="text-text-muted px-3 py-2.5 font-mono">{{ target.coordinates }}</td>
						<td class="text-text-muted px-3 py-2.5 font-mono">{{ target.distance.toFixed(1) }}</td>
						<td class="text-text-muted px-3 py-2.5 font-mono">
							{{ target.lastLoot !== null ? formatNumber(target.lastLoot) : '\u2014' }}
						</td>
						<td class="px-3 py-2.5"><StatusBadge :status="target.status" /></td>
						<td class="text-text-muted px-3 py-2.5">{{ target.lastAttack ?? '\u2014' }}</td>
						<td class="text-text-muted px-3 py-2.5 font-mono">{{
							target.nextAvailable ?? '\u2014'
						}}</td>
						<td class="px-3 py-2.5">
							<div class="flex justify-end gap-1.5">
								<button
									type="button"
									class="text-text-muted hover:bg-surface-3 hover:text-text rounded-md px-2 py-1 text-xs font-medium transition-colors"
									@click="$emit('edit', target.id)"
								>
									Edit
								</button>
								<button
									type="button"
									class="text-error hover:bg-error-soft rounded-md px-2 py-1 text-xs font-medium transition-colors"
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
