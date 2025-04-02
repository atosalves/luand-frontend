export default async function fetcher(url: string, options?: RequestInit) {
    const response = await fetch(url, options).catch(() => {
        throw new Error("Erro no servidor");
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}
