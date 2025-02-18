import { z } from "zod";
import { extendedModelSchema } from "../model-service";

export const CreatePrintSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "O nome deve conter no mínimo 3 caracteres")
        .max(72, "O nome deve conter no máximo 72 caracteres"),
    imageFile: z.custom<File>(),
    modelId: z.coerce.number(),
});

export const UpdatePrintSchema = z.object({
    id: z.coerce.number(),
    name: z
        .string()
        .trim()
        .min(3, "O nome deve conter no mínimo 3 caracteres")
        .max(72, "O nome deve conter no máximo 72 caracteres"),
    imageFile: z.custom<File>(),
    modelId: z.coerce.number(),
});

export const PrintResponseSchema = z.object({
    id: z.coerce.number(),
    name: z
        .string()
        .trim()
        .min(3, "O nome deve conter no mínimo 3 caracteres")
        .max(72, "O nome deve conter no máximo 72 caracteres"),
    image: z.string().trim(),
    modelDTO: extendedModelSchema,
});

export const DeletePrintSchema = z.object({
    id: z.coerce.number(),
    image: z.string().trim(),
});
