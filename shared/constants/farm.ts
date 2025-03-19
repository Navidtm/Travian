import type { Farm, FarmId } from '../types/farm';

export const farmAddress: Record<Farm, FarmId[]> = {
    clay: [5, 6, 14, 18],
    iron: [4, 7, 10, 11],
    wood: [1, 3, 14, 17],
    wheat: [2, 8, 9, 12, 13, 15]
};
