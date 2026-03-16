import HeroSection from '@/components/sections/hero-section'
import RecentTransactionListSkeleton from '@/components/transactions/components/skeleton/recent-transaction-list-skeleton'
import RecentTransactionListServer from '@/components/transactions/recent-transaction-list-server'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <Suspense fallback={<RecentTransactionListSkeleton />}>
        <RecentTransactionListServer />
      </Suspense>
    </div>
  )
}
