"use client";

import { useUpdateModel } from "@/hooks/use-model";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { ModelForm } from "./model-form";
import { useState } from "react";

import { extendedModelSchema } from "@/services/model-service";
import { z } from "zod";
import { Pencil } from "lucide-react";

export function UpdateDialogModel({ ...data }: z.infer<typeof extendedModelSchema>) {
    const { mutate, error, isPending } = useUpdateModel();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog onOpenChange={() => setIsOpen((prevUpdate) => !prevUpdate)} open={isOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Pencil color="white" />
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle>Editar modelo</DialogTitle>

                <ModelForm
                    onSubmit={(modelFormData) =>
                        mutate(
                            { ...modelFormData, id: data.id },
                            {
                                onSuccess: () => {
                                    setIsOpen((prevUpdate) => !prevUpdate);
                                },
                            }
                        )
                    }
                    data={data}
                    {...{ isPending, error }}
                />
            </DialogContent>
        </Dialog>
    );
}
