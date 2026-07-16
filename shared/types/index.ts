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
	coordinates: [number, number];
	isActive: boolean;
	isCapital: boolean;
	population: number;
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
	id: number;
	name: string;
	slot: number;
	currentLevel: number;
	targetLevel: number;
	maxLevel: number;
	status: BuildingStatus;
	etaSeconds: number;
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

// ---------------------------------------------------------------------------
// Military module
// ---------------------------------------------------------------------------

export type TroopCategory = 'infantry' | 'cavalry' | 'siege' | 'scout';

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
	troopName: string;
	quantity: number;
	progress: number;
	etaSeconds: number;
}

export interface TargetGroup {
	id: string;
	name: string;
	description?: string;
	villageIds: string[];
}

export type FarmTargetStatus = 'available' | 'cooldown' | 'unreachable';

export interface FarmTarget {
	id: string;
	villageName: string;
	coordinates: string;
	distance: number;
	lastLoot: number | null;
	status: FarmTargetStatus;
	lastAttack: string | null;
	nextAvailable: string | null;
}

export interface TemplateTroopLine {
	troopName: string;
	quantity: number;
}

export interface AttackTemplate {
	id: string;
	name: string;
	description?: string;
	troops: TemplateTroopLine[];
}

export type FarmingJobStatus = 'running' | 'paused' | 'idle' | 'error';

export interface FarmingJob {
	id: string;
	name: string;
	targetGroupId: string;
	templateId: string;
	intervalMinutes: number;
	enabled: boolean;
	status: FarmingJobStatus;
	lastRun: string | null;
	nextRun: string | null;
}

export type OperationStatus = 'running' | 'paused' | 'queued' | 'error' | 'done';

export interface Operation {
	id: string;
	name: string;
	status: OperationStatus;
	currentTarget: string;
	progress: number;
	startTime: string;
	nextExecution: string | null;
}

/** Extra status vocabulary used only by StatusBadge in the Military module. */
export type MilitaryBadgeStatus = 'available' | 'cooldown' | 'unreachable' | 'enabled' | 'disabled';
