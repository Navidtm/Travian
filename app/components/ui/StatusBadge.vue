<script setup lang="ts">
const props = defineProps<{
	status: BuildingStatus | TaskStatus | MilitaryBadgeStatus;
}>();

const config = computed(() => {
	switch (props.status) {
		case 'upgrading':
		case 'running':
			return {
				label: props.status === 'running' ? 'Running' : 'Upgrading',
				dot: 'bg-run',
				text: 'text-run',
				bg: 'bg-run-soft',
			};
		case 'queued':
			return {
				label: 'Queued',
				dot: 'bg-queued',
				text: 'text-text-muted',
				bg: 'bg-queued-soft',
			};
		case 'paused':
			return {
				label: 'Paused',
				dot: 'bg-paused',
				text: 'text-paused',
				bg: 'bg-paused-soft',
			};
		case 'cooldown':
			return {
				label: 'On Cooldown',
				dot: 'bg-paused',
				text: 'text-paused',
				bg: 'bg-paused-soft',
			};
		case 'error':
			return {
				label: 'Error',
				dot: 'bg-error',
				text: 'text-error',
				bg: 'bg-error-soft',
			};
		case 'unreachable':
			return {
				label: 'Unreachable',
				dot: 'bg-error',
				text: 'text-error',
				bg: 'bg-error-soft',
			};
		case 'target-reached':
		case 'done':
			return {
				label: props.status === 'done' ? 'Done' : 'Target reached',
				dot: 'bg-done',
				text: 'text-done',
				bg: 'bg-done-soft',
			};
		case 'available':
			return {
				label: 'Available',
				dot: 'bg-done',
				text: 'text-done',
				bg: 'bg-done-soft',
			};
		case 'enabled':
			return {
				label: 'Enabled',
				dot: 'bg-done',
				text: 'text-done',
				bg: 'bg-done-soft',
			};
		case 'disabled':
			return {
				label: 'Disabled',
				dot: 'bg-text-faint',
				text: 'text-text-faint',
				bg: 'bg-surface-3',
			};
		case 'idle':
		default:
			return {
				label: 'Idle',
				dot: 'bg-text-faint',
				text: 'text-text-faint',
				bg: 'bg-surface-3',
			};
	}
});
</script>

<template>
	<span
		class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium"
		:class="[config.bg, config.text]"
	>
		<span
			class="h-1.5 w-1.5 rounded-full"
			:class="config.dot"
		/>
		{{ config.label }}
	</span>
</template>
