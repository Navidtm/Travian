import { z } from 'zod';

export const farmUpgradeBodySchema = z.object({
	target: z.coerce.number().int().min(0).max(20).optional(),
});
