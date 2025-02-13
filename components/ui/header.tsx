import { ReactNode } from "react";

interface HeaderProps {
    title: string;
    description: string;
    children?: ReactNode;
}

export function Header({ title, description, children }: HeaderProps) {
    return (
        <header className="flex justify-between items-center">
            <div>
                <h1 className="font-bold text-xl">{title}</h1>
                <h3>{description}</h3>
            </div>
            {children}
        </header>
    );
}
