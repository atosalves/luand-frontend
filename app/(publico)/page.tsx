import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <h1>Coleção</h1>
            <Link href="/login">
                <Button>Login</Button>
            </Link>
        </>
    );
}
