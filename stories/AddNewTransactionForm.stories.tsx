import AddNewTransactionForm from "@/components/header/components/add-new-transaction-form";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";

const meta: Meta<typeof AddNewTransactionForm> = {
    title: "Transações/AddNewTransactionForm",
    component: AddNewTransactionForm,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    decorators: [
        (Story) => (
            <div className="w-95">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof AddNewTransactionForm>;

export const Default: Story = {
    args: {
        onSuccess: fn(),
    },
};
