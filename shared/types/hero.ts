export type AdventureDifficulty = 'medium' | 'hard';

export type AdventureLocation = 'Plain' | 'Mountain' | 'Sea' | 'Forest';

export interface Adventure {
	id: string;
	location: AdventureLocation;
	coordinates: string;
	durationSeconds: number;
	difficulty: AdventureDifficulty;
}
