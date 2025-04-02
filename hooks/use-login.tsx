import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { login } from "@/api/login.api";
import { LoginFormData, loginSchema } from "@/schemas/login.schema";

export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();

    function onSubmit(loginFormData: LoginFormData) {
        setIsLoading(true);
        toast.promise(
            async () => {
                await login(loginFormData);
            },
            {
                success: () => {
                    router.push("/dashboard");
                    return "Logado com sucesso";
                },
                error: ({ message }) => message,
                loading: "Carregando...",
                finally: () => setIsLoading(false),
            }
        );
    }

    return { form, onSubmit, isLoading };
}
