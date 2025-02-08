type FashionLine = {
	id: number;
	name: string;
	print: string;
	model: Model;
};

type Model = {
	id: number;
	name: string;
	descrition: string;
	price: number;
};

const URL = "http://localhost:8080/fashion-lines";

export async function getAllFashionLines(): Promise<FashionLine[]> {
	const response = await fetch(URL);

	if (!response.ok) {
		throw new Error("Algo deu errado: " + response.status);
	}

	return await response.json();
}
