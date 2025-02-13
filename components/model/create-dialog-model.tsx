import { useCreateModel } from "@/hooks/use-model";

import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { ModelForm } from "./model-form";

import { useState } from "react";

export function CreateDialogModel() {
    const { mutate, error, isPending } = useCreateModel();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog
            onOpenChange={() => setIsOpen((prevUpdate) => !prevUpdate)}
            open={isOpen}
        >
            <DialogTrigger asChild>
                <Button>Criar modelo</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle>Criar modelo</DialogTitle>
                <ModelForm
                    onSubmit={(modelFormData) =>
                        mutate(
                            modelFormData,

                            {
                                onSuccess: () => {
                                    setIsOpen((prevUpdate) => !prevUpdate);
                                },
                            }
                        )
                    }
                    {...{ isPending, error }}
                />
            </DialogContent>
        </Dialog>
    );
}
