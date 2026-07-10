export default defineEventHandler(async event => {
	const { id } = await readBody(event);
	await launchTravian(event, '/dorf1.php?newdid=' + id);
	return;
});
