import {
    createModel,
    deleteModel,
    getAllModels,
    updateModel,
} from "@/services/model-service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function useGetAllModels() {
    return useQuery({
        queryKey: ["models"],
        queryFn: getAllModels,
    });
}

export function useCreateModel() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createModel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["models"] }),
                toast("Modelo criado com sucesso!", {
                    icon: <CircleCheck color="green" />,
                });
        },
    });
}
export function useUpdateModel() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateModel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["models"] }),
                toast("Modelo atualizado com sucesso", {
                    icon: <CircleCheck color="green" />,
                });
        },
    });
}

export function useDeleteModel() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteModel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["models"] }),
                toast("Modelo excluído com sucesso", {
                    icon: <Trash2 color="red" />,
                });
        },
    });
}
