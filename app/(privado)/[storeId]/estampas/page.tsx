import { AllPrints } from "@/components/fashion-lines/all-prints";
import { CreateDialogPrint } from "@/components/fashion-lines/create-dialog-print";
import { Header } from "@/components/ui/header";

export default function ColecaoPage() {
    return (
        <>
            <Header title="Coleções" description="Lista de coleções para gerenciar">
                <CreateDialogPrint />
            </Header>
            <AllPrints />
        </>
    );
}
