<script setup lang="ts">
withDefaults(
	defineProps<{
		status: 'loading' | 'error' | 'empty' | 'success';
		isRefreshing?: boolean;
		errorTitle?: string;
		errorDescription?: string;
		emptyTitle?: string;
		emptyDescription?: string;
		loadingCount?: number;
		loadingColumns?: 'one' | 'two' | 'three';
	}>(),
	{
		isRefreshing: false,
		errorTitle: 'Something went wrong',
		errorDescription: "This section couldn't load. Check your connection and try again.",
		emptyTitle: 'Nothing here yet',
		emptyDescription: '',
		loadingCount: 3,
		loadingColumns: 'three',
	},
);

defineEmits<{ (e: 'retry'): void }>();
</script>

<template>
	<div class="relative">
		<!-- Subtle background-refresh indicator; content stays mounted underneath. -->
		<div
			v-if="isRefreshing && status === 'success'"
			class="text-text-muted bg-surface-2 absolute top-0 right-0 z-10 flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] shadow-sm"
		>
			<svg
				viewBox="0 0 24 24"
				class="h-3 w-3 animate-spin"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="M20 11A8 8 0 1 0 18 16" />
				<path d="M20 5v6h-6" />
			</svg>
			Refreshing
		</div>

		<slot
			v-if="status === 'loading'"
			name="loading"
		>
			<LoadingCard
				:count="loadingCount"
				:columns="loadingColumns"
			/>
		</slot>

		<ErrorCard
			v-else-if="status === 'error'"
			:title="errorTitle"
			:description="errorDescription"
			@retry="$emit('retry')"
		/>

		<slot
			v-else-if="status === 'empty'"
			name="empty"
		>
			<EmptyState
				:title="emptyTitle"
				:description="emptyDescription"
			>
				<template #icon><slot name="empty-icon" /></template>
				<template #action><slot name="empty-action" /></template>
			</EmptyState>
		</slot>

		<slot v-else />
	</div>
</template>
