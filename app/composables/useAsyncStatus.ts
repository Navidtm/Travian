export type AsyncStatus = 'loading' | 'error' | 'empty' | 'success';

/**
 * Shared implementation of the app's standard async pattern: Loading -> Error -> Empty -> Content
 * -> Background Refresh
 *
 * `fetcher` should resolve with the data (or throw). `isEmpty` decides whether a
 * successful-but-empty result should show the Empty state.
 *
 * Usage: const { status, isRefreshing, data, load, refresh } = useAsyncStatus( () =>
 * api.getMovements(), // TODO: swap for the real endpoint (list) => list.length === 0, )
 */
export function useAsyncStatus<T>(
	fetcher: () => Promise<T>,
	isEmpty: (data: T) => boolean = () => false,
) {
	const status = ref<AsyncStatus>('loading');
	const isRefreshing = ref(false);
	const data = ref<T | null>(null) as { value: T | null };
	const error = ref<string | null>(null);

	const load = async () => {
		status.value = 'loading';
		error.value = null;
		try {
			const result = await fetcher();
			data.value = result;
			status.value = isEmpty(result) ? 'empty' : 'success';
		} catch (err) {
			error.value = err instanceof Error ? err.message : 'Unknown error';
			status.value = 'error';
		}
	};

	const refresh = async () => {
		if (status.value !== 'success') return load();
		isRefreshing.value = true;
		try {
			const result = await fetcher();
			data.value = result;
			status.value = isEmpty(result) ? 'empty' : 'success';
		} catch (err) {
			// Keep showing the last good content on a background-refresh failure;
			// surface nothing disruptive, matching the "subtle indicator" spec.
			error.value = err instanceof Error ? err.message : 'Unknown error';
		} finally {
			isRefreshing.value = false;
		}
	};

	const isBusy = computed(() => status.value === 'loading' || isRefreshing.value);

	return { status, isRefreshing, isBusy, data, error, load, refresh };
}

/**
 * Optimistic-update helper: applies a change immediately, runs the async request, and rolls back
 * automatically if it rejects.
 *
 * Usage: await runOptimistic({ apply: () => { village.name = newName }, revert: () => {
 * village.name = previousName }, request: () => api.renameVillage(id, newName), // TODO: real
 * endpoint })
 */
export async function runOptimistic<T>(options: {
	apply: () => void;
	revert: () => void;
	request: () => Promise<T>;
}): Promise<{ success: true; result: T } | { success: false; error: string }> {
	options.apply();
	try {
		const result = await options.request();
		return { success: true, result };
	} catch (err) {
		options.revert();
		return { success: false, error: err instanceof Error ? err.message : 'Request failed' };
	}
}
