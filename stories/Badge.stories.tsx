import { Badge } from "@/components/ui/badge";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Badge> = {
    title: "UI/Badge",
    component: Badge,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        children: "Depósito",
        variant: "default",
    },
};

export const Destructive: Story = {
    args: {
        children: "Retirada",
        variant: "destructive",
    },
};

export const Secondary: Story = {
    args: {
        children: "Pendente",
        variant: "secondary",
    },
};

export const Outline: Story = {
    args: {
        children: "Outline",
        variant: "outline",
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
        </div>
    ),
};
