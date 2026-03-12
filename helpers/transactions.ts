import { TransactionENUM } from '@/types/transaction'

export const badgeVariant = (type: TransactionENUM) => {
  switch (type) {
    case 'deposito':
      return 'default'
    case 'retirada':
      return 'destructive'
    default:
      return 'secondary'
  }
}
