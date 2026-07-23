import { z } from 'zod';

export const heroAdventureQuerySchema = z.object({
	id: z.coerce.number().int().positive(),
});
