<script setup lang="ts">
const username = ref('');
const token = useCookie<string>('token');

const { pending, execute } = useApi('/api/auth/login', {
	method: 'POST',

	onRequest: ({ options }) => {
		options.body = { username: username.value };
	},

	onResponse: ({ response }) => {
		// oxlint-disable-next-line no-underscore-dangle
		token.value = response._data!.token;
	},
});

const input = useTemplateRef('usernameInput');
const { focused } = useFocus(input);
const scrollLock = useScrollLock(document.body);

onMounted(() => {
	scrollLock.value = true;
	focused.value = true;
});

onUnmounted(() => {
	scrollLock.value = false;
});
</script>

<template>
	<Transition
		enter-active-class="duration-200 ease-out"
		enter-from-class="opacity-0 scale-95"
		enter-to-class="opacity-100 scale-100"
		leave-active-class="duration-150 ease-in"
		leave-from-class="opacity-100 scale-100"
		leave-to-class="opacity-0 scale-95"
	>
		<div
			class="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
		>
			<section
				class="bg-surface border-border w-full max-w-sm rounded-2xl border p-6 shadow-[0_20px_80px_rgb(0_0_0/0.35)]"
			>
				<header class="mb-6">
					<h1 class="text-text text-2xl font-semibold"> Welcome </h1>

					<p class="text-text/60 mt-1 text-sm"> Enter your username to continue. </p>
				</header>

				<form
					class="space-y-5"
					@submit.prevent="execute()"
				>
					<label
						for="username"
						class="text-text mb-2 block text-sm font-medium"
					>
						Username
					</label>

					<input
						id="username"
						ref="usernameInput"
						v-model.trim="username"
						type="text"
						autocomplete="username"
						placeholder="Enter your username"
						:disabled="pending"
						class="bg-surface-2 border-border text-text placeholder:text-text/40 focus:border-primary focus:ring-primary/20 h-11 w-full rounded-xl border px-4 transition-all outline-none focus:ring-1 disabled:opacity-50"
					/>

					<button
						type="submit"
						:disabled="pending || !username"
						class="bg-primary text-primary-foreground hover:bg-primary/90 flex h-11 w-full items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<svg
							v-if="pending"
							viewBox="0 0 24 24"
							class="size-4 animate-spin"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M20 11A8 8 0 1 0 18 16" />
							<path d="M20 5v6h-6" />
						</svg>

						<Transition
							mode="out-in"
							enter-active-class="duration-150"
							leave-active-class="duration-150"
						>
							<span>
								{{ pending ? 'Signing in...' : 'Login' }}
							</span>
						</Transition>
					</button>
				</form>
			</section>
		</div>
	</Transition>
</template>
