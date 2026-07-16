import type { H3Event } from 'h3';
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

type WeekType = 'ts1' | 'ts2';

const REFERENCE = new Date('2025-07-11T00:00:00');

const WEEK = 7 * 24 * 60 * 60 * 1000;

export const getTSWeek = (date = new Date()): WeekType => {
	const weeks = Math.floor((date.getTime() - REFERENCE.getTime()) / WEEK);

	return weeks % 2 === 0 ? 'ts1' : 'ts2';
};

export const getBaseURL = (e: H3Event) => {
	const { domain } = useRuntimeConfig(e);
	return `https://${domain}/${getTSWeek()}`;
};

export const max5Levels: BuildingName[] = [
	'Bakery',
	'Grain_Mill',
	'Iron_Foundry',
	'Brickyard',
	'Sawmill',
];

export const getMaxLevel = (name: BuildingName) => {
	if (name === 'Cranny') return 10;
	if (max5Levels.includes(name)) return 5;
	return 20;
};
