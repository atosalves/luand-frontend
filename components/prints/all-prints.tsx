"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useGetAllPrints } from "@/hooks/use-print";
import { DeleteDialogPrint } from "./delete-dialog-print";
import { Loading } from "../loading";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

export function AllPrints() {
    const { data, isLoading, isError } = useGetAllPrints();

    if (isLoading) return <Loading />;

    if (isError)
        return (
            <Alert variant="destructive">
                <AlertTitle>Algo deu errado!</AlertTitle>
                <AlertDescription>Erro ao buscar estampas</AlertDescription>
            </Alert>
        );

    if (data?.length === 0)
        return (
            <Alert>
                <AlertTitle>Nenhuma estampa foi criada!</AlertTitle>
                <AlertDescription>Clique no botão "Criar estampa" para criar uma estampa</AlertDescription>
            </Alert>
        );

    return (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {data?.map(({ id, name, image, modelSummaryDTO }, index) => (
                <Card key={id} className="overflow-hidden">
                    <CardHeader className="p-0 pb-4">
                        <AspectRatio ratio={3 / 4}>
                            <Image
                                src={`https://luand.s3.us-east-2.amazonaws.com/${image}`}
                                alt="Imagem da estampa"
                                fill
                                priority
                                sizes="(max-width: 768px), (max-width: 1200px)"
                                className="object-cover"
                            />
                        </AspectRatio>
                    </CardHeader>
                    <CardContent>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>{modelSummaryDTO.name}</CardDescription>
                    </CardContent>
                    <CardFooter className="space-x-2 justify-self-end">
                        <DeleteDialogPrint {...{ id, image, name }} />
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
}
