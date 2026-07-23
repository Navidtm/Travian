import { z } from 'zod';

export const loginBodySchema = z.object({
	username: z.string().trim().min(1).max(128),
});
