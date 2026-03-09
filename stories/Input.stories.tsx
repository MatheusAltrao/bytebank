import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Search } from 'lucide-react'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2 w-72">
      <Label htmlFor="titulo">Título</Label>
      <Input id="titulo" placeholder="Ex: Salário, Aluguel..." />
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="relative w-72">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Buscar..." className="pl-9" />
    </div>
  ),
}

export const CurrencyInput: Story = {
  render: () => (
    <div className="relative w-72">
      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
        R$
      </span>
      <Input placeholder="0,00" className="pl-9" inputMode="numeric" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Desabilitado',
    disabled: true,
  },
}

export const Invalid: Story = {
  render: () => (
    <div className="grid gap-2 w-72">
      <Label htmlFor="invalid">Campo obrigatório</Label>
      <Input id="invalid" aria-invalid placeholder="Campo com erro" />
      <span className="text-xs text-destructive">Este campo é obrigatório</span>
    </div>
  ),
}
