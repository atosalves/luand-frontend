import {
    createItem,
    getAllItems,
    // deleteItem,
    // updateItem,
} from "@/services/item/item-service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function useGetAllItems() {
    return useQuery({
        queryKey: ["items"],
        queryFn: getAllItems,
    });
}

export function useCreateItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] }),
                toast("Itemo criado com sucesso!", {
                    icon: <CircleCheck color="green" />,
                });
        },
    });
}

// export function useUpdateItem() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: updateItem,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["items"] }),
//                 toast("Itemo atualizado com sucesso", {
//                     icon: <CircleCheck color="green" />,
//                 });
//         },
//     });
// }

// export function useDeleteItem() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: deleteItem,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["items"] }),
//                 toast("Itemo excluído com sucesso", {
//                     icon: <Trash2 color="red" />,
//                 });
//         },
//     });
// }
