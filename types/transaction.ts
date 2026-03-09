export type TransactionType = 'deposito' | 'retirada'

export interface Transaction {
  id: string
  title: string
  type: TransactionType
  date: string
  value: number
}
