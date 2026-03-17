import EditTransaction from '@/components/transactions/components/edit-transaction'
import type { TransactionProps } from '@/types/transaction.types'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const mockTransaction: TransactionProps = {
  id: '1',
  title: 'Salário',
  type: 'deposit',
  date: new Date('2026-03-01').toISOString(),
  amount: 5000,
  createdAt: new Date('2026-02-28').toISOString(),
  description: 'Recebimento do salário mensal',
}

const meta: Meta<typeof EditTransaction> = {
  title: 'Transações/EditTransaction',
  component: EditTransaction,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof EditTransaction>

export const Default: Story = {
  args: {
    transaction: mockTransaction,
  },
}
