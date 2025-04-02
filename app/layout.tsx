import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CircleAlert, CircleCheck } from "lucide-react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-br">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <main className="flex flex-col items-center justify-center gap-4 h-dvh p-4">
                    <Toaster
                        position="top-center"
                        icons={{ error: <CircleAlert color="red" />, success: <CircleCheck color="green" /> }}
                    />
                    {children}
                </main>
            </body>
        </html>
    );
}
