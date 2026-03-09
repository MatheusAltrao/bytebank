import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta = {
    title: "UI/Select",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <Select>
            <SelectTrigger className="w-44">
                <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="deposito">Depósito</SelectItem>
                <SelectItem value="retirada">Retirada</SelectItem>
            </SelectContent>
        </Select>
    ),
};

export const WithFilter: Story = {
    render: () => (
        <Select defaultValue="todos">
            <SelectTrigger className="w-44">
                <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="deposito">Depósito</SelectItem>
                <SelectItem value="retirada">Retirada</SelectItem>
            </SelectContent>
        </Select>
    ),
};
