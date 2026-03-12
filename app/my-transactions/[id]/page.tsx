import TransactionDetailsCard from './components/transaction-details-card'

interface TransactionByIdPageProps {
  params: Promise<{ id: string }>
}

export default async function TransactionByIdPage({ params }: TransactionByIdPageProps) {
  const { id } = await params
  return <TransactionDetailsCard transactionId={id} />
}
