import { AllPrints } from "@/components/prints/all-prints";
import { CreateDialogPrint } from "@/components/prints/create-dialog-print";
import { Header } from "@/components/ui/header";

export default function EstampasPage() {
    return (
        <>
            <Header title="Estampas" description="Lista de estampas para gerenciar">
                <CreateDialogPrint />
            </Header>
            <AllPrints />
        </>
    );
}
