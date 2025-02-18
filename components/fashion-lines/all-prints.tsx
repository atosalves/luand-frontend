"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { EditButton } from "../edit-button";
import { DeleteButton } from "../delete-button";
import { useGetAllPrints } from "@/hooks/use-print";
import { Label } from "../ui/label";
import { DeleteDialogPrint } from "./delete-dialog-print";

export function AllPrints() {
    const { data, isLoading, isError } = useGetAllPrints();

    // if (isLoading)
    //     return (
    //         <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
    //             <Card>
    //                 <CardHeader>
    //                     <CardTitle>
    //                         <Skeleton className="w-28 h-6" />
    //                     </CardTitle>
    //                     <CardDescription>
    //                         <Skeleton className="w-full h-16" />
    //                     </CardDescription>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <div className="flex justify-between items-center">
    //                         <div className="flex space-x-2">
    //                             <Skeleton className="w-9 h-5" />
    //                             <Skeleton className="w-9 h-5" />
    //                             <Skeleton className="w-9 h-5" />
    //                         </div>
    //                         <Skeleton className="w-9 h-5" />
    //                     </div>
    //                 </CardContent>
    //                 <CardFooter className="space-x-2 justify-self-end">
    //                     <Skeleton className="w-10 h-8" />
    //                     <Skeleton className="w-10 h-8" />
    //                 </CardFooter>
    //             </Card>
    //         </section>
    //     );

    // if (isError)
    //     return (
    //         <Alert variant="destructive">
    //             <AlertTitle>Algo deu errado!</AlertTitle>
    //             <AlertDescription>Erro ao buscar modelos</AlertDescription>
    //         </Alert>
    //     );

    // if (data?.length === 0)
    //     return (
    //         <Alert>
    //             <AlertTitle>Nenhum modelo foi criado!</AlertTitle>
    //             <AlertDescription>
    //                 Clique no botão "Criar modelo" para criar um modelo
    //             </AlertDescription>
    //         </Alert>
    //     );

    return (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {data?.map(({ id, name, image, modelDTO }) => (
                <Card key={id} className="overflow-hidden">
                    <CardHeader className="p-0 pb-4">
                        <AspectRatio ratio={3 / 4}>
                            <Image
                                src={`https://luand.s3.us-east-2.amazonaws.com/${image}`}
                                alt="Imagem da coleção"
                                fill
                                priority
                                sizes="(max-width: 768px), (max-width: 1200px)"
                                className="object-cover"
                            />
                        </AspectRatio>
                    </CardHeader>
                    <CardContent>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>{modelDTO.name}</CardDescription>
                    </CardContent>
                    <CardFooter className="space-x-2 justify-self-end">
                        <EditButton />
                        <DeleteDialogPrint {...{ id, image, name }} />
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
}
