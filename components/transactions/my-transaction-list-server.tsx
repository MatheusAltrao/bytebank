import { getTransactions } from '@/app/http/transactions.http'
import type { TransactionENUM } from '@/types/transaction.types'
import MyTransactionsList from './my-transaction-list'

interface Props {
  searchParams: { q?: string; type?: string; page?: string }
}

export default function MyTransactionListServer({ searchParams }: Props) {
  const { q, type, page } = searchParams

  const transactions = getTransactions({
    q: q || undefined,
    type: (type as TransactionENUM | 'all') || undefined,
    page: page ? Number(page) : undefined,
  })

  return <MyTransactionsList transactions={transactions} />
}
