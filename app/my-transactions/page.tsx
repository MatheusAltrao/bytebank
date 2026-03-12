import BackButton from '@/components/back-button'
import TransactionsList from '@/components/transactions/transactions-list'

export default function MyTransactionsPage() {
  return (
    <div className="space-y-6">
      <BackButton />
      <TransactionsList />
    </div>
  )
}
