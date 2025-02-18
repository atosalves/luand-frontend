import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FashionLineSchema } from "@/services/print/print-schemas";
import { useGetAllModels } from "@/hooks/use-model";

import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface FashionLineFormProps {
    onSubmit: SubmitHandler<z.infer<typeof FashionLineSchema>>;
    isPending: boolean;
    error: Error | null;
    data?: z.infer<typeof FashionLineSchema>;
}

export function FashionLineForm({ onSubmit, isPending, error, data }: FashionLineFormProps) {
    const useAllModels = useGetAllModels();

    const form = useForm<z.infer<typeof FashionLineSchema>>({
        resolver: zodResolver(FashionLineSchema),
        defaultValues: {
            name: data?.name || "",
            print: undefined,
            modelId: data?.modelId || 0,
        },
    });

    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [preview, setPreview] = useState<string>();

    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                    <FormField
                        control={form.control}
                        name="print"
                        render={({ field }) => (
                            <>
                                <div className="rounded-2xl overflow-hidden">
                                    <AspectRatio
                                        ratio={5 / 4}
                                        className="flex justify-center items-center w-full h-full "
                                    >
                                        {preview ? (
                                            <Image src={preview} alt="Capa de coleção" fill className="object-cover" />
                                        ) : (
                                            <span>Selecione uma imagem para capa de coleção</span>
                                        )}
                                    </AspectRatio>
                                </div>
                                <FormItem>
                                    <FormLabel>Estampa</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(event) => {
                                                if (event.target.files) {
                                                    const image = event.target.files[0];

                                                    field.onChange(image);
                                                    setSelectedFile(image);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="modelId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Modelo</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Modelos" {...field} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {useAllModels.data?.map(({ id, name }) => (
                                            <SelectItem key={id} value={id + ""}>
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isPending}>
                        Salvar
                    </Button>
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Ocorreu um problema</AlertTitle>
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )}
                </form>
            </Form>
        </>
    );
}
