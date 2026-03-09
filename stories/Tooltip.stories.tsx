import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Pen, Trash } from 'lucide-react'

const meta: Meta = {
  title: 'UI/Tooltip',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Passe o mouse</Button>
      </TooltipTrigger>
      <TooltipContent>Tooltip de exemplo</TooltipContent>
    </Tooltip>
  ),
}

export const EditAction: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon-lg" variant="warning">
          <Pen />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Editar transação</TooltipContent>
    </Tooltip>
  ),
}

export const DeleteAction: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon-lg" variant="destructive">
          <Trash />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Excluir transação</TooltipContent>
    </Tooltip>
  ),
}
