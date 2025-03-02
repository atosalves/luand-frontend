import { CreatePrintSchema } from "@/models/print-schemas";
import { createPrint } from "@/services/print-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function useCreatePrint() {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof CreatePrintSchema>>({
        resolver: zodResolver(CreatePrintSchema),
        defaultValues: {
            name: "",
            imageFile: undefined,
        },
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: createPrint,
        onError: () => toast.error("Ocorreu um erro!"),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["prints"] });
            toast.success("Estampa criada com sucesso!");
            form.reset();
            setPreview(null);
            setSelectedFile(null);
        },
    });

    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);

    return {
        form,
        preview,
        isOpen,
        isPending,
        mutate,
        setIsOpen,
        setSelectedFile,
    };
}
