// New types for the Army / Movements / Hero components.
// Kept in a separate file so the existing app/types/index.ts is untouched.

export type Tribe = 'romans' | 'gauls' | 'teutons' | 'egyptians' | 'huns';

export type MovementType =
	| 'attack'
	| 'raid'
	| 'reinforcement-sent'
	| 'reinforcement-received'
	| 'hero-adventure'
	| 'hero-returning'
	| 'merchant-sent'
	| 'merchant-returning'
	| 'settlers'
	| 'scout';

export type MovementGroupKey = 'outgoing' | 'incoming' | 'returning' | 'hero' | 'merchants';

export type MovementStatus = 'preparing' | 'traveling' | 'arriving' | 'returning' | 'completed';

export interface MovementTroopLine {
	troopName: string;
	quantity: number;
}

export interface MovementResources {
	wood: number;
	clay: number;
	iron: number;
	crop: number;
}

export interface Movement {
	id: string;
	group: MovementGroupKey;
	type: MovementType;
	sourceVillage: string;
	destinationVillage: string;
	coordinates: string;
	tribe: Tribe;
	hasHero: boolean;
	departureTime: string;
	arrivalTime: string;
	arrivalTimestamp: number;
	durationSeconds: number;
	elapsedSeconds: number;
	status: MovementStatus;
	distance: number;
	attackTemplate?: string;
	notes?: string;
	troops: MovementTroopLine[];
	resourcesCarried?: MovementResources;
	heroInfo?: string;
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export interface Hero {
	name: string;
	tribe: Tribe;
	level: number;
	experience: number;
	experienceForNextLevel: number;
	power: number;
	speed: number;
	resourceBonusPercent: number;
	isAlive: boolean;
}

// ---------------------------------------------------------------------------
// Army management
// ---------------------------------------------------------------------------

export type TroopRole = 'offensive' | 'defensive' | 'scout' | 'siege' | 'support';

export type TrainingStatus = 'idle' | 'training' | 'queued';

export interface TroopDefinition {
	id: string;
	tribe: Tribe;
	name: string;
	role: TroopRole;
	isResearched: boolean;
	currentCount: number;
	attack: number;
	defenseInfantry: number;
	defenseCavalry: number;
	speed: number;
	carryCapacity: number;
	cropConsumption: number;
	trainingTimeSeconds: number;
	trainingStatus: TrainingStatus;
	queueSize: number;
	remainingTrainingSeconds: number;
	currentBatchQuantity: number;
	requirements?: string[];
	requiredBuildings?: string[];
	estimatedResearchSeconds?: number;
}

export interface BlacksmithState {
	troopName: string;
	level: number;
	maxLevel: number;
	upgradeProgress: number;
	estimatedUpgradeSeconds: number;
}

export interface MilitaryOverviewStat {
	id: string;
	label: string;
	value: string;
	subtitle: string;
	colorVar: string;
	trend?: { direction: 'up' | 'down'; label: string };
}
