'use client'

import BackButton from '@/components/back-button'
import EditTransaction from '@/components/transactions/components/edit-transaction'
import { Badge } from '@/components/ui/badge'
import { useTransactions } from '@/context/transactions-context'
import { formatAmount } from '@/helpers/amount'
import { formatDate } from '@/helpers/date'
import { badgeVariant } from '@/helpers/transactions'
import { TYPE_LABELS } from '@/types/transaction'
import { redirect } from 'next/navigation'

interface TransactionDetailsCardProps {
  transactionId: string
}

export default function TransactionDetailsCard({ transactionId }: TransactionDetailsCardProps) {
  const { transactions } = useTransactions()
  const transaction = transactions.find((t) => t.id === transactionId)

  if (!transaction) {
    redirect('/')
  }

  return (
    <div className="space-y-6">
      <BackButton />

      <div className="rounded-xl border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{transaction.title}</h2>
          <EditTransaction transaction={transaction} />
        </div>

        <p className="text-muted-foreground">{transaction.description}</p>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <span className="text-sm text-muted-foreground">Tipo</span>
            <div className="mt-1">
              <Badge variant={badgeVariant(transaction.type)}>{TYPE_LABELS[transaction.type]}</Badge>
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Data</span>
            <p className="mt-1 font-medium">{formatDate(new Date(transaction.date))}</p>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Valor</span>
            <p className="mt-1 font-medium">{formatAmount(transaction.amount)}</p>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Criada em</span>
            <p className="mt-1 font-medium">{formatDate(new Date(transaction.createdAt))}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
