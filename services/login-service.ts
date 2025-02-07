type LoginProps = {
	email: string;
	password: string;
};

type LoginResponse = {
	token: string;
};

export async function login(loginFormData: LoginProps): Promise<LoginResponse> {
	const response = await fetch("http://localhost:8080/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(loginFormData),
	});

	const statusCode = response.status;

	if (statusCode === 401) {
		throw new Error("Credenciais inválidas, verifique se email ou senha estão corretos.");
	}

	if (statusCode === 404) {
		throw new Error("Usuário não encotrado, solicite a realização do cadastro.");
	}

	if (!response.ok) {
		throw new Error("Algo deu errado.");
	}

	return await response.json();
}
