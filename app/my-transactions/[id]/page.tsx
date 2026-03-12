import BackButton from '@/components/ui/back-button'
import TransactionDetailsCard from './components/transaction-details-card'

interface TransactionByIdPageProps {
  params: Promise<{ id: string }>
}

export default async function TransactionByIdPage({ params }: TransactionByIdPageProps) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <BackButton />
      <TransactionDetailsCard transactionId={id} />
    </div>
  )
}
