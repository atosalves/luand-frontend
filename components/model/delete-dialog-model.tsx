"use client";

import { useDeleteModel } from "@/hooks/use-model";

import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { DeleteButton } from "../delete-button";

interface DeleteModelProps {
    id: number;
    name: string;
}

export function DeleteDialogModel({ id, name }: DeleteModelProps) {
    const { mutate, isPending } = useDeleteModel();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog onOpenChange={() => setIsOpen((prevUpdate) => !prevUpdate)} open={isOpen}>
            <DialogTrigger asChild>
                <DeleteButton />
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle>Excluir o modelo {name}?</DialogTitle>

                <DialogFooter className="flex flex-row space-x-4 justify-end">
                    <Button
                        variant="destructive"
                        onClick={() =>
                            mutate(id, {
                                onSuccess: () => {
                                    setIsOpen((prevUpdate) => !prevUpdate);
                                },
                            })
                        }
                        disabled={isPending}
                    >
                        Excluir
                    </Button>
                    <DialogClose asChild>
                        <Button>Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
