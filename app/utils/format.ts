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
