import { TransactionProps } from '@/types/transaction.types'

export const ITEMS_PER_PAGE = 5

const initialTransactions: TransactionProps[] = [
  {
    id: '1',
    title: 'Salário',
    description: 'Recebimento do salário mensal',
    type: 'deposit',
    date: '2025-03-01T00:00:00.000Z',
    amount: 5000,
    createdAt: '2025-03-01T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Aluguel',
    description: 'Pagamento do aluguel do apartamento',
    type: 'withdrawal',
    date: '2025-03-05T00:00:00.000Z',
    amount: 1500,
    createdAt: '2025-03-05T08:00:00.000Z',
  },
  {
    id: '3',
    title: 'Freelance',
    description: 'Projeto de desenvolvimento web',
    type: 'deposit',
    date: '2025-03-10T00:00:00.000Z',
    amount: 2000,
    createdAt: '2025-03-10T14:00:00.000Z',
  },
  {
    id: '4',
    title: 'Supermercado',
    description: 'Compras do mês no supermercado',
    type: 'withdrawal',
    date: '2025-03-12T00:00:00.000Z',
    amount: 800,
    createdAt: '2025-03-12T16:00:00.000Z',
  },
  {
    id: '5',
    title: 'Investimento',
    description: 'Rendimento de investimentos',
    type: 'deposit',
    date: '2025-03-15T00:00:00.000Z',
    amount: 350,
    createdAt: '2025-03-15T09:00:00.000Z',
  },
  {
    id: '6',
    title: 'Energia Elétrica',
    description: 'Conta de luz do mês',
    type: 'withdrawal',
    date: '2025-03-18T00:00:00.000Z',
    amount: 250,
    createdAt: '2025-03-18T11:00:00.000Z',
  },
  {
    id: '7',
    title: 'Venda Online',
    description: 'Venda de produto usado',
    type: 'deposit',
    date: '2025-03-20T00:00:00.000Z',
    amount: 150,
    createdAt: '2025-03-20T13:00:00.000Z',
  },
]

// Usa globalThis para garantir que Server Components e API Routes
// compartilhem a mesma instância do array (singleton pattern)
const globalForTransactions = globalThis as unknown as {
  __TRANSACTIONS__: TransactionProps[] | undefined
}

export const TRANSACTIONS: TransactionProps[] = globalForTransactions.__TRANSACTIONS__ ?? initialTransactions

globalForTransactions.__TRANSACTIONS__ = TRANSACTIONS
