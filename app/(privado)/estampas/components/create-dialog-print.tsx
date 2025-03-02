"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useGetAllModels } from "@/hooks/use-model";

import Image from "next/image";

import { useCreatePrint } from "@/hooks/use-create-print";

export function CreateDialogPrint() {
    const useAllModels = useGetAllModels();

    const { isOpen, setIsOpen, setSelectedFile, mutate, form, isPending, preview } = useCreatePrint();

    return (
        <Dialog onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
            <DialogTrigger asChild>
                <Button>Criar estampa</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogTitle>Criar estampa</DialogTitle>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((formData) => mutate(formData))}
                        className="flex flex-col space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="imageFile"
                            render={({ field }) => (
                                <>
                                    <div className="rounded-2xl overflow-hidden">
                                        <AspectRatio
                                            ratio={5 / 4}
                                            className="flex justify-center items-center w-full h-full "
                                        >
                                            {preview ? (
                                                <Image
                                                    src={preview}
                                                    alt="Imagem da estampa"
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <span>Selecione uma imagem</span>
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
                                                        const imageFile = event.target.files[0];

                                                        field.onChange(imageFile);
                                                        setSelectedFile(imageFile);
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
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
