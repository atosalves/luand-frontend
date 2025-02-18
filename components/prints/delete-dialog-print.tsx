"use client";

import { useDeletePrint } from "@/hooks/use-print";

import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeletePrintProps {
    id: number;
    image: string;
    name: string;
}

export function DeleteDialogPrint({ id, image, name }: DeletePrintProps) {
    const { mutate, isPending } = useDeletePrint();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog onOpenChange={() => setIsOpen((prevUpdate) => !prevUpdate)} open={isOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    <Trash2 color="white" />
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle>Deseja excluir a estampa {name}?</DialogTitle>

                <DialogFooter className="flex flex-row space-x-4 justify-end">
                    <Button
                        variant="destructive"
                        onClick={() =>
                            mutate(
                                { id, image },
                                {
                                    onSuccess: () => {
                                        setIsOpen((prevUpdate) => !prevUpdate);
                                    },
                                }
                            )
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
