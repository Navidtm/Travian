export type ResourceType = 'wood' | 'clay' | 'iron' | 'crop';

export interface ResourceAmounts {
	wood: number;
	clay: number;
	iron: number;
	crop: number;
}

export interface Village {
	id: string;
	name: string;
	coordinates: string;
	isCapital: boolean;
	population: number;
	populationCap: number;
	resources: ResourceAmounts;
	production: ResourceAmounts;
	warehouseCapacity: number;
	granaryCapacity: number;
}

export interface ResourceField {
	id: string;
	type: ResourceType;
	slot: number;
	currentLevel: number;
	targetLevel: number;
	maxLevel: number;
	etaSeconds?: number;
}

export type BuildingStatus = 'idle' | 'queued' | 'upgrading' | 'target-reached' | 'error';

export interface Building {
	id: string;
	name: string;
	slot: number;
	currentLevel: number;
	targetLevel: number;
	maxLevel: number;
	status: BuildingStatus;
	etaSeconds?: number;
}

export type TaskStatus = 'running' | 'queued' | 'paused' | 'error' | 'done';

export interface AutomationTask {
	id: string;
	label: string;
	detail: string;
	villageName: string;
	status: TaskStatus;
	etaSeconds?: number;
	progress?: number;
	resourceType?: ResourceType;
}

export type LogLevel = 'info' | 'success' | 'warning' | 'error';

export interface ActivityLogEntry {
	id: string;
	time: string;
	level: LogLevel;
	message: string;
	villageName?: string;
}

export type AutomationRunState = 'running' | 'paused' | 'stopped';

export type TroopCategory = 'infantry' | 'scout' | 'cavalry' | 'siege';

export interface TroopType {
	id: string;
	name: string;
	category: TroopCategory;
	currentCount: number;
	targetCount: number;
	secondsPerUnit: number;
}

export interface TrainingQueueItem {
	id: string;
	quantity: number;
	troopName: string;
	progress: number;
	etaSeconds: number | undefined;
}

export interface TargetGroup {
	id: string;
	name: string;
	description: string;
	villageIds: string[];
}

export type MilitaryBadgeStatus = 'available' | 'cooldown' | 'unreachable' | 'enabled' | 'disabled';

export interface FarmTarget {
	id: string;
	villageName: string;
	coordinates: `(${number}|${number})`;
	distance: number;
	lastLoot: number;
	status: MilitaryBadgeStatus;
	lastAttack: string;
	nextAvailable: string;
}

export interface AttackTemplate {
	id: string;
	name: string;
	description: string;
	troops: {
		troopName: string;
		quantity: number;
	}[];
}

export interface FarmingJob {
	id: string;
	name: string;
	targetGroupId: string;
	templateId: string;
	intervalMinutes: number;
	enabled: boolean;
	status: 'running' | 'idle' | 'paused';
	lastRun: string;
	nextRun: string;
}

export interface Operation {
	id: string;
	name: string;
	progress: number;
	currentTarget: string;
	status: 'running' | 'queued' | 'paused';
	startTime: string;
	nextExecution: string;
}
