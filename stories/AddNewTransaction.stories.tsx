import AddNewTransaction from "@/components/header/components/add-new-transaction";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof AddNewTransaction> = {
    title: "Transações/AddNewTransaction",
    component: AddNewTransaction,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof AddNewTransaction>;

export const Default: Story = {};
