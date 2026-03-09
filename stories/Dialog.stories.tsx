import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus } from "lucide-react";

const meta: Meta = {
    title: "UI/Dialog",
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button><Plus /> Abrir Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Título do Dialog</DialogTitle>
                    <DialogDescription>
                        Descrição do dialog com informações adicionais.
                    </DialogDescription>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">Conteúdo do dialog aqui.</p>
            </DialogContent>
        </Dialog>
    ),
};

export const AddTransaction: Story = {
    name: "Dialog Nova Transação",
    render: () => (
        <Dialog>
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
            </DialogContent>
        </Dialog>
    ),
};
