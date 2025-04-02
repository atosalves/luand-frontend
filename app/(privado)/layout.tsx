"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col items-center space-y-4 w-full p-4">
                <SidebarTrigger className="self-start" />
                <section className="flex flex-col w-full space-y-4">{children}</section>
            </main>
        </SidebarProvider>
    );
}
