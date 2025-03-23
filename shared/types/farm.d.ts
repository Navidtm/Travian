export type Resourse = 'iron' | 'wheat' | 'wood' | 'clay' | 'population';

export type Farm = 'iron' | 'wheat' | 'wood' | 'clay';

export type FarmId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;

export type FarmLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export type FarmItem = {
    id: FarmId;
    level: FarmLevel;
    type: Farm;
};
