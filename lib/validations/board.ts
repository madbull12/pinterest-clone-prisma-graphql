import { z } from "zod";

export const boardValidation = z.object({
    name:z.string().min(1,{message:"Name shouldn't be empty"}),
    description:z.string().nullable(),
    secret:z.boolean().default(false),

});

export type ValidationBoard = z.infer<typeof boardValidation>