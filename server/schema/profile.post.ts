import { z } from 'zod';

export const profileBodySchema = z.object({
	townNames: z.array(z.string().trim().min(1).max(64)).max(50),
});
