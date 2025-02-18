"use client";

import { useDeleteFashionLine } from "@/hooks/use-fashion-line";

import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteFashionLineProps {
    id: number;
    print: string;
    name: string;
}

export function DeleteDialogFashionLine({ id, print, name }: DeleteFashionLineProps) {
    const { mutate, isPending } = useDeleteFashionLine();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog onOpenChange={() => setIsOpen((prevUpdate) => !prevUpdate)} open={isOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    <Trash2 color="white" />
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle>Excluir a coleção {name}?</DialogTitle>

                <DialogFooter className="flex flex-row space-x-4 justify-end">
                    <Button
                        variant="destructive"
                        onClick={() =>
                            mutate(
                                { id, print },
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
