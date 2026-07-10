export const useBuilding = defineStore('building', () => {
	const { data, pending, error, execute } = useAsyncData(
		'building',
		() => $fetch('/api/building'),
		{
			immediate: false,
		},
	);

	return { data, pending, error, execute };
});
