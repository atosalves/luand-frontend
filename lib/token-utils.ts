"use server";

import { cookies } from "next/headers";

export async function getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    return token;
}

export async function removeToken() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
}
