"use client";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

import { useState } from "react";
import { FashionLineForm } from "./fashion-line-form";
import { useCreateFashionLine } from "@/hooks/use-fashion-line";

export function CreateDialogFashionLine() {
    const { mutate, error, isPending } = useCreateFashionLine();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog onOpenChange={() => setIsOpen((prevUpdate) => !prevUpdate)} open={isOpen}>
            <DialogTrigger asChild>
                <Button>Criar coleção</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle>Criar coleção</DialogTitle>

                <FashionLineForm
                    onSubmit={(fashionLineForm) =>
                        mutate(fashionLineForm, {
                            onSuccess: () => {
                                setIsOpen((prevUpdate) => !prevUpdate);
                            },
                        })
                    }
                    {...{ isPending, error }}
                />
            </DialogContent>
        </Dialog>
    );
}
