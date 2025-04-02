import { LoginForm } from "./components/login-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Preencha seus dados previamente cadastrados para fazer login</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
            <Button variant="link" asChild>
                <Link href="/">
                    <ArrowLeft />
                    <span>Voltar para o catálogo</span>
                </Link>
            </Button>
        </>
    );
}
