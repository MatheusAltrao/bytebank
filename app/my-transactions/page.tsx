import TransactionsList from '@/components/transactions/my-transaction-list'
import BackButton from '@/components/ui/back-button'
import { TransactionENUM } from '@/types/transaction.types'
import { getTransactions } from '../http/transactions.http'

interface MyTransactionsPageProps {
  searchParams: Promise<{ q?: string; type?: string; page?: string }>
}

export default async function MyTransactionsPage({ searchParams }: MyTransactionsPageProps) {
  const { q, type, page } = await searchParams

  const transactions = await getTransactions({
    q: q || undefined,
    type: (type as TransactionENUM | 'all') || undefined,
    page: page ? Number(page) : undefined,
  })

  return (
    <div className="space-y-6">
      <BackButton />
      <div className="space-y-4">
        <header>
          <h2 className="text-lg font-semibold">Todas as transações</h2>
          <p className="text-sm text-muted-foreground">Veja todas as transações realizadas.</p>
        </header>
        <TransactionsList transactions={transactions} />
      </div>
    </div>
  )
}
