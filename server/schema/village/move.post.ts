import { z } from 'zod';

export const villageMoveBodySchema = z.object({
	id: z.coerce.number().int().positive(),
});
