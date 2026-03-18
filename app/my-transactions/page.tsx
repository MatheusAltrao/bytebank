import MyTransactionsListSkeleton from '@/components/transactions/components/skeleton/my-transactions-list-skeleton'
import MyTransactionListServer from '@/components/transactions/my-transaction-list-server'
import BackButton from '@/components/ui/back-button'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

interface MyTransactionsPageProps {
  searchParams: Promise<{ q?: string; type?: string; page?: string }>
}

export default async function MyTransactionsPage({ searchParams }: MyTransactionsPageProps) {
  const params = await searchParams

  return (
    <div className="space-y-6">
      <BackButton />
      <div className="space-y-4">
        <header>
          <h2 className="text-lg font-semibold">Todas as transações</h2>
          <p className="text-sm text-muted-foreground">Veja todas as transações realizadas.</p>
        </header>
        <Suspense fallback={<MyTransactionsListSkeleton />}>
          <MyTransactionListServer searchParams={params} />
        </Suspense>
      </div>
    </div>
  )
}
