import { computed, reactive, ref } from 'vue';

export type AdventureDifficulty = 'easy' | 'medium' | 'hard';

export interface Adventure {
	id: string;
	coordinates: string;
	distance: number;
	durationSeconds: number;
	difficulty: AdventureDifficulty;
	rewardPreview: string;
}

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
		coordinates: '(41|3)',
		distance: 19.4,
		durationSeconds: 3600,
		difficulty: 'medium',
		rewardPreview: '~1,200 resources + item',
	},
	{
		id: 'adv2',
		coordinates: '(12|-8)',
		distance: 8.1,
		durationSeconds: 1500,
		difficulty: 'easy',
		rewardPreview: '~400 resources',
	},
	{
		id: 'adv3',
		coordinates: '(55|22)',
		distance: 34.0,
		durationSeconds: 6200,
		difficulty: 'hard',
		rewardPreview: '~3,000 resources + rare item',
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
	const nextAdventure = computed(() => availableAdventures[0]);

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
		availableAdventures,
		currentAdventureCount,
		nextAdventure,
		travelState,
		startAdventure,
	};
}
