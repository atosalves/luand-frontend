import { AllPrints } from "@/components/fashion-lines/all-prints";
import { CreateDialogPrint } from "@/components/fashion-lines/create-dialog-print";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Header } from "@/components/ui/header";
import Image from "next/image";

const itensF = [
    {
        id: 1,
        name: "nome1",
        print: "https://luand.s3.us-east-2.amazonaws.com/Imagem+do+WhatsApp+de+2025-02-11+%C3%A0(s)+07.14.52_b17d4636.jpg",
        modelName: "T-SHIRT",
    },
    {
        id: 2,
        name: "nome2",
        print: "https://luand.s3.us-east-2.amazonaws.com/Imagem+do+WhatsApp+de+2025-02-11+%C3%A0(s)+07.21.22_f4e8a795.jpg",
        modelName: "T-SHIRT",
    },
    {
        id: 3,
        name: "nome3",
        print: "https://luand.s3.us-east-2.amazonaws.com/Imagem+do+WhatsApp+de+2025-02-11+%C3%A0(s)+07.21.50_20ce8a29.jpg",
        modelName: "T-SHIRT",
    },
];

export default function ColecaoPage() {
    return (
        <>
            <Header title="Coleções" description="Lista de coleções para gerenciar">
                <CreateDialogPrint />
            </Header>
            <AllPrints data={itensF} />
        </>
    );
}
