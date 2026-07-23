export interface HeroTravelState {
	isTraveling: boolean;
	destination: string;
	departedAt: number;
	arrivalTimestamp: number;
	durationSeconds: number;
}

// TODO: replace with the real hero-adventures endpoint / websocket feed.
const availableAdventures = reactive<Adventure[]>([
	{
		id: 'adv1',
		location: 'Forest',
		coordinates: '(41|3)',
		durationSeconds: 3600,
		difficulty: 'medium',
	},
	{
		id: 'adv2',
		location: 'Plain',
		coordinates: '(12|-8)',
		durationSeconds: 1500,
		difficulty: 'hard',
	},
	{
		id: 'adv3',
		location: 'Mountain',
		coordinates: '(55|22)',
		durationSeconds: 6200,
		difficulty: 'hard',
	},
]);

const travelState = ref<HeroTravelState>({
	isTraveling: false,
	destination: '',
	departedAt: 0,
	arrivalTimestamp: 0,
	durationSeconds: 0,
});

export function useAdventuresData() {
	const currentAdventureCount = computed(() => availableAdventures.length);

	const startAdventure = async (id: string) => {
		const adventure = availableAdventures.find(a => a.id === id);
		if (!adventure || travelState.value.isTraveling)
			return { success: false as const, error: 'Hero is unavailable' };

		const previousState = { ...travelState.value };

		const outcome = await runOptimistic({
			apply: () => {
				travelState.value = {
					isTraveling: true,
					destination: adventure.coordinates,
					departedAt: Date.now(),
					arrivalTimestamp: Date.now() + adventure.durationSeconds * 1000,
					durationSeconds: adventure.durationSeconds,
				};
			},
			revert: () => {
				travelState.value = previousState;
			},
			request: () =>
				new Promise<void>(resolve => {
					setTimeout(() => {
						// Real integration point:
						// await $fetch(`/api/hero/adventures/${id}/start`, { method: 'POST' })
						resolve();
					}, 500);
				}),
		});

		if (outcome.success) {
			const idx = availableAdventures.findIndex(a => a.id === id);
			if (idx !== -1) availableAdventures.splice(idx, 1);
			return { success: true as const };
		}
		return { success: false as const, error: outcome.error };
	};

	return {
		currentAdventureCount,
		travelState,
		startAdventure,
	};
}
