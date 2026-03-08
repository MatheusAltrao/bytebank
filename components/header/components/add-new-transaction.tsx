"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddNewTransactionForm from "./add-new-transaction-form";

export default function AddNewTransaction() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Plus /> Nova Transação</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar nova transação</DialogTitle>
                    <DialogDescription>
                        Para acompanhar seus gastos e receitas. Preencha os detalhes da transação, para manter seu controle financeiro atualizado.
                    </DialogDescription>
                </DialogHeader>
                <AddNewTransactionForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}