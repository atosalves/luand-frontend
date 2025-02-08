import { useGetAllFashionLines } from "@/hooks/use-get-all-fashion-lines";

export function AllFashionLines() {
	const { data } = useGetAllFashionLines();

	return (
		<>
			{data?.map(({ id, print, name, model }) => (
				<div key={id}>
					<p>{print}</p>
					<p>{name}</p>
					<p>{model.name}</p>
					<p>{model.descrition}</p>
					<p>{model.price}</p>
				</div>

			))}
		</>
	);
}
