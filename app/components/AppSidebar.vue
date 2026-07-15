<script setup lang="ts">
const route = useRoute();

const isActive = (path: string) => route.path === path;
const isMilitary = computed(() => route.path.startsWith('/military'));
</script>

<template>
	<nav
		class="border-border bg-surface hidden shrink-0 flex-col gap-1 border-r px-3 py-4 lg:flex lg:w-80"
	>
		<p class="text-text-faint mb-2 px-2 text-[11px] font-medium tracking-wide uppercase"> Panel </p>

		<VillageSelector class="mb-3" />

		<NuxtLink
			to="/"
			class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors"
			:class="
				isActive('/')
					? 'bg-run-soft text-run'
					: 'text-text-muted hover:bg-surface-2 hover:text-text'
			"
		>
			<Icon
				name="material-symbols:dashboard-customize-outline-rounded"
				class="shrink-0 text-lg!"
			/>
			Dashboard
		</NuxtLink>

		<p class="text-text-faint mt-4 mb-1 px-2 text-[11px] font-medium tracking-wide uppercase">
			Military
		</p>

		<div
			class="text-text-muted flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium"
		>
			<svg
				viewBox="0 0 24 24"
				class="h-4 w-4 shrink-0"
				fill="none"
				stroke="currentColor"
				stroke-width="1.8"
			>
				<path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
			</svg>
			<span :class="isMilitary ? 'text-text' : ''">Military</span>
		</div>

		<NuxtLink
			to="/military/army"
			class="border-border ml-4 flex items-center gap-2.5 rounded-lg border-l px-2.5 py-1.5 pl-3 text-sm transition-colors"
			:class="
				isActive('/military/army')
					? 'border-l-run bg-run-soft text-run'
					: 'text-text-muted hover:bg-surface-2 hover:text-text'
			"
		>
			Army
		</NuxtLink>
		<NuxtLink
			to="/military/hero"
			class="border-border ml-4 flex items-center gap-2.5 rounded-lg border-l px-2.5 py-1.5 pl-3 text-sm transition-colors"
			:class="
				isActive('/military/hero')
					? 'border-l-run bg-run-soft text-run'
					: 'text-text-muted hover:bg-surface-2 hover:text-text'
			"
		>
			Hero
		</NuxtLink>
		<NuxtLink
			to="/military/training"
			class="border-border ml-4 flex items-center gap-2.5 rounded-lg border-l px-2.5 py-1.5 pl-3 text-sm transition-colors"
			:class="
				isActive('/military/training')
					? 'border-l-run bg-run-soft text-run'
					: 'text-text-muted hover:bg-surface-2 hover:text-text'
			"
		>
			Training
		</NuxtLink>

		<NuxtLink
			to="/military/operations"
			class="border-border ml-4 flex items-center gap-2.5 rounded-lg border-l px-2.5 py-1.5 pl-3 text-sm transition-colors"
			:class="
				isActive('/military/operations')
					? 'border-l-run bg-run-soft text-run'
					: 'text-text-muted hover:bg-surface-2 hover:text-text'
			"
		>
			Operations
		</NuxtLink>
	</nav>

	<nav class="border-border bg-surface flex gap-1 overflow-x-auto border-b px-3 py-2 lg:hidden">
		<NuxtLink
			to="/"
			class="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
			:class="isActive('/') ? 'bg-run-soft text-run' : 'text-text-muted hover:bg-surface-2'"
		>
			Dashboard
		</NuxtLink>
		<NuxtLink
			to="/military/training"
			class="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
			:class="
				isActive('/military/training')
					? 'bg-run-soft text-run'
					: 'text-text-muted hover:bg-surface-2'
			"
		>
			Military · Training
		</NuxtLink>
		<NuxtLink
			to="/military/operations"
			class="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
			:class="
				isActive('/military/operations')
					? 'bg-run-soft text-run'
					: 'text-text-muted hover:bg-surface-2'
			"
		>
			Military · Operations
		</NuxtLink>
	</nav>
</template>
