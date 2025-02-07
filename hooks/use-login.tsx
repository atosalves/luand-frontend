import { login } from "@/services/login-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogin() {
	const router = useRouter();

	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			localStorage.setItem("token", data.token);
			router.push("/dashboard");
		},
	});
}
