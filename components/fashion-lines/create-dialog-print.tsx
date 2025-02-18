"use client";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

import { useState } from "react";
import { PrintForm } from "./print-form";
import { useCreatePrint } from "@/hooks/use-print";

export function CreateDialogPrint() {
    const { mutate, error, isPending } = useCreatePrint();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog onOpenChange={() => setIsOpen((prevUpdate) => !prevUpdate)} open={isOpen}>
            <DialogTrigger asChild>
                <Button>Criar estampa</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle>Criar estampa</DialogTitle>

                <PrintForm
                    onSubmit={(printForm) =>
                        mutate(printForm, {
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
