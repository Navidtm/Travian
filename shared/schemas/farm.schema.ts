import { z } from 'zod';
import { resourseTypes } from '../constants/farm';

export const farmSchema = z.object({
    body: z.object({
        items: z.array(z.object({
            id: z.number().int().openapi({ description: 'The farm id' }),
            type: z.enum(resourseTypes).openapi({ description: 'The farm type to upgrade ' }),
            level: z.number().int().openapi({ description: 'The farm current level' })
        })),
        toLevel: z.number().openapi({ description: 'The farm level to upgrade to' })
    })
});

export type farmSchemaType = z.infer<typeof farmSchema>;
export type upgradeFarmSchemaType = farmSchemaType['body'];
