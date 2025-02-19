import { getToken } from "@/lib/token-utils";
import { z } from "zod";

export const Size = z.enum(["PP", "P", "M", "G", "GG"]);

export const CreateItemDTO = z.object({
    ref: z.string().trim(),
    printId: z.coerce.number(),
    size: Size,
    color: z.string().trim(),
    availableQuantity: z.coerce.number().positive("O valor deve ser positivo"),
});
export const ItemDetailsDTO = z.object({
    size: Size,
    color: z.string().trim(),
    availableQuantity: z.coerce.number().positive("O valor deve ser positivo"),
});

const URL = "http://localhost:8080/items";

export async function getAllItems(): Promise<z.infer<typeof ItemDetailsDTO>[]> {
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

    return z.array(ItemDetailsDTO).parse(data);
}

export async function createItem(itemFormData: z.infer<typeof CreateItemDTO>): Promise<z.infer<typeof ItemDetailsDTO>> {
    const token = await getToken();

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemFormData),
    });

    const statusCode = response.status;

    if (statusCode === 400) {
        throw new Error("Credenciais inválidas, verifique se estão corretos.");
    }

    if (statusCode === 409) {
        throw new Error("Nome do item já existe.");
    }

    if (!response.ok) {
        throw new Error("Algo deu errado.");
    }

    const data = await response.json();

    return ItemDetailsDTO.parse(data);
}

// export async function updateItem(
//     itemFormData: z.infer<typeof ItemDetailsDTO>
// ): Promise<z.infer<typeof ItemDetailsDTO>> {
//     // TODO: depois ver uma maneira de salvar token em um redis (em cache)
//     const token = await getToken();

//     const response = await fetch(`${URL}/${itemFormData.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(itemFormData),
//     });

//     const statusCode = response.status;

//     if (statusCode === 400) {
//         throw new Error("Credenciais inválidas, verifique se estão corretos.");
//     }

//     if (statusCode === 409) {
//         throw new Error("Nome de itemo já existe.");
//     }

//     if (!response.ok) {
//         throw new Error("Algo deu errado.");
//     }

//     const data = await response.json();

//     return ItemDetailsDTO.parse(data);
// }

// export async function deleteItem(id: number) {
//     // TODO: depois ver uma maneira de salvar token em um redis (em cache)
//     const token = await getToken();

//     const response = await fetch(`${URL}/${id}`, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     const statusCode = response.status;

//     if (statusCode === 404) {
//         throw new Error("Itemo não encontrado!");
//     }

//     if (!response.ok) {
//         throw new Error("Algo deu errado.");
//     }
// }
