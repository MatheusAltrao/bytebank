import HeroSection from '@/components/sections/hero-section'
import RecentTransactionListLoading from '@/components/transactions/components/loading/recent-transaction-list-loading'
import RecentTransactionList from '@/components/transactions/recent-transaction-list'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <Suspense fallback={<RecentTransactionListLoading />}>
        <RecentTransactionList />
      </Suspense>
    </div>
  )
}
