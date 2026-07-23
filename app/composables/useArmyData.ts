// TODO: replace mock rosters with the real army/research endpoint per tribe.
const troopsByTribe: Record<Tribe, TroopDefinition[]> = {
	romans: [
		{
			id: 'rom-1',
			tribe: 'romans',
			name: 'Ironclad Legionnaire',
			role: 'offensive',
			isResearched: true,
			currentCount: 420,
			attack: 45,
			defenseInfantry: 35,
			defenseCavalry: 30,
			speed: 6,
			carryCapacity: 60,
			cropConsumption: 1,
			trainingTimeSeconds: 1600,
			trainingStatus: 'training',
			queueSize: 3,
			remainingTrainingSeconds: 640,
			currentBatchQuantity: 40,
		},
		{
			id: 'rom-2',
			tribe: 'romans',
			name: 'Wall Guardian',
			role: 'defensive',
			isResearched: true,
			currentCount: 260,
			attack: 15,
			defenseInfantry: 65,
			defenseCavalry: 55,
			speed: 5,
			carryCapacity: 40,
			cropConsumption: 1,
			trainingTimeSeconds: 1500,
			trainingStatus: 'idle',
			queueSize: 0,
			remainingTrainingSeconds: 0,
			currentBatchQuantity: 0,
		},
		{
			id: 'rom-3',
			tribe: 'romans',
			name: 'Swift Lancer',
			role: 'offensive',
			isResearched: true,
			currentCount: 90,
			attack: 65,
			defenseInfantry: 25,
			defenseCavalry: 40,
			speed: 14,
			carryCapacity: 80,
			cropConsumption: 3,
			trainingTimeSeconds: 3200,
			trainingStatus: 'queued',
			queueSize: 1,
			remainingTrainingSeconds: 3200,
			currentBatchQuantity: 10,
		},
		{
			id: 'rom-4',
			tribe: 'romans',
			name: 'Pathfinder',
			role: 'scout',
			isResearched: true,
			currentCount: 30,
			attack: 10,
			defenseInfantry: 15,
			defenseCavalry: 10,
			speed: 18,
			carryCapacity: 0,
			cropConsumption: 2,
			trainingTimeSeconds: 1000,
			trainingStatus: 'idle',
			queueSize: 0,
			remainingTrainingSeconds: 0,
			currentBatchQuantity: 0,
		},
		{
			id: 'rom-5',
			tribe: 'romans',
			name: 'Siege Ram',
			role: 'siege',
			isResearched: false,
			currentCount: 0,
			attack: 60,
			defenseInfantry: 30,
			defenseCavalry: 20,
			speed: 4,
			carryCapacity: 0,
			cropConsumption: 3,
			trainingTimeSeconds: 4800,
			trainingStatus: 'idle',
			queueSize: 0,
			remainingTrainingSeconds: 0,
			currentBatchQuantity: 0,
			requirements: ['Academy level 10', 'Blacksmith level 5'],
			requiredBuildings: ['Workshop'],
			estimatedResearchSeconds: 10800,
		},
	],
	gauls: [
		{
			id: 'gau-1',
			tribe: 'gauls',
			name: 'Forest Reaver',
			role: 'offensive',
			isResearched: true,
			currentCount: 380,
			attack: 40,
			defenseInfantry: 25,
			defenseCavalry: 22,
			speed: 7,
			carryCapacity: 55,
			cropConsumption: 1,
			trainingTimeSeconds: 1400,
			trainingStatus: 'training',
			queueSize: 2,
			remainingTrainingSeconds: 480,
			currentBatchQuantity: 30,
		},
		{
			id: 'gau-2',
			tribe: 'gauls',
			name: 'Grove Warden',
			role: 'defensive',
			isResearched: true,
			currentCount: 300,
			attack: 10,
			defenseInfantry: 55,
			defenseCavalry: 60,
			speed: 5,
			carryCapacity: 45,
			cropConsumption: 1,
			trainingTimeSeconds: 1350,
			trainingStatus: 'idle',
			queueSize: 0,
			remainingTrainingSeconds: 0,
			currentBatchQuantity: 0,
		},
		{
			id: 'gau-3',
			tribe: 'gauls',
			name: 'Storm Rider',
			role: 'offensive',
			isResearched: true,
			currentCount: 70,
			attack: 55,
			defenseInfantry: 30,
			defenseCavalry: 35,
			speed: 19,
			carryCapacity: 75,
			cropConsumption: 2,
			trainingTimeSeconds: 2800,
			trainingStatus: 'idle',
			queueSize: 0,
			remainingTrainingSeconds: 0,
			currentBatchQuantity: 0,
		},
		{
			id: 'gau-4',
			tribe: 'gauls',
			name: 'Shadow Scout',
			role: 'scout',
			isResearched: true,
			currentCount: 24,
			attack: 8,
			defenseInfantry: 12,
			defenseCavalry: 8,
			speed: 20,
			carryCapacity: 0,
			cropConsumption: 2,
			trainingTimeSeconds: 900,
			trainingStatus: 'idle',
			queueSize: 0,
			remainingTrainingSeconds: 0,
			currentBatchQuantity: 0,
		},
		{
			id: 'gau-5',
			tribe: 'gauls',
			name: 'Trebuchet',
			role: 'siege',
			isResearched: false,
			currentCount: 0,
			attack: 70,
			defenseInfantry: 25,
			defenseCavalry: 15,
			speed: 3,
			carryCapacity: 0,
			cropConsumption: 3,
			trainingTimeSeconds: 5200,
			trainingStatus: 'idle',
			queueSize: 0,
			remainingTrainingSeconds: 0,
			currentBatchQuantity: 0,
			requirements: ['Academy level 12', 'Blacksmith level 6'],
			requiredBuildings: ['Workshop'],
			estimatedResearchSeconds: 12600,
		},
	],
	teutons: [
		{
			id: 'teu-1',
			tribe: 'teutons',
			name: 'Clubswinger',
			role: 'offensive',
			isResearched: true,
			currentCount: 340,
			attack: 40,
			defenseInfantry: 20,
			defenseCavalry: 15,
			speed: 7,
			carryCapacity: 60,
			cropConsumption: 1,
			trainingTimeSeconds: 1300,
			trainingStatus: 'training',
			queueSize: 4,
			remainingTrainingSeconds: 1380,
			currentBatchQuantity: 60,
		},
		{
			id: 'teu-2',
			tribe: 'teutons',
			name: 'Spear Guard',
			role: 'defensive',
			isResearched: true,
			currentCount: 210,
			attack: 10,
			defenseInfantry: 35,
			defenseCavalry: 60,
			speed: 6,
			carryCapacity: 40,
			cropConsumption: 1,
			trainingTimeSeconds: 1200,
			trainingStatus: 'idle',
			queueSize: 0,
			remainingTrainingSeconds: 0,
			currentBatchQuantity: 0,
		},
		{
			id: 'teu-3',
			tribe: 'teutons',
			name: 'Paladin',
			role: 'offensive',
			isResearched: true,
			currentCount: 48,
			attack: 55,
			defenseInfantry: 40,
			defenseCavalry: 35,
			speed: 9,
			carryCapacity: 110,
			cropConsumption: 3,
			trainingTimeSeconds: 3300,
			trainingStatus: 'idle',
			queueSize: 0,
			remainingTrainingSeconds: 0,
			currentBatchQuantity: 0,
		},
		{
			id: 'teu-4',
			tribe: 'teutons',
			name: 'Plains Scout',
			role: 'scout',
			isResearched: true,
			currentCount: 24,
			attack: 0,
			defenseInfantry: 10,
			defenseCavalry: 5,
			speed: 16,
			carryCapacity: 0,
			cropConsumption: 2,
			trainingTimeSeconds: 950,
			trainingStatus: 'idle',
			queueSize: 0,
			remainingTrainingSeconds: 0,
			currentBatchQuantity: 0,
		},
		{
			id: 'teu-5',
			tribe: 'teutons',
			name: 'Battering Ram',
			role: 'siege',
			isResearched: true,
			currentCount: 6,
			attack: 65,
			defenseInfantry: 30,
			defenseCavalry: 20,
			speed: 4,
			carryCapacity: 0,
			cropConsumption: 3,
			trainingTimeSeconds: 4600,
			trainingStatus: 'idle',
			queueSize: 0,
			remainingTrainingSeconds: 0,
			currentBatchQuantity: 0,
		},
	],
};

const blacksmithByTribe: Record<Tribe, BlacksmithState[]> = Object.fromEntries(
	(Object.keys(troopsByTribe) as Tribe[]).map(tribe => [
		tribe,
		troopsByTribe[tribe]
			.filter(t => t.isResearched)
			.map((t, i) => ({
				troopName: t.name,
				level: i === 0 ? 20 : 8 + i * 2,
				maxLevel: 20,
				upgradeProgress: i === 0 ? 1 : 0.35,
				estimatedUpgradeSeconds: i === 0 ? 0 : 4200,
			})),
	]),
) as Record<Tribe, BlacksmithState[]>;

export function useArmyData() {
	const selectedTribe = ref<Tribe>('teutons');

	const troops = computed(() => troopsByTribe[selectedTribe.value]);
	const blacksmiths = computed(() => blacksmithByTribe[selectedTribe.value]);

	const overviewStats = computed<MilitaryOverviewStat[]>(() => {
		const list = troops.value;
		const totalTroops = list.reduce((sum, t) => sum + t.currentCount, 0);
		const infantry = list.filter(t => t.role === 'offensive' || t.role === 'defensive');
		const infantryCount = infantry.reduce((sum, t) => sum + t.currentCount, 0);
		const cavalry = list.filter(t => t.speed >= 9 && t.role !== 'scout' && t.role !== 'siege');
		const cavalryCount = cavalry.reduce((sum, t) => sum + t.currentCount, 0);
		const scoutCount = list
			.filter(t => t.role === 'scout')
			.reduce((sum, t) => sum + t.currentCount, 0);
		const siegeCount = list
			.filter(t => t.role === 'siege')
			.reduce((sum, t) => sum + t.currentCount, 0);
		const offensivePower = list.reduce((sum, t) => sum + t.attack * t.currentCount, 0);
		const defensivePower = list.reduce(
			(sum, t) => sum + (t.defenseInfantry + t.defenseCavalry) * t.currentCount,
			0,
		);
		const populationUsed = Math.round(totalTroops * 0.9);
		const avgBlacksmith = blacksmiths.value.length
			? blacksmiths.value.reduce((sum, b) => sum + b.level, 0) / blacksmiths.value.length
			: 0;
		const training = list
			.filter(t => t.trainingStatus === 'training')
			.reduce((sum, t) => sum + t.currentBatchQuantity, 0);
		const researched = list.filter(t => t.isResearched).length;
		const activeQueues = list.filter(
			t => t.trainingStatus === 'training' || t.trainingStatus === 'queued',
		).length;

		return [
			{
				id: 'total',
				label: 'Total Troops',
				value: totalTroops.toLocaleString('en-US'),
				subtitle: 'All units combined',
				colorVar: 'var(--color-run)',
			},
			{
				id: 'pop',
				label: 'Population Used',
				value: populationUsed.toLocaleString('en-US'),
				subtitle: 'By military units',
				colorVar: 'var(--color-crop)',
			},
			{
				id: 'inf',
				label: 'Infantry Count',
				value: infantryCount.toLocaleString('en-US'),
				subtitle: 'Offensive + defensive',
				colorVar: 'var(--color-wood)',
			},
			{
				id: 'cav',
				label: 'Cavalry Count',
				value: cavalryCount.toLocaleString('en-US'),
				subtitle: 'Mounted units',
				colorVar: 'var(--color-iron)',
			},
			{
				id: 'scout',
				label: 'Scouts',
				value: scoutCount.toLocaleString('en-US'),
				subtitle: 'Reconnaissance units',
				colorVar: 'var(--color-clay)',
			},
			{
				id: 'siege',
				label: 'Siege Units',
				value: siegeCount.toLocaleString('en-US'),
				subtitle: 'Rams & catapults',
				colorVar: 'var(--color-error)',
			},
			{
				id: 'off',
				label: 'Offensive Power',
				value: offensivePower.toLocaleString('en-US'),
				subtitle: 'Combined attack value',
				colorVar: 'var(--color-run)',
				trend: { direction: 'up', label: '4.2%' },
			},
			{
				id: 'def',
				label: 'Defensive Power',
				value: defensivePower.toLocaleString('en-US'),
				subtitle: 'Combined defense value',
				colorVar: 'var(--color-done)',
			},
			{
				id: 'bs',
				label: 'Avg Blacksmith Level',
				value: avgBlacksmith.toFixed(1),
				subtitle: 'Out of 20',
				colorVar: 'var(--color-paused)',
			},
			{
				id: 'training',
				label: 'Troops in Training',
				value: training.toLocaleString('en-US'),
				subtitle: 'Currently being trained',
				colorVar: 'var(--color-run)',
			},
			{
				id: 'research',
				label: 'Research Progress',
				value: `${researched}/${list.length}`,
				subtitle: 'Units researched',
				colorVar: 'var(--color-done)',
			},
			{
				id: 'queues',
				label: 'Active Training Queues',
				value: String(activeQueues),
				subtitle: 'Villages currently training',
				colorVar: 'var(--color-queued)',
			},
		];
	});

	const armyStatistics = computed(() => {
		const list = troops.value;
		const totalTroops = list.reduce((sum, t) => sum + t.currentCount, 0) || 1;
		const infantryCount = list
			.filter(t => t.role !== 'scout' && t.role !== 'siege' && t.speed < 9)
			.reduce((sum, t) => sum + t.currentCount, 0);
		const cavalryCount = list
			.filter(t => t.speed >= 9 && t.role !== 'scout' && t.role !== 'siege')
			.reduce((sum, t) => sum + t.currentCount, 0);
		const offensive = list
			.filter(t => t.role === 'offensive')
			.reduce((sum, t) => sum + t.currentCount, 0);
		const defensive = list
			.filter(t => t.role === 'defensive')
			.reduce((sum, t) => sum + t.currentCount, 0);
		const researched = list.filter(t => t.isResearched).length;
		const avgLevel = blacksmiths.value.length
			? blacksmiths.value.reduce((sum, b) => sum + b.level, 0) / blacksmiths.value.length / 20
			: 0;
		const cropConsumption = list.reduce((sum, t) => sum + t.cropConsumption * t.currentCount, 0);

		return {
			infantryPercent: infantryCount / totalTroops,
			cavalryPercent: cavalryCount / totalTroops,
			offensiveRatio: offensive / Math.max(1, offensive + defensive),
			defensiveRatio: defensive / Math.max(1, offensive + defensive),
			researchCompletion: researched / list.length,
			blacksmithCompletion: avgLevel,
			averageTroopLevel: avgLevel,
			totalCropConsumption: cropConsumption,
		};
	});

	const setTribe = (tribe: Tribe) => {
		selectedTribe.value = tribe;
	};

	return {
		selectedTribe,
		troops,
		blacksmiths,
		overviewStats,
		armyStatistics,
		setTribe,
	};
}
