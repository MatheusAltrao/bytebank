'use client'

import { getTransactionById } from '@/app/http/transactions.http'
import EditTransaction from '@/components/transactions/components/edit-transaction'
import { Badge } from '@/components/ui/badge'
import { formatAmount } from '@/helpers/amount'
import { formatDate } from '@/helpers/date'
import { badgeVariant } from '@/helpers/transactions'
import { TYPE_LABELS, type Transaction } from '@/types/transaction.types'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

interface TransactionDetailsCardProps {
  transactionId: string
}

export default function TransactionDetailsCard({ transactionId }: TransactionDetailsCardProps) {
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getTransactionById(transactionId)
      .then(setTransaction)
      .catch(() => setNotFound(true))
  }, [transactionId])

  if (notFound) {
    redirect('/')
  }

  if (!transaction) {
    return (
      <div className="rounded-xl border p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{transaction.title}</h2>
        <EditTransaction transaction={transaction} />
      </div>

      <p className="text-muted-foreground wrap-break-word">{transaction.description}</p>

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
  )
}
