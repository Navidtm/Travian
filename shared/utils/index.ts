export const getBucket = (numbers: readonly number[]): 5 | 10 | 20 => {
	if (numbers.length === 0) {
		throw new Error('The array must contain at least one number.');
	}
	const min = Math.min(...numbers);

	if (min < 5) return 5;
	if (min < 10) return 10;

	return 20;
};
