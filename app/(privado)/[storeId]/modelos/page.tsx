import { AllModels } from "@/components/model/all-models";
import { CreateDialogModel } from "@/components/model/create-dialog-model";
import { Toaster } from "@/components/ui/sonner";

import { Header } from "@/components/ui/header";

export default function ModelosPage() {
    return (
        <>
            <Header
                title="Modelos"
                description="Lista de modelos para gerenciar"
            >
                <CreateDialogModel />
            </Header>
            <AllModels />
            <Toaster />
        </>
    );
}
