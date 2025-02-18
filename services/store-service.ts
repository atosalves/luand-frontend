import { getToken } from "@/lib/token-utils";
import { z } from "zod";

export const storeSchema = z.object({
    id: z.coerce.number(),
    name: z
        .string()
        .trim()
        .min(3, "O nome deve conter no mínimo 3 caracteres")
        .max(20, "O nome deve conter no máximo 20 caracteres"),
    description: z
        .string()
        .trim()
        .min(3, "A descrição deve conter no mínimo 3 caracteres")
        .max(72, "A descrição deve conter no máximo 72 caracteres"),
});

const URL = "http://localhost:8080/stores";

export async function getStoreById(
    id: number
): Promise<z.infer<typeof storeSchema>> {
    const token = await getToken();

    const response = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Algo deu errado: " + response.status);
    }

    const data = await response.json();
    console.log(data);

    return storeSchema.parse(data);
}

export async function updateStore(
    storeFormData: z.infer<typeof storeSchema>
): Promise<z.infer<typeof storeSchema>> {
    // TODO: depois ver uma maneira de salvar token em um redis (em cache)
    const token = await getToken();

    const response = await fetch(`${URL}/${storeFormData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(storeFormData),
    });

    const statusCode = response.status;

    if (statusCode === 400) {
        throw new Error("Credenciais inválidas, verifique se estão corretos.");
    }
    if (statusCode === 404) {
        throw new Error("Loja não encontrada.");
    }

    if (statusCode === 409) {
        throw new Error("Nome da loja já existe.");
    }

    if (!response.ok) {
        throw new Error("Algo deu errado.");
    }

    const data = await response.json();

    return storeSchema.parse(data);
}
