export type TransactionENUM = 'deposito' | 'retirada'

export interface Transaction {
  id: string
  title: string
  type: TransactionENUM
  date: string
  value: number
}
