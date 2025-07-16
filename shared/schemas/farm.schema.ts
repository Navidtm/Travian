import { z } from "zod/v4";
import { resourseTypes } from "../constants/farm";

export const farmSchema = z.object({
    body: z.object({
        items: z.array(
            z.object({
                id: z.number().int().meta({ description: "The farm id" }),
                type: z.enum(resourseTypes).meta({ description: "The farm type to upgrade " }),
                level: z.number().int().meta({ description: "The farm current level" }),
            })
        ),
        toLevel: z.number().meta({ description: "The farm level to upgrade to" }),
    }),
});

export type farmSchemaType = z.infer<typeof farmSchema>;
export type upgradeFarmSchemaType = farmSchemaType["body"];
