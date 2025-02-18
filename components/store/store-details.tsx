"use client";

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

import { useGetStoreById } from "@/hooks/use-store";

export function StoreDetails({ id }: { id: number }) {
    const { data, isLoading, isError } = useGetStoreById(id);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{data?.name}</CardTitle>
                <CardDescription>{data?.description}</CardDescription>
            </CardHeader>
        </Card>
    );
}
