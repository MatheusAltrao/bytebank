export type TransactionENUM = 'deposito' | 'retirada'

export interface Transaction {
  id: string
  title: string
  type: TransactionENUM
  date: string
  value: number
}

export const TYPE_LABELS: Record<TransactionENUM, string> = {
  deposito: 'Depósito',
  retirada: 'Retirada',
}
