type LoginProps = {
    email: string;
    password: string;
};

export async function login(loginFormData: LoginProps) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
        credentials: "include",
    }).catch(() => {
        throw new Error("Erro no servidor");
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }
}
