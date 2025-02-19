"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function PrivateLayout({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SidebarProvider>
                <AppSidebar />
                <main className="flex flex-col items-center space-y-4 w-full p-4">
                    <SidebarTrigger className="self-start" />
                    <section className="flex flex-col w-full space-y-4">{children}</section>
                </main>
            </SidebarProvider>
        </QueryClientProvider>
    );
}
