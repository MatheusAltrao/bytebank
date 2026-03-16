import { TransactionENUM } from '@/types/transaction.types'

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
