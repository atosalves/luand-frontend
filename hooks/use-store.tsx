import { getStoreById, updateStore } from "@/services/store-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleCheck } from "lucide-react";
import { toast } from "sonner";

export function useGetStoreById(id: number) {
    return useQuery({
        queryKey: [id],
        queryFn: () => getStoreById(id),
    });
}

export function useUpdateStore() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateStore,
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: [id] }),
                toast("Loja atualizada com sucesso", {
                    icon: <CircleCheck color="green" />,
                });
        },
    });
}
