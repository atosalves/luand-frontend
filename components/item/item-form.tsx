import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Sizes } from "@/services/model-service";
import { Textarea } from "../ui/textarea";
import { CreateItemDTO } from "@/services/item/item-service";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ModelFormProps {
    onSubmit: SubmitHandler<z.infer<typeof CreateItemDTO>>;
    isPending: boolean;
    error: Error | null;
    data?: z.infer<typeof CreateItemDTO>;
}

export function ItemForm({ onSubmit, isPending, error, data }: ModelFormProps) {
    const form = useForm<z.infer<typeof CreateItemDTO>>({
        resolver: zodResolver(CreateItemDTO),
        defaultValues: {
            ref: "",
            printId: 0,
            color: "#000000",
            size: undefined,
            availableQuantity: 0,
        },
    });

    function teste(data: z.infer<typeof CreateItemDTO>) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(teste)} className="flex flex-col space-y-8">
                <FormField
                    control={form.control}
                    name="ref"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Referência</FormLabel>
                            <FormControl>
                                <Input placeholder="Referência" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="printId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estampa</FormLabel>
                            <FormControl>
                                <Input placeholder="Estampa" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cor</FormLabel>
                            <FormControl>
                                <Input type="color" placeholder="Cor" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="size"
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
                                    {Sizes.map((size) => (
                                        <SelectItem key={size} value={size}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="availableQuantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantidade</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Valor" {...field} />
                            </FormControl>
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
    );
}
