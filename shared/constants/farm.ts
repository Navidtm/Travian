import type { Farm, FarmId } from '../types/farm';

export const resourseTypes = ['iron', 'wheat', 'wood', 'clay'] as const;

export const farmIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] as const;

export const farmLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as const;

export const farmAddress: Record<Farm, FarmId[]> = {
    clay: [5, 6, 14, 18],
    iron: [4, 7, 10, 11],
    wood: [1, 3, 14, 17],
    wheat: [2, 8, 9, 12, 13, 15]
} as const;
