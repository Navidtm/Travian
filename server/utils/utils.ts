export const extractNumber = (value?: string | null): number => {
	if (!value) return 0;

	const normalized = value
		// فارسی → انگلیسی
		.replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 1728))
		// عربی → انگلیسی
		.replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 1584))
		// جداکننده اعشار فارسی
		.replace(/٫/g, '.')
		// جداکننده هزارگان فارسی و انگلیسی
		.replace(/[٬,]/g, '');

	const match = normalized.match(/-?\d+(?:\.\d+)?/);

	return match ? Number(match[0]) : 0;
};
