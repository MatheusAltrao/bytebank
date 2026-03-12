import HeroSection from '@/components/sections/hero-section'
import RecentTransactionList from '@/components/transactions/recent-transaction-list'

export default function Home() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <RecentTransactionList />
    </div>
  )
}
