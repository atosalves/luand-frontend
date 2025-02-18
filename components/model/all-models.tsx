"use client";

import { useGetAllModels } from "@/hooks/use-model";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";

import { UpdateDialogModel } from "./update-dialog-model";
import { DeleteDialogModel } from "./delete-dialog-model";
import { Loading } from "../loading";

const formatBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function AllModels() {
    const { data, isLoading, isError } = useGetAllModels();

    if (isLoading) return <Loading />;

    if (isError)
        return (
            <Alert variant="destructive">
                <AlertTitle>Algo deu errado!</AlertTitle>
                <AlertDescription>Erro ao buscar modelos</AlertDescription>
            </Alert>
        );

    if (data?.length === 0)
        return (
            <Alert>
                <AlertTitle>Nenhum modelo foi criado!</AlertTitle>
                <AlertDescription>Clique no botão "Criar modelo" para criar um modelo</AlertDescription>
            </Alert>
        );

    return (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {data?.map(({ id, name, description, price, supportedSizes }) => (
                <Card key={id}>
                    <CardHeader>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="space-x-2">
                                {supportedSizes
                                    .slice()
                                    .reverse()
                                    .map((size) => (
                                        <Badge key={size}>{size}</Badge>
                                    ))}
                            </div>
                            <Label>{formatBRL.format(price)}</Label>
                        </div>
                    </CardContent>
                    <CardFooter className="space-x-2 justify-self-end">
                        <UpdateDialogModel
                            {...{
                                id,
                                name,
                                description,
                                price,
                                supportedSizes,
                            }}
                        />
                        <DeleteDialogModel {...{ id, name }} />
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
}
