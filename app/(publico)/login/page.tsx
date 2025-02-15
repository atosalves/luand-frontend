import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="flex flex-col w-full h-dvh items-center justify-center space-y-4">
            <Link href="/" className="">
                <Button variant="link" asChild>
                    <div className="flex space-x-2">
                        <ArrowLeft />
                        Voltar para o catálogo
                    </div>
                </Button>
            </Link>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Preencha seus dados previamente cadastrados para fazer
                        login
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </main>
    );
}
