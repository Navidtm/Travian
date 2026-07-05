// ---------------------------------------------------------------------------
// Mock data. In a real deployment this file would be replaced by calls into
// the automation engine's API / websocket feed.
// ---------------------------------------------------------------------------

const villages = reactive<Village[]>([
	{
		id: 'v1',
		name: 'Northreach',
		coordinates: '(24|-12)',
		isCapital: true,
		population: 412,
		populationCap: 620,
		resources: { wood: 8420, clay: 7960, iron: 9310, crop: 5220 },
		production: { wood: 312, clay: 298, iron: 276, crop: 190 },
		warehouseCapacity: 12000,
		granaryCapacity: 9000,
	},
	{
		id: 'v2',
		name: 'Millbrook',
		coordinates: '(31|4)',
		isCapital: false,
		population: 218,
		populationCap: 400,
		resources: { wood: 3120, clay: 4110, iron: 2870, crop: 6410 },
		production: { wood: 168, clay: 172, iron: 140, crop: 205 },
		warehouseCapacity: 8000,
		granaryCapacity: 8000,
	},
	{
		id: 'v3',
		name: 'Ashford',
		coordinates: '(18|-27)',
		isCapital: false,
		population: 96,
		populationCap: 250,
		resources: { wood: 1240, clay: 980, iron: 1510, crop: 2040 },
		production: { wood: 88, clay: 76, iron: 92, crop: 110 },
		warehouseCapacity: 4000,
		granaryCapacity: 4000,
	},
]);

const activeVillageId = ref(villages[0]!.id);

const tasks = reactive<AutomationTask[]>([
	{
		id: 't1',
		label: 'Upgrade Main Building',
		detail: 'Level 12 \u2192 13',
		villageName: 'Northreach',
		status: 'running',
		etaSeconds: 5120,
		progress: 0.42,
	},
	{
		id: 't2',
		label: 'Upgrade Woodcutter #2',
		detail: 'Level 7 \u2192 8',
		villageName: 'Northreach',
		status: 'queued',
		resourceType: 'wood',
	},
	{
		id: 't3',
		label: 'Upgrade Warehouse',
		detail: 'Level 14 \u2192 15',
		villageName: 'Northreach',
		status: 'queued',
	},
	{
		id: 't4',
		label: 'Upgrade Iron Mine #3',
		detail: 'Level 8 \u2192 9',
		villageName: 'Northreach',
		status: 'queued',
		resourceType: 'iron',
	},
	{
		id: 't5',
		label: 'Send resources to Millbrook',
		detail: '3,200 mixed resources',
		villageName: 'Northreach',
		status: 'queued',
	},
	{
		id: 't6',
		label: 'Upgrade Main Building',
		detail: 'Level 8 \u2192 9',
		villageName: 'Millbrook',
		status: 'running',
		etaSeconds: 2380,
		progress: 0.68,
	},
	{
		id: 't7',
		label: 'Upgrade Clay Pit #1',
		detail: 'Level 5 \u2192 6',
		villageName: 'Millbrook',
		status: 'queued',
		resourceType: 'clay',
	},
]);

const activityLog = reactive<ActivityLogEntry[]>([
	{
		id: 'l1',
		time: '18:42:03',
		level: 'success',
		message: 'Woodcutter #4 reached target level 8.',
		villageName: 'Northreach',
	},
	{
		id: 'l2',
		time: '18:39:41',
		level: 'info',
		message: 'Queued Warehouse upgrade (level 14 \u2192 15).',
		villageName: 'Northreach',
	},
	{
		id: 'l3',
		time: '18:31:12',
		level: 'warning',
		message: 'Insufficient crop to start next upgrade, retrying in 5m.',
		villageName: 'Ashford',
	},
	{
		id: 'l4',
		time: '18:22:57',
		level: 'error',
		message: 'Residence upgrade failed: build queue full.',
		villageName: 'Northreach',
	},
	{
		id: 'l5',
		time: '18:10:04',
		level: 'success',
		message: 'Main Building upgrade started (level 8 \u2192 9).',
		villageName: 'Millbrook',
	},
	{
		id: 'l6',
		time: '17:58:36',
		level: 'info',
		message: 'Village Ashford added to automation rotation.',
		villageName: 'Ashford',
	},
	{
		id: 'l7',
		time: '17:44:19',
		level: 'success',
		message: 'Clay Pit #2 reached target level 10.',
		villageName: 'Northreach',
	},
]);

const runState = ref<AutomationRunState>('running');

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------

export function formatNumber(value: number): string {
	return new Intl.NumberFormat('en-US').format(Math.round(value));
}

export function formatDuration(seconds?: number): string {
	if (seconds === undefined || seconds === null) return '\u2014';
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.floor(seconds % 60);
	if (h > 0) return `${h}h ${m}m`;
	if (m > 0) return `${m}m ${s}s`;
	return `${s}s`;
}

// ---------------------------------------------------------------------------
// Composable
// ---------------------------------------------------------------------------

export function useVillageData() {
	const activeVillage = computed<Village>(
		() => villages.find(v => v.id === activeVillageId.value)! ?? villages[0],
	);

	const resourceFields = computed(() => {
		const { data } = useFetch('/api/farm');

		return data.value?.levels.map<ResourceField>(({ id, level, type }) => ({
			id: `${id}`,
			maxLevel: 20,
			currentLevel: level,
			slot: id,
			type,
			targetLevel: 20,
			etaSeconds: 2,
		}));
	});

	const buildings = computed<Building[] | undefined>(() => {
		const { data } = useFetch('/api/village');
		return data.value?.levels.map<Building>(({ id, level, name }) => ({
			currentLevel: level,
			id: `${name}`,
			name: name!,
			maxLevel: 20,
			slot: id,
			status: 'idle',
			targetLevel: 20,
		}));
	});

	const villageTasks = computed<AutomationTask[]>(() =>
		tasks.filter(t => t.villageName === activeVillage.value.name),
	);

	const currentTask = computed<AutomationTask | undefined>(() =>
		villageTasks.value.find(t => t.status === 'running'),
	);

	const nextTask = computed<AutomationTask | undefined>(() => {
		const queued = villageTasks.value.filter(t => t.status === 'queued');
		return queued[0];
	});

	const queuedTasks = computed<AutomationTask[]>(() =>
		villageTasks.value.filter(t => t.status === 'queued').slice(1),
	);

	const fieldProgress = (field: ResourceField) =>
		Math.min(1, field.currentLevel / field.targetLevel);

	const setActiveVillage = (id: string) => {
		activeVillageId.value = id;
	};

	const upgradeAllFields = () => {};

	const upgradeEverything = () => {};

	const togglePause = () => {
		runState.value = runState.value === 'running' ? 'paused' : 'running';
		activityLog.unshift({
			id: `log-${Date.now()}`,
			time: new Date().toLocaleTimeString('en-US', { hour12: false }),
			level: 'warning',
			message:
				runState.value === 'paused'
					? 'Automation paused by operator.'
					: 'Automation resumed by operator.',
		});
	};

	const stopAutomation = () => {
		runState.value = 'stopped';
		activityLog.unshift({
			id: `log-${Date.now()}`,
			time: new Date().toLocaleTimeString('en-US', { hour12: false }),
			level: 'error',
			message: 'Automation stopped by operator. All queues halted.',
		});
	};

	return {
		villages,
		activeVillageId,
		activeVillage,
		resourceFields,
		buildings,
		tasks: villageTasks,
		currentTask,
		nextTask,
		queuedTasks,
		activityLog,
		runState,
		fieldProgress,
		setActiveVillage,
		upgradeAllFields,
		upgradeEverything,
		togglePause,
		stopAutomation,
	};
}
