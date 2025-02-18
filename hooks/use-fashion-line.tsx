import {
    createFashionLine,
    deleteFashionLine,
    getAllFashionLines,
    updateFashionLine,
} from "@/services/print/fashion-line-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function useGetAllFashionLines() {
    return useQuery({
        queryKey: ["fashion-lines"],
        queryFn: getAllFashionLines,
    });
}

export function useCreateFashionLine() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFashionLine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fashion-lines"] }),
                toast("Coleção criada com sucesso!", {
                    icon: <CircleCheck color="green" />,
                });
        },
    });
}
export function useUpdateFashionLine() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateFashionLine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fashion-lines"] }),
                toast("Coleção atualizada com sucesso", {
                    icon: <CircleCheck color="green" />,
                });
        },
    });
}

export function useDeleteFashionLine() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFashionLine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fashion-lines"] }),
                toast("Coleção excluída com sucesso", {
                    icon: <Trash2 color="red" />,
                });
        },
    });
}
