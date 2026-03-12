'use client'
import MyTransactionsListLoading from '@/components/transactions/components/loading/my-transactions-list-loading'
import TransactionsList from '@/components/transactions/my-transaction-list'
import BackButton from '@/components/ui/back-button'
import { Suspense } from 'react'

export default function MyTransactionsPage() {
  return (
    <div className="space-y-6">
      <BackButton />
      <Suspense fallback={<MyTransactionsListLoading />}>
        <TransactionsList />
      </Suspense>
    </div>
  )
}
