import { z } from "zod";
import { ModelSummaryDTO } from "../model-service";

const printVars = {
    id: z.coerce.number(),
    image: z.string().trim(),
    name: z
        .string()
        .trim()
        .min(3, "O nome deve conter no mínimo 3 caracteres")
        .max(72, "O nome deve conter no máximo 72 caracteres"),
    imageFile: z.custom<File>(),
    modelId: z.coerce.number(),
    modelSummaryDTO: ModelSummaryDTO,
};

export const CreatePrintSchema = z.object({
    name: printVars.name,
    imageFile: printVars.imageFile,
    modelId: printVars.modelId,
});

export const UpdatePrintSchema = z.object({
    id: printVars.id,
    image: printVars.imageFile,
    name: printVars.name,
    modelId: printVars.modelId,
});

export const DeletePrintSchema = z.object({
    id: printVars.id,
    image: printVars.image,
});

export const PrintResponseSchema = z.object({
    id: printVars.id,
    image: printVars.image,
    name: printVars.name,
    modelSummaryDTO: printVars.modelSummaryDTO,
});



