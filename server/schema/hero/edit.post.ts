import { z } from 'zod';

export const heroEditQuerySchema = z.object({
	resourceHero: z.coerce.number().int().min(1).max(4).optional(),
});
