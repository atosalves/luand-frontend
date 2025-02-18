import { StoreDetails } from "@/components/store/store-details";

interface LojaPageProps {
    params: Promise<{ storeId: number }>;
}

export default async function LojaPage({ params }: LojaPageProps) {
    const storeId = (await params).storeId;

    return (
        <>
            <StoreDetails id={storeId} />
        </>
    );
}
