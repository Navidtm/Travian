import type { farmIds, farmLevels, resourseTypes } from '../constants/farm';

export type Resourse = typeof resourseTypes[number] | 'population';

export type Farm = typeof resourseTypes[number];

export type FarmId = typeof farmIds[number];

export type FarmLevel = typeof farmLevels[number];

export type FarmItem = {
    id: FarmId;
    level: FarmLevel;
    type: Farm;
};
