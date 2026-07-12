import { Locator } from 'playwright-core';

export const extractNumber = (value?: string | null): number => {
	if (!value) return 0;

	const normalized = value
		// فارسی → انگلیسی
		.replace(/[۰-۹]/gu, d => String(d.charCodeAt(0) - 1728))
		// عربی → انگلیسی
		.replace(/[٠-٩]/gu, d => String(d.charCodeAt(0) - 1584))
		// جداکننده اعشار فارسی
		.replace(/٫/gu, '.')
		// جداکننده هزارگان فارسی و انگلیسی
		.replace(/[٬,]/gu, '');

	const match = normalized.match(/-?\d+(?:\.\d+)?/u);

	return match ? Number(match[0]) : 0;
};

export const parseCoordinates = async (row: Locator): Promise<string> => {
	const text = await getTextLocator(row, '.coords');
	return text!
		.replace(/[()\s]/g, '')
		.split('|')
		.reverse()
		.join('|');
};
