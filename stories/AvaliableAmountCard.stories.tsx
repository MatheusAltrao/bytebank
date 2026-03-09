import AvaliableAmountCard from '@/components/sections/components/avaliable-amount-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof AvaliableAmountCard> = {
  title: 'Seções/AvaliableAmountCard',
  component: AvaliableAmountCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof AvaliableAmountCard>

export const Default: Story = {}
