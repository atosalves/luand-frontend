"use client";

import { useCreateModel } from "@/hooks/use-model";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ItemForm } from "./item-form";

import { useState } from "react";

export function CreateDialogItem() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog onOpenChange={() => setIsOpen((prevUpdate) => !prevUpdate)} open={isOpen}>
            <DialogTrigger asChild>
                <Button>Criar item</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle>Criar item</DialogTitle>
                <ItemForm
                    onSubmit={function (
                        data: { color: string; size: "PP" | "P" | "M" | "G" | "GG"; availableQuantity: number },
                        event?: React.BaseSyntheticEvent
                    ): unknown | Promise<unknown> {
                        throw new Error("Function not implemented.");
                    }}
                    isPending={false}
                    error={null}
                />
            </DialogContent>
        </Dialog>
    );
    return <>Criar</>;
}
