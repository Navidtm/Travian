import { z } from 'zod';

export const farmSchema = z.object({
    body: z.object({
        items: z.array(z.object({
            id: z.number().openapi({ description: 'The farm id' }),
            type: z.string().openapi({ description: 'The farm type to upgrade ' }),
            level: z.number().openapi({ description: 'The farm current level' })
        })),
        toLevel: z.number().openapi({ description: 'The farm level to upgrade to' })
    })
});

export type farmSchemaType = z.infer<typeof farmSchema>;
export type upgradeFarmSchemaType = farmSchemaType['body'];
