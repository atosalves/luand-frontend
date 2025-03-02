import { deletePrint, getAllPrints } from "@/services/print-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function useGetAllPrints() {
    return useQuery({
        queryKey: ["prints"],
        queryFn: getAllPrints,
    });
}

export function useDeletePrint() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePrint,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["prints"] }),
                toast("Estampa excluída com sucesso", {
                    icon: <Trash2 color="red" />,
                });
        },
    });
}
