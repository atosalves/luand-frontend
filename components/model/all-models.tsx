import { useGetAllModels } from "@/hooks/use-model";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";

import { UpdateDialogModel } from "./update-dialog-model";
import { DeleteDialogModel } from "./delete-dialog-model";

const formatBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function AllModels() {
    const { data, isLoading, isError } = useGetAllModels();

    if (isLoading)
        return (
            <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="w-28 h-6" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="w-full h-16" />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                                <Skeleton className="w-9 h-5" />
                                <Skeleton className="w-9 h-5" />
                                <Skeleton className="w-9 h-5" />
                            </div>
                            <Skeleton className="w-9 h-5" />
                        </div>
                    </CardContent>
                    <CardFooter className="space-x-2 justify-self-end">
                        <Skeleton className="w-10 h-8" />
                        <Skeleton className="w-10 h-8" />
                    </CardFooter>
                </Card>
            </section>
        );

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
                <AlertDescription>
                    Clique no botão "Criar modelo" para criar um modelo
                </AlertDescription>
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
