import TransactionsList from '@/components/transactions/transactions-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof TransactionsList> = {
  title: 'Transações/TransactionsList',
  component: TransactionsList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl mx-auto">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TransactionsList>

export const Default: Story = {}
