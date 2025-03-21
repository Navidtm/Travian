import type { Building, BuildingId } from '../types/village';

export const BuildingList: Building[] = [
    'Main_Building',
    'Warehouse',
    'Food_Storage',
    'Wall',
    'Camp',
    'Embassy',
    'Hero_Mansion',
    'Academy',
    'Training_Ground',
    'Blacksmith',
    'Palace',
    'Barracks',
    'Market',
    'Stable',
    'Town_Hall',
    'Treasury',
    'Workshop',
    'Mill',
    'Blacksmith',
    'Bakery',
    'Iron_Foundry',
    'Sawmill',
    'Brick_Kiln'
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
