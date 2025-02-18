import { getToken } from "@/lib/token-utils";
import { z } from "zod";
import { deleteImage, uploadImage } from "../s3-service";
import { DeletePrintSchema, PrintResponseSchema, CreatePrintSchema, UpdatePrintSchema } from "./print-schemas";

const URL = "http://localhost:8080/fashion-lines";

export async function getAllPrints(): Promise<z.infer<typeof PrintResponseSchema>[]> {
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

    return z.array(PrintResponseSchema).parse(data);
}

export async function createPrint(
    modelFormData: z.infer<typeof CreatePrintSchema>
): Promise<z.infer<typeof PrintResponseSchema>> {
    const token = await getToken();

    const file = modelFormData.imageFile;
    const fileName = `${modelFormData.name}.${file.name.split(".").pop()}`;
    const bufferedImage = await modelFormData.imageFile.arrayBuffer();
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
            print: `${modelFormData.name}.${modelFormData.imageFile.name.split(".").pop()}`,
        }),
    });

    const statusCode = response.status;

    if (statusCode === 400) {
        throw new Error("Credenciais inválidas, verifique se estão corretos.");
    }

    if (statusCode === 409) {
        throw new Error("Nome da estampa já existe.");
    }

    if (!response.ok) {
        throw new Error("Algo deu errado.");
    }

    const data = await response.json();

    return PrintResponseSchema.parse(data);
}

export async function updatePrint(
    fashionLineFormData: z.infer<typeof UpdatePrintSchema>
): Promise<z.infer<typeof PrintResponseSchema>> {
    const token = await getToken();

    const file = fashionLineFormData.imageFile;
    const fileName = `${fashionLineFormData.name}.${file.name.split(".").pop()}`;
    const bufferedImage = await fashionLineFormData.imageFile.arrayBuffer();
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
        throw new Error("Nome da estampa já existe.");
    }

    if (!response.ok) {
        throw new Error("Algo deu errado.");
    }

    const data = await response.json();

    return PrintResponseSchema.parse(data);
}

export async function deletePrint({ id, image: print }: z.infer<typeof DeletePrintSchema>) {
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
        throw new Error("Estampa não encontrada!");
    }

    if (!response.ok) {
        throw new Error("Algo deu errado.");
    }
}
