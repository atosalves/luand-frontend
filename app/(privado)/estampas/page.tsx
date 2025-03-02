import { Header } from "@/components/ui/header";
import { CreateDialogPrint } from "./components/create-dialog-print";
import { AllPrints } from "./components/all-prints";

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
