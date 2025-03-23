import type { Building, BuildingId } from '../types/village';

export const BuildingList: Building[] = [
    'Main_Building',
    'Warehouse',
    'Food_Storage',
    'Wall',
    'Camp',
    'Embassy',
    'Barracks',
    'Market',
    'Hero_Mansion',
    'Academy',
    'Palace',
    'Blacksmith',
    'Treasury',
    'Stable',
    'Town_Hall',
    'Workshop',
    'Training_Ground',
    'Mill',
    'Iron_Foundry',
    'Sawmill',
    'Brick_Kiln',
    'Bakery'
];

export const villageAddress: Record<Building, BuildingId> = {
    Town_Hall: 19,
    Warehouse: 20,
    Food_Storage: 21,
    Hero_Mansion: 22,
    Sawmill: 23,
    Embassy: 24,
    Bakery: 25,
    Main_Building: 26,
    Workshop: 27,
    Academy: 28,
    Stable: 29,
    Training_Ground: 30,
    Treasury: 31,
    Palace: 32,
    Blacksmith: 33,
    Brick_Kiln: 34,
    Barracks: 35,
    Iron_Foundry: 36,
    Market: 37,
    Mill: 38,
    Camp: 39,
    Wall: 40
};

export const villageId: Record<Building, number> = {
    Main_Building: 0,
    Sawmill: 5,
    Brick_Kiln: 6,
    Iron_Foundry: 7,
    Mill: 8,
    Bakery: 9,
    Warehouse: 10,
    Food_Storage: 11,
    Blacksmith: 12,
    Training_Ground: 14,
    Camp: 16,
    Market: 17,
    Embassy: 18,
    Stable: 20,
    Workshop: 21,
    Academy: 22,
    Town_Hall: 24,
    Palace: 26,
    Treasury: 27,
    Barracks: 19,
    Wall: 32,
    Hero_Mansion: 37
};

export const max5Levels: Building[] = ['Bakery', 'Mill', 'Iron_Foundry', 'Brick_Kiln', 'Sawmill'];
