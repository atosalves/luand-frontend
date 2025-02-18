import { useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";

export function ImagePreview() {
    const [imagem, setImagem] = useState<File>();
    return (
        <div className="rounded-2xl overflow-hidden">
            <AspectRatio
                ratio={5 / 4}
                className="flex justify-center items-center w-full h-full "
            >
                {imagem ? (
                    <Image
                        src={URL.createObjectURL(imagem)}
                        alt="Capa de coleção"
                        fill
                        className="object-cover"
                    />
                ) : (
                    <span>Selecione uma imagem para capa de coleção</span>
                )}
            </AspectRatio>
        </div>
    );
}
