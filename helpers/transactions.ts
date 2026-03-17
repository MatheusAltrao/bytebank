import { TransactionENUM, TransactionProps } from '@/types/transaction.types'

export const badgeVariant = (type: TransactionENUM) => {
  switch (type) {
    case 'deposit':
      return 'default'
    case 'withdrawal':
      return 'destructive'
    default:
      return 'secondary'
  }
}

export function transactionsMatchesSearch(transaction: TransactionProps, search: string): boolean {
  const term = search.toLowerCase()
  if (transaction.title.toLowerCase().includes(term)) return true
  if (transaction.amount.toString().includes(term)) return true
  return false
}
