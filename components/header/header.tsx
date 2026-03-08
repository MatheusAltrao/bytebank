import { Plus } from "lucide-react";
import Image from "next/image";
import LogoBytebank from '../../assets/logo-bytebank.svg';
import { Button } from "../ui/button";

export default function Header() {
    return (
        <header className="w-full border-b" >
            <div className="p-2 w-full max-w-5xl mx-auto flex items-center justify-between " >
                <Image src={LogoBytebank} alt="Logo Bytebank" height={32} width={180} />
                <Button><Plus /> Nova Transação</Button>
            </div>
        </header>
    )
}