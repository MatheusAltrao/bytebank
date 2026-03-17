import { getTransactions } from '@/app/http/transactions.http'
import type { TransactionENUM, TransactionsListResponse } from '@/types/transaction.types'
import MyTransactionsList from './my-transaction-list'

interface Props {
  searchParams: { q?: string; type?: string; page?: string }
}

export default async function MyTransactionListServer({ searchParams }: Props) {
  const { q, type, page } = searchParams

  const transactions = await getTransactions({
    q: q || undefined,
    type: (type as TransactionENUM | 'all') || undefined,
    page: page ? Number(page) : undefined,
  })

  const fallback: TransactionsListResponse = {
    data: [],
    total: 0,
    totalPages: 1,
    currentPage: 1,
    perPage: 5,
    balance: 0,
  }

  return <MyTransactionsList transactions={transactions ?? fallback} />
}
