export type TransactionENUM = 'deposit' | 'withdrawal'

export interface TransactionProps {
  id: string
  title: string
  description: string
  type: TransactionENUM
  date: string
  amount: number
  createdAt: string
}

export const TYPE_LABELS: Record<TransactionENUM, string> = {
  deposit: 'Depósito',
  withdrawal: 'Retirada',
}

export interface TransactionsListResponse {
  data: TransactionProps[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
  balance: number
}

export interface RecentTransactionsResponse {
  data: TransactionProps[]
  total: number
}
