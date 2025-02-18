import { getToken } from "@/lib/token-utils";
import { z } from "zod";

const sizeEnum = z.enum(["PP", "P", "M", "G", "GG"]);

export const sizes = Object.values(sizeEnum.Values);

export const modelSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "O nome deve conter no mínimo 3 caracteres")
        .max(72, "O nome deve conter no máximo 72 caracteres"),
    description: z
        .string()
        .trim()
        .min(3, "A descrição deve conter no mínimo 3 caracteres")
        .max(255, "A descrição deve conter no máximo 255 caracteres"),
    price: z.coerce.number().positive("O valor deve ser positivo"),
    supportedSizes: z
        .array(sizeEnum)
        .nonempty("Deve conter no mínimo um selecionado"),
});

export const extendedModelSchema = modelSchema.extend({ id: z.number() });

export const ModelSummaryDTO = z.object({
    id: z.number(),
    name: z
        .string()
        .trim()
        .min(3, "O nome deve conter no mínimo 3 caracteres")
        .max(72, "O nome deve conter no máximo 72 caracteres"),
});

const URL = "http://localhost:8080/models";

export async function getAllModels(): Promise<
    z.infer<typeof extendedModelSchema>[]
> {
    const token = await getToken();

    const response = await fetch(URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Algo deu errado: " + response.status);
    }

    const data = await response.json();

    return z.array(extendedModelSchema).parse(data);
}

export async function createModel(
    modelFormData: z.infer<typeof modelSchema>
): Promise<z.infer<typeof extendedModelSchema>> {
    const token = await getToken();

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(modelFormData),
    });

    const statusCode = response.status;

    if (statusCode === 400) {
        throw new Error("Credenciais inválidas, verifique se estão corretos.");
    }

    if (statusCode === 409) {
        throw new Error("Nome de modelo já existe.");
    }

    if (!response.ok) {
        throw new Error("Algo deu errado.");
    }

    const data = await response.json();

    return extendedModelSchema.parse(data);
}

export async function updateModel(
    modelFormData: z.infer<typeof extendedModelSchema>
): Promise<z.infer<typeof extendedModelSchema>> {
    // TODO: depois ver uma maneira de salvar token em um redis (em cache)
    const token = await getToken();

    const response = await fetch(`${URL}/${modelFormData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(modelFormData),
    });

    const statusCode = response.status;

    if (statusCode === 400) {
        throw new Error("Credenciais inválidas, verifique se estão corretos.");
    }

    if (statusCode === 409) {
        throw new Error("Nome de modelo já existe.");
    }

    if (!response.ok) {
        throw new Error("Algo deu errado.");
    }

    const data = await response.json();

    return extendedModelSchema.parse(data);
}

export async function deleteModel(id: number) {
    // TODO: depois ver uma maneira de salvar token em um redis (em cache)
    const token = await getToken();

    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const statusCode = response.status;

    if (statusCode === 404) {
        throw new Error("Modelo não encontrado!");
    }

    if (!response.ok) {
        throw new Error("Algo deu errado.");
    }
}
