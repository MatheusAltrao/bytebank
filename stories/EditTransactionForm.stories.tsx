import EditTransactionForm from '@/components/transactions/components/edit-transaction-form'
import type { Transaction } from '@/types/transaction'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const mockTransaction: Transaction = {
  id: '1',
  title: 'Salário',
  type: 'deposit',
  date: new Date('2026-03-01').toISOString(),
  amount: 5000,
  createdAt: new Date('2026-02-28').toISOString(),
  description: 'Recebimento do salário mensal',
}

const mockRetirada: Transaction = {
  id: '2',
  title: 'Aluguel',
  type: 'withdrawal',
  date: new Date('2026-03-05').toISOString(),
  amount: 1200,
  createdAt: new Date('2026-03-04').toISOString(),
  description: 'Pagamento do aluguel',
}

const meta: Meta<typeof EditTransactionForm> = {
  title: 'Transações/EditTransactionForm',
  component: EditTransactionForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-95">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EditTransactionForm>

export const EditDeposito: Story = {
  name: 'Editar Depósito',
  args: {
    transaction: mockTransaction,
  },
}

export const EditRetirada: Story = {
  name: 'Editar Retirada',
  args: {
    transaction: mockRetirada,
  },
}
