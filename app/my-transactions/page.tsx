'use client'
import MyTransactionsListLoading from '@/components/transactions/components/loading/my-transactions-list-loading'
import TransactionsList from '@/components/transactions/my-transaction-list'
import BackButton from '@/components/ui/back-button'
import { Suspense } from 'react'

export default function MyTransactionsPage() {
  return (
    <div className="space-y-6">
      <BackButton />
      <div className="space-y-4">
        <header>
          <h2 className="text-lg font-semibold">Todas as transações</h2>
          <p className="text-sm text-muted-foreground">Veja todas as transações realizadas.</p>
        </header>
        <Suspense fallback={<MyTransactionsListLoading />}>
          <TransactionsList />
        </Suspense>
      </div>
    </div>
  )
}
