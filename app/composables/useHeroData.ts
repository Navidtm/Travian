// TODO: replace with the real hero endpoint once available.
const hero = reactive<Hero>({
	name: 'Ragnvald',
	tribe: 'teutons',
	level: 14,
	experience: 6200,
	experienceForNextLevel: 9000,
	power: 320,
	speed: 7,
	resourceBonusPercent: 12,
	isAlive: true,
});

export function useHeroData() {
	const experienceProgress = computed(() =>
		Math.min(1, hero.experience / hero.experienceForNextLevel),
	);

	const experienceRemaining = computed(() =>
		Math.max(0, hero.experienceForNextLevel - hero.experience),
	);

	const revive = () => {
		hero.isAlive = true;
	};

	return {
		hero,
		experienceProgress,
		experienceRemaining,
		revive,
	};
}
