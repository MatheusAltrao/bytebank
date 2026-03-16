export type TransactionENUM = 'deposit' | 'withdrawal'

export interface Transaction {
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
