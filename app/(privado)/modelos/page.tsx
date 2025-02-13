"use client";

import { AllModels } from "@/components/model/all-models";
import { CreateDialogModel } from "@/components/model/create-dialog-model";
import { Toaster } from "@/components/ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/ui/header";

const queryClient = new QueryClient();

export default function ModelosPage() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Header
                    title="Modelos"
                    description="Lista de modelos para gerenciar"
                >
                    <CreateDialogModel />
                </Header>
                <AllModels />
            </QueryClientProvider>
            <Toaster />
        </>
    );
}
