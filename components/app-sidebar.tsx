"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Label } from "./ui/label";

import { Cog, Image, LogOut, ScissorsLineDashed } from "lucide-react";

import Link from "next/link";
import { removeToken } from "@/lib/token-utils";
import { usePathname } from "next/navigation";

const links = [
    { path: "/estampas", icon: <Image />, title: "Estampas" },
    { path: "/modelos", icon: <ScissorsLineDashed />, title: "Modelos" },
] as const;

export function AppSidebar() {
    const pathname = usePathname();
    return (
        <Sidebar>
            <SidebarHeader>
                <Label>Luand</Label>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {links.map(({ path, icon, title }) => (
                        <SidebarMenuItem key={title} className="px-2">
                            <SidebarMenuButton
                                asChild
                                className={`${
                                    pathname === path ? "bg-neutral-200 hover:bg-neutral-200" : "hover:bg-neutral-200"
                                }`}
                            >
                                <Link href={path}>
                                    {icon}
                                    <span>{title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/luand">
                            <Link href="/luand">
                                <Cog />
                                <span>Loja</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/login" onClick={removeToken}>
                                <LogOut />
                                <span>Fazer logout</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
