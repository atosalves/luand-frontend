import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export function DeleteButton() {
    return (
        <Button variant="destructive">
            <Trash2 color="white" />
        </Button>
    );
}
