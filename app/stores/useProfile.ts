export const useProfile = defineStore('profile', () => {
	const { data, pending, error, execute } = useApi('/api/profile');

	if (!data.value && !pending.value && !error.value) {
		void execute();
	}

	const farm = useFarm();
	const building = useBuilding();
	const updateData = async () => {
		await building.execute();
		await farm.execute();
	};

	return { data, pending, error, execute, updateData };
});
