"use client";

import { getAllFashionLines } from "@/services/fashion-line-service";
import { useQuery } from "@tanstack/react-query";

export function useGetAllFashionLines() {
	return useQuery({
		queryKey: ["fashion-lines"],
		queryFn: getAllFashionLines,
	});
}
