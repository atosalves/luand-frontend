import { Loader2 } from "lucide-react";
import { Label } from "./ui/label";

export function Loading() {
    return (
        <div className="flex items-center self-center space-x-4">
            <Loader2 className="animate-spin" />
            <Label>carregando...</Label>
        </div>
    );
}
