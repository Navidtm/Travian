import { onBeforeUnmount, onMounted, type Ref } from 'vue';

export function onClickOutside(target: Ref<HTMLElement | null>, callback: () => void) {
	const handler = (event: MouseEvent) => {
		const el = target.value;
		if (!el) return;
		if (el === event.target || el.contains(event.target as Node)) return;
		callback();
	};

	onMounted(() => document.addEventListener('mousedown', handler));
	onBeforeUnmount(() => document.removeEventListener('mousedown', handler));
}
