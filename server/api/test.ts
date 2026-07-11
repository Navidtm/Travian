export default defineStreamEventHandler(async event => {
	for (let i = 1; i <= 5; i++) {
		event.emit({
			step: i,
			progress: i * 20,
			message: `Step ${i}`,
		});

		await sleep(1000);
	}

	return {
		name: 'Finished',
	};
});
