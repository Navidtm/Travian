import { computed, reactive, ref } from 'vue';

import type {
	ActivityLogEntry,
	AttackTemplate,
	FarmTarget,
	FarmingJob,
	Operation,
	TargetGroup,
	TrainingQueueItem,
	TroopType,
} from '~/types';

// ---------------------------------------------------------------------------
// Mock data. Swap for real API/websocket calls when the backend is wired up.
// ---------------------------------------------------------------------------

const troopTypes = reactive<TroopType[]>([
	{
		id: 'tr1',
		name: 'Clubswinger',
		category: 'infantry',
		currentCount: 340,
		targetCount: 500,
		secondsPerUnit: 55,
	},
	{
		id: 'tr2',
		name: 'Spearman',
		category: 'infantry',
		currentCount: 210,
		targetCount: 300,
		secondsPerUnit: 60,
	},
	{
		id: 'tr3',
		name: 'Scout',
		category: 'scout',
		currentCount: 24,
		targetCount: 40,
		secondsPerUnit: 90,
	},
	{
		id: 'tr4',
		name: 'Paladin',
		category: 'cavalry',
		currentCount: 48,
		targetCount: 80,
		secondsPerUnit: 210,
	},
	{
		id: 'tr5',
		name: 'Ram',
		category: 'siege',
		currentCount: 6,
		targetCount: 15,
		secondsPerUnit: 620,
	},
	{
		id: 'tr6',
		name: 'Catapult',
		category: 'siege',
		currentCount: 3,
		targetCount: 10,
		secondsPerUnit: 780,
	},
]);

const trainingQueue = reactive<TrainingQueueItem[]>([
	{ id: 'q1', troopName: 'Clubswinger', quantity: 60, progress: 0.55, etaSeconds: 1380 },
	{ id: 'q2', troopName: 'Spearman', quantity: 40, progress: 0, etaSeconds: 3600 },
	{ id: 'q3', troopName: 'Scout', quantity: 16, progress: 0, etaSeconds: 5200 },
]);

const autoQueueEnabled = ref(true);

const targetGroups = reactive<TargetGroup[]>([
	{
		id: 'g1',
		name: 'Nearby Farms',
		description: 'Within 6 fields, low defense',
		villageIds: ['ft1', 'ft2', 'ft5'],
	},
	{
		id: 'g2',
		name: 'Inactive Players',
		description: 'No activity for 7+ days',
		villageIds: ['ft3'],
	},
	{ id: 'g3', name: 'Barbarians', description: 'Unowned villages', villageIds: ['ft4'] },
	{ id: 'g4', name: 'Top Farms', description: 'Highest average loot', villageIds: ['ft1', 'ft6'] },
]);

const farmTargets = reactive<FarmTarget[]>([
	{
		id: 'ft1',
		villageName: 'Rivermouth',
		coordinates: '(28|-9)',
		distance: 4.2,
		lastLoot: 1240,
		status: 'available',
		lastAttack: '2h ago',
		nextAvailable: 'Now',
	},
	{
		id: 'ft2',
		villageName: 'Stonegate',
		coordinates: '(26|-15)',
		distance: 5.8,
		lastLoot: 860,
		status: 'cooldown',
		lastAttack: '18m ago',
		nextAvailable: 'in 42m',
	},
	{
		id: 'ft3',
		villageName: 'Dustholm',
		coordinates: '(33|-11)',
		distance: 7.1,
		lastLoot: 2010,
		status: 'available',
		lastAttack: '5h ago',
		nextAvailable: 'Now',
	},
	{
		id: 'ft4',
		villageName: 'Barbarian Camp',
		coordinates: '(19|-6)',
		distance: 3.0,
		lastLoot: 400,
		status: 'available',
		lastAttack: 'Never',
		nextAvailable: 'Now',
	},
	{
		id: 'ft5',
		villageName: 'Fenwick',
		coordinates: '(30|-13)',
		distance: 6.4,
		lastLoot: 0,
		status: 'unreachable',
		lastAttack: '1d ago',
		nextAvailable: '\u2014',
	},
	{
		id: 'ft6',
		villageName: 'Oakford',
		coordinates: '(24|-18)',
		distance: 8.9,
		lastLoot: 3120,
		status: 'cooldown',
		lastAttack: '9m ago',
		nextAvailable: 'in 51m',
	},
]);

const attackTemplates = reactive<AttackTemplate[]>([
	{
		id: 'tmp1',
		name: 'Mini Farm',
		description: 'Fast, low-risk sweep',
		troops: [{ troopName: 'Clubswinger', quantity: 20 }],
	},
	{
		id: 'tmp2',
		name: 'Medium Farm',
		description: 'Balanced loot run',
		troops: [
			{ troopName: 'Clubswinger', quantity: 80 },
			{ troopName: 'Scout', quantity: 20 },
		],
	},
	{
		id: 'tmp3',
		name: 'Full Attack',
		description: 'User configurable composition',
		troops: [
			{ troopName: 'Clubswinger', quantity: 200 },
			{ troopName: 'Paladin', quantity: 40 },
			{ troopName: 'Ram', quantity: 6 },
		],
	},
]);

const farmingJobs = reactive<FarmingJob[]>([
	{
		id: 'fj1',
		name: 'Morning Sweep',
		targetGroupId: 'g1',
		templateId: 'tmp1',
		intervalMinutes: 60,
		enabled: true,
		status: 'running',
		lastRun: '38m ago',
		nextRun: 'in 22m',
	},
	{
		id: 'fj2',
		name: 'Inactive Cleanup',
		targetGroupId: 'g2',
		templateId: 'tmp2',
		intervalMinutes: 180,
		enabled: true,
		status: 'idle',
		lastRun: '2h ago',
		nextRun: 'in 58m',
	},
	{
		id: 'fj3',
		name: 'Barbarian Rotation',
		targetGroupId: 'g3',
		templateId: 'tmp1',
		intervalMinutes: 45,
		enabled: false,
		status: 'paused',
		lastRun: '1d ago',
		nextRun: '\u2014',
	},
]);

const operations = reactive<Operation[]>([
	{
		id: 'op1',
		name: 'Morning Sweep \u2013 Rivermouth',
		status: 'running',
		currentTarget: 'Rivermouth (28|-9)',
		progress: 0.64,
		startTime: '09:12',
		nextExecution: 'in 22m',
	},
	{
		id: 'op2',
		name: 'Morning Sweep \u2013 Dustholm',
		status: 'queued',
		currentTarget: 'Dustholm (33|-11)',
		progress: 0,
		startTime: '\u2014',
		nextExecution: 'in 22m',
	},
	{
		id: 'op3',
		name: 'Inactive Cleanup \u2013 Stonegate',
		status: 'paused',
		currentTarget: 'Stonegate (26|-15)',
		progress: 0.3,
		startTime: '08:40',
		nextExecution: 'Paused',
	},
]);

const militaryLog = reactive<ActivityLogEntry[]>([
	{ id: 'ml1', time: '18:44:10', level: 'success', message: 'Attack sent to Rivermouth (28|-9).' },
	{
		id: 'ml2',
		time: '18:31:52',
		level: 'info',
		message: 'Attack returned from Dustholm with 2,010 resources.',
	},
	{
		id: 'ml3',
		time: '18:20:07',
		level: 'success',
		message: 'Farming job "Morning Sweep" completed a full cycle.',
	},
	{
		id: 'ml4',
		time: '18:12:44',
		level: 'warning',
		message: 'Village skipped: Fenwick is unreachable.',
	},
	{
		id: 'ml5',
		time: '18:03:19',
		level: 'error',
		message: 'Troops unavailable for Barbarian Rotation, retrying in 15m.',
	},
]);

// ---------------------------------------------------------------------------
// Composable
// ---------------------------------------------------------------------------

export function useMilitaryData() {
	const totalPendingTroops = computed(() =>
		troopTypes.reduce((sum, t) => sum + Math.max(0, t.targetCount - t.currentCount), 0),
	);

	const currentTraining = computed<TrainingQueueItem | undefined>(() => trainingQueue[0]);
	const upcomingTraining = computed<TrainingQueueItem[]>(() => trainingQueue.slice(1));

	const troopProgress = (troop: TroopType) =>
		troop.targetCount === 0 ? 1 : Math.min(1, troop.currentCount / troop.targetCount);

	const updateTroopTarget = (id: string, value: number) => {
		const troop = troopTypes.find(t => t.id === id);
		if (troop) troop.targetCount = Math.max(0, value);
	};

	const trainMissingTroops = () => {
		troopTypes.forEach(troop => {
			const missing = troop.targetCount - troop.currentCount;
			if (missing > 0 && !trainingQueue.some(q => q.troopName === troop.name)) {
				trainingQueue.push({
					id: `q-${Date.now()}-${troop.id}`,
					troopName: troop.name,
					quantity: missing,
					progress: 0,
					etaSeconds: missing * troop.secondsPerUnit,
				});
			}
		});
		militaryLog.unshift({
			id: `ml-${Date.now()}`,
			time: new Date().toLocaleTimeString('en-US', { hour12: false }),
			level: 'info',
			message: 'Queued training for all troops below target.',
		});
	};

	const toggleAutoQueue = () => {
		autoQueueEnabled.value = !autoQueueEnabled.value;
	};

	const groupVillageCount = (group: TargetGroup) => group.villageIds.length;

	const toggleFarmingJob = (id: string) => {
		const job = farmingJobs.find(j => j.id === id);
		if (!job) return;
		job.enabled = !job.enabled;
		job.status = job.enabled ? 'running' : 'paused';
		militaryLog.unshift({
			id: `ml-${Date.now()}`,
			time: new Date().toLocaleTimeString('en-US', { hour12: false }),
			level: job.enabled ? 'success' : 'warning',
			message: `Farming job "${job.name}" ${job.enabled ? 'enabled' : 'disabled'}.`,
		});
	};

	const pauseOperation = (id: string) => {
		const op = operations.find(o => o.id === id);
		if (op) op.status = 'paused';
	};

	const resumeOperation = (id: string) => {
		const op = operations.find(o => o.id === id);
		if (op) op.status = 'running';
	};

	const stopOperation = (id: string) => {
		const index = operations.findIndex(o => o.id === id);
		if (index !== -1) operations.splice(index, 1);
		militaryLog.unshift({
			id: `ml-${Date.now()}`,
			time: new Date().toLocaleTimeString('en-US', { hour12: false }),
			level: 'error',
			message: 'Operation stopped by operator.',
		});
	};

	const removeFarmTarget = (id: string) => {
		const index = farmTargets.findIndex(t => t.id === id);
		if (index !== -1) farmTargets.splice(index, 1);
	};

	return {
		troopTypes,
		trainingQueue,
		currentTraining,
		upcomingTraining,
		autoQueueEnabled,
		totalPendingTroops,
		troopProgress,
		updateTroopTarget,
		trainMissingTroops,
		toggleAutoQueue,

		targetGroups,
		groupVillageCount,
		farmTargets,
		removeFarmTarget,
		attackTemplates,
		farmingJobs,
		toggleFarmingJob,
		operations,
		pauseOperation,
		resumeOperation,
		stopOperation,
		militaryLog,
	};
}
