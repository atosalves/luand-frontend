import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Email deve ser válido" }),
    password: z
        .string()
        .min(8, "A senha deve conter no mínimo 8 caracteres")
        .max(20, "A senha deve conter no máximo 20 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
