<script setup lang="ts">
import { computed } from 'vue';

import type { UnitOutcome } from '@/types/battle';

const props = defineProps<{ outcome: UnitOutcome }>();

function fmt(n: number) {
	return n.toLocaleString('en-US');
}

const survivalPercent = computed(() => {
	if (props.outcome.sent <= 0) return 0;
	return Math.min(100, (props.outcome.survivors / props.outcome.sent) * 100);
});
</script>

<template>
	<tr class="border-b border-white/[0.04] last:border-0">
		<td class="py-2.5 pr-3">
			<p class="text-sm text-slate-300">{{ outcome.unitName }}</p>
			<div class="bg-ink-700 mt-1 h-1 w-full max-w-[120px] overflow-hidden rounded-full">
				<div
					class="from-emerald2-500 to-emerald2-400 h-full rounded-full bg-gradient-to-r transition-all duration-500"
					:style="{ width: survivalPercent + '%' }"
				/>
			</div>
		</td>
		<td class="px-3 py-2.5 text-right text-sm text-slate-400 tabular-nums">{{
			fmt(outcome.sent)
		}}</td>
		<td class="text-ember-400 px-3 py-2.5 text-right text-sm tabular-nums">{{
			fmt(outcome.losses)
		}}</td>
		<td class="text-emerald2-400 py-2.5 pl-3 text-right text-sm font-medium tabular-nums">
			{{ fmt(outcome.survivors) }}
		</td>
	</tr>
</template>
