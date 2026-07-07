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

const formatter = new Intl.NumberFormat('en-US');

export const formatNumber = (value?: number): string => {
	if (!value) return '';
	const sign = value < 0 ? '-' : '';
	value = Math.abs(value);

	if (value < 100_000) {
		return sign + formatter.format(value);
	}

	const units = ['', 'K', 'M', 'B', 'T'];
	let unit = 0;

	while (value >= 1000 && unit < units.length - 1) {
		value /= 1000;
		unit++;
	}

	return `${sign}${Number(value.toFixed(1))}${units[unit]}`;
};

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
	const profile = computed(() => {
		const { data } = useFetch('/api/profile', {
			key: 'profile',
		});

		return data.value;
	});

	const villages = computed(() => profile.value?.villages);

	const farm = computed(() => {
		const { data } = useFetch('/api/farm');
		return data.value;
	});

	const resourceFields = computed(() => {
		return farm.value?.levels.map<ResourceField>(({ slot, level, type }) => ({
			id: String(slot),
			maxLevel: 20,
			currentLevel: level,
			slot,
			type,
			targetLevel: 20,
			etaSeconds: 2,
		}));
	});

	const buildings = computed<Building[] | undefined>(() => {
		const { data } = useFetch('/api/building');
		return data.value?.levels.map<Building>(({ slot, level, name }) => ({
			currentLevel: level,
			id: `${name}`,
			name: name!,
			maxLevel: 20,
			slot,
			status: 'idle',
			targetLevel: 20,
		}));
	});

	const villageTasks = computed<AutomationTask[]>(
		() => tasks,
		// .filter(t => t.villageName === activeVillage.value.name),
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
		// activeVillageId.value = id;
		console.log(id);
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
		profile,
		villages,
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
