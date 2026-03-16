import { getTransactionById } from '@/app/http/transactions.http'
import BackButton from '@/components/ui/back-button'
import { notFound } from 'next/navigation'
import TransactionDetailsCard from './components/transaction-details-card'

interface TransactionByIdPageProps {
  params: Promise<{ id: string }>
}

export default async function TransactionByIdPage({ params }: TransactionByIdPageProps) {
  const { id } = await params

  const transactionById = await getTransactionById(id)

  if (!transactionById) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <BackButton />
      <TransactionDetailsCard transaction={transactionById} />
    </div>
  )
}
