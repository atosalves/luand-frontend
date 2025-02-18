import { z } from "zod";
import { extendedModelSchema } from "../model-service";

export const FashionLineSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "O nome deve conter no mínimo 3 caracteres")
        .max(72, "O nome deve conter no máximo 72 caracteres"),
    print: z.custom<File>(),
    modelId: z.coerce.number(),
});
export const UpdateFashionLineSchema = z.object({
    id: z.coerce.number(),
    name: z
        .string()
        .trim()
        .min(3, "O nome deve conter no mínimo 3 caracteres")
        .max(72, "O nome deve conter no máximo 72 caracteres"),
    print: z.custom<File>(),
    modelId: z.coerce.number(),
});

export const FashionLineResponseSchema = z.object({
    id: z.coerce.number(),
    name: z
        .string()
        .trim()
        .min(3, "O nome deve conter no mínimo 3 caracteres")
        .max(72, "O nome deve conter no máximo 72 caracteres"),
    print: z.string().trim(),
    modelDTO: extendedModelSchema,
});

export const DeleteFashionLineSchema = z.object({
    id: z.coerce.number(),
    print: z.string().trim(),
});
