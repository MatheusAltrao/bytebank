import EditTransaction from "@/components/transactions/components/edit-transaction";
import type { Transaction } from "@/types/transaction";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const mockTransaction: Transaction = {
    id: "1",
    title: "Salário",
    type: "deposito",
    date: new Date("2026-03-01").toISOString(),
    value: 5000,
};

const meta: Meta<typeof EditTransaction> = {
    title: "Transações/EditTransaction",
    component: EditTransaction,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof EditTransaction>;

export const Default: Story = {
    args: {
        transaction: mockTransaction,
    },
};
