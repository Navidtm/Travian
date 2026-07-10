<script setup lang="ts">
const props = defineProps<{
	name: string;
	onSave: (newName: string) => Promise<{ success: boolean; error?: string }>;
}>();

const isEditing = ref(false);
const draft = ref(props.name);
const status = ref<'idle' | 'saving' | 'success' | 'error'>('idle');
const errorMessage = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const startEditing = async () => {
	draft.value = props.name;
	status.value = 'idle';
	errorMessage.value = '';
	isEditing.value = true;
	await nextTick();
	inputRef.value?.focus();
	inputRef.value?.select();
};

const cancel = () => {
	isEditing.value = false;
	status.value = 'idle';
	errorMessage.value = '';
};

const save = async () => {
	if (draft.value.trim() === props.name.trim()) {
		cancel();
		return;
	}
	status.value = 'saving';
	errorMessage.value = '';
	const result = await props.onSave(draft.value);
	if (result.success) {
		status.value = 'success';
		setTimeout(() => {
			isEditing.value = false;
			status.value = 'idle';
		}, 900);
	} else {
		status.value = 'error';
		errorMessage.value = result.error ?? 'Could not rename village';
	}
};

const onKeydown = (event: KeyboardEvent) => {
	if (event.key === 'Enter') save();
	if (event.key === 'Escape') cancel();
};
</script>

<template>
	<div>
		<div
			v-if="!isEditing"
			class="flex items-center gap-1.5"
		>
			<span class="text-text truncate text-sm font-medium">{{ name }}</span>
			<button
				type="button"
				aria-label="Rename village"
				class="text-text-faint hover:text-text flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100"
				@click.stop="startEditing"
			>
				<svg
					viewBox="0 0 24 24"
					class="h-3.5 w-3.5"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
				>
					<path d="M12 20h9" />
					<path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
				</svg>
			</button>
		</div>

		<div
			v-else
			class="flex flex-col gap-1.5"
			@click.stop
		>
			<div class="flex items-center gap-1.5">
				<input
					ref="inputRef"
					v-model="draft"
					type="text"
					maxlength="24"
					class="bg-surface text-text w-full max-w-36 min-w-0 flex-1 rounded-md border px-2 py-1 text-sm focus:outline-none"
					:class="
						status === 'error'
							? 'border-error'
							: status === 'success'
								? 'border-done'
								: 'border-border focus:border-run'
					"
					:disabled="status === 'saving' || status === 'success'"
					@keydown="onKeydown"
				/>
				<button
					type="button"
					class="text-done hover:bg-done-soft flex h-6 w-6 shrink-0 items-center justify-center rounded transition-colors disabled:opacity-40"
					:disabled="status === 'saving' || status === 'success'"
					aria-label="Save"
					@click="save"
				>
					<svg
						v-if="status === 'saving'"
						viewBox="0 0 24 24"
						class="h-3.5 w-3.5 animate-spin"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M20 11A8 8 0 1 0 18 16" />
						<path d="M20 5v6h-6" />
					</svg>
					<svg
						v-else
						viewBox="0 0 24 24"
						class="h-3.5 w-3.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M20 6 9 17l-5-5" />
					</svg>
				</button>
				<button
					type="button"
					class="text-text-faint hover:bg-surface-3 flex h-6 w-6 shrink-0 items-center justify-center rounded transition-colors disabled:opacity-40"
					:disabled="status === 'saving'"
					aria-label="Cancel"
					@click="cancel"
				>
					<svg
						viewBox="0 0 24 24"
						class="h-3.5 w-3.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M18 6 6 18M6 6l12 12" />
					</svg>
				</button>
			</div>
			<p
				v-if="status === 'error'"
				class="text-error text-[11px]"
				>{{ errorMessage }}</p
			>
			<p
				v-else-if="status === 'success'"
				class="text-done text-[11px]"
				>Saved</p
			>
		</div>
	</div>
</template>
