import HeroSection from '@/components/sections/hero-section'
import RecentTransactionList from '@/components/transactions/recent-transaction-list'
import { getRecentTransactions } from './http/transactions.http'

export default async function Home() {
  const recentTransactionsList = await getRecentTransactions()

  return (
    <div className="space-y-8">
      <HeroSection />
      <RecentTransactionList transactions={recentTransactionsList.data} />
    </div>
  )
}
