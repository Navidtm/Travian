<script setup lang="ts">
const { name, onSave } = defineProps<{
	name: string;
	onSave: (newName: string) => Promise<{ success: boolean }>;
}>();

const isEditing = ref(false);
const draft = ref(name);
const status = ref<'idle' | 'saving' | 'success' | 'error'>('idle');
const inputRef = useTemplateRef('inputRef');

const startEditing = async () => {
	draft.value = name;
	status.value = 'idle';
	isEditing.value = true;
	await nextTick();
	inputRef.value?.focus();
	inputRef.value?.select();
};

const cancel = () => {
	isEditing.value = false;
	status.value = 'idle';
};

const save = async () => {
	if (draft.value.trim() === name.trim()) {
		cancel();
		return;
	}
	status.value = 'saving';
	const result = await onSave(draft.value);
	if (result.success) {
		status.value = 'success';
		setTimeout(() => {
			isEditing.value = false;
			status.value = 'idle';
		}, 1500);
	} else {
		status.value = 'error';
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
				<Icon
					class="h-3.5 w-3.5"
					name="icon:edit"
				/>
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
				<p
					v-if="status === 'error'"
					class="text-error text-[11px]"
					>error
				</p>
				<p
					v-else-if="status === 'success'"
					class="text-done text-[11px]"
					>Saved</p
				>
				<button
					type="button"
					class="text-done hover:bg-done-soft flex h-6 w-6 shrink-0 items-center justify-center rounded transition-colors disabled:opacity-40"
					:disabled="status === 'saving' || status === 'success'"
					aria-label="Save"
					@click="save"
				>
					<Icon
						v-if="status === 'saving'"
						class="h-3.5 w-3.5 animate-spin"
						name="icon:refresh"
					/>
					<Icon
						v-else
						class="h-3.5 w-3.5"
						name="icon:check"
					/>
				</button>
				<button
					type="button"
					class="text-text-faint hover:bg-surface-3 flex h-6 w-6 shrink-0 items-center justify-center rounded transition-colors disabled:opacity-40"
					:disabled="status === 'saving'"
					aria-label="Cancel"
					@click="cancel"
				>
					<Icon
						class="h-3.5 w-3.5"
						name="icon:close"
					/>
				</button>
			</div>
		</div>
	</div>
</template>
