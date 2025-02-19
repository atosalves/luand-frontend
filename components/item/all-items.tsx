"use client";

import { useGetAllModels } from "@/hooks/use-model";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";

import { UpdateDialogModel } from "./update-dialog-item";
// import { DeleteDialogModel } from "./delete-dialog-item";
import { Loading } from "../loading";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const formatBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

const items = [{ id: 1 }];

export function AllItems() {
    // if (isLoading) return <Loading />;
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
    //             <AlertDescription>Clique no botão "Criar modelo" para criar um modelo</AlertDescription>
    //         </Alert>
    //     );
    // return (
    //     <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
    //         {data?.map(({ id, name, description, price, supportedSizes }) => (
    //             <Card key={id}>
    //                 <CardHeader>
    //                     <CardTitle>{name}</CardTitle>
    //                     <CardDescription>{description}</CardDescription>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <div className="flex justify-between items-center">
    //                         <div className="space-x-2">
    //                             {supportedSizes
    //                                 .slice()
    //                                 .reverse()
    //                                 .map((size) => (
    //                                     <Badge key={size}>{size}</Badge>
    //                                 ))}
    //                         </div>
    //                         <Label>{formatBRL.format(price)}</Label>
    //                     </div>
    //                 </CardContent>
    //                 <CardFooter className="space-x-2 justify-self-end">
    //                     <UpdateDialogModel
    //                         {...{
    //                             id,
    //                             name,
    //                             description,
    //                             price,
    //                             supportedSizes,
    //                         }}
    //                     />
    //                     <DeleteDialogModel {...{ id, name }} />
    //                 </CardFooter>
    //             </Card>
    //         ))}
    //     </section>
    // );
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">REF.</TableHead>
                    <TableHead>Estampa</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">01</TableCell>
                    <TableCell>PROTEGIDA POR DEUS</TableCell>
                    <TableCell>T-SHIRT</TableCell>
                    <TableCell>M</TableCell>
                    <TableCell>
                        <div className="size-5 bg-green-700 rounded-full"></div>
                    </TableCell>
                    <TableCell className="text-right space-x-4">
                        <Button variant="outline">
                            <Edit2 />
                        </Button>
                        <Button variant="destructive">
                            <Trash2 />
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
