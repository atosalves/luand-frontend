import { AllItems } from "@/components/item/all-items";
import { CreateDialogItem } from "@/components/item/create-dialog-item";
import { AllPrints } from "@/components/prints/all-prints";
import { CreateDialogPrint } from "@/components/prints/create-dialog-print";
import { Header } from "@/components/ui/header";

export default function EstoquePage() {
    return (
        <>
            <Header title="Estoque" description="Tabela de items para gerenciar">
                <CreateDialogItem />
            </Header>
            <AllItems />
        </>
    );
}
