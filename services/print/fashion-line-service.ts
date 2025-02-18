import { getToken } from "@/lib/token-utils";
import { z } from "zod";
import { deleteImage, uploadImage } from "../s3-service";
import {
    DeleteFashionLineSchema,
    FashionLineResponseSchema,
    FashionLineSchema,
    UpdateFashionLineSchema,
} from "./print-schemas";

const URL = "http://localhost:8080/fashion-lines";

export async function getAllFashionLines(): Promise<z.infer<typeof FashionLineResponseSchema>[]> {
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

    return z.array(FashionLineResponseSchema).parse(data);
}

export async function createFashionLine(
    modelFormData: z.infer<typeof FashionLineSchema>
): Promise<z.infer<typeof FashionLineResponseSchema>> {
    const token = await getToken();

    const file = modelFormData.print;
    const fileName = `${modelFormData.name}.${file.name.split(".").pop()}`;
    const bufferedImage = await modelFormData.print.arrayBuffer();
    const typeImage = file.type;

    await uploadImage(fileName, bufferedImage, typeImage);

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            ...modelFormData,
            print: `${modelFormData.name}.${modelFormData.print.name.split(".").pop()}`,
        }),
    });

    const statusCode = response.status;

    if (statusCode === 400) {
        throw new Error("Credenciais inválidas, verifique se estão corretos.");
    }

    if (statusCode === 409) {
        throw new Error("Nome da coleção já existe.");
    }

    if (!response.ok) {
        throw new Error("Algo deu errado.");
    }

    const data = await response.json();

    return FashionLineResponseSchema.parse(data);
}

export async function updateFashionLine(
    fashionLineFormData: z.infer<typeof UpdateFashionLineSchema>
): Promise<z.infer<typeof FashionLineResponseSchema>> {
    const token = await getToken();

    const file = fashionLineFormData.print;
    const fileName = `${fashionLineFormData.name}.${file.name.split(".").pop()}`;
    const bufferedImage = await fashionLineFormData.print.arrayBuffer();
    const typeImage = file.type;

    await uploadImage(fileName, bufferedImage, typeImage);

    const response = await fetch(`${URL}/${fashionLineFormData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fashionLineFormData),
    });

    const statusCode = response.status;

    if (statusCode === 400) {
        throw new Error("Credenciais inválidas, verifique se estão corretos.");
    }

    if (statusCode === 409) {
        throw new Error("Nome da coleção já existe.");
    }

    if (!response.ok) {
        throw new Error("Algo deu errado.");
    }

    const data = await response.json();

    return FashionLineResponseSchema.parse(data);
}

export async function deleteFashionLine({ id, print }: z.infer<typeof DeleteFashionLineSchema>) {
    // TODO: depois ver uma maneira de salvar token em um redis (em cache)
    const token = await getToken();

    await deleteImage(print);

    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const statusCode = response.status;

    if (statusCode === 404) {
        throw new Error("Coleção não encontrada!");
    }

    if (!response.ok) {
        throw new Error("Algo deu errado.");
    }
}
