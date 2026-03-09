import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: 'Título',
  },
}

export const WithInput: Story = {
  render: () => (
    <div className="grid gap-2 w-72">
      <Label htmlFor="nome">Nome</Label>
      <Input id="nome" placeholder="Seu nome" />
    </div>
  ),
}
