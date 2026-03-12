'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTransactions } from '@/context/transactions-context'
import { formatAmount } from '@/helpers/amount'
import { formatDate } from '@/helpers/date'
import { badgeVariant } from '@/helpers/transactions'
import { useTransactionFilters } from '@/hooks/use-transaction-filters'
import { TYPE_LABELS } from '@/types/transaction'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import DeleteTransactionButton from './components/delete-transaction-button'
import EditTransaction from './components/edit-transaction'
import SeeTransactionButton from './components/see-transaction-buton'

export default function RecentTransactionList() {
  const { hasNoTransactions, hasNoResults, recentsTransactions } = useTransactionFilters()
  const { removeTransaction } = useTransactions()

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-lg font-semibold">Transações Recentes</h2>
        <p className="text-sm text-muted-foreground">Veja as transações mais recentes realizadas.</p>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentsTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="font-medium text-left truncate w-40">{transaction.title}</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="wrap-break-word">{transaction.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Badge variant={badgeVariant(transaction.type)}>{TYPE_LABELS[transaction.type]}</Badge>
              </TableCell>
              <TableCell>{formatDate(new Date(transaction.date))}</TableCell>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="font-medium text-left  truncate w-40">{formatAmount(transaction.amount)}</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="wrap-break-word">{formatAmount(transaction.amount)}</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <SeeTransactionButton transactionId={transaction.id} />
                  <EditTransaction transaction={transaction} />
                  <DeleteTransactionButton transaction={transaction} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableCaption>
          {hasNoTransactions && 'Nenhuma transação cadastrada.'}
          {hasNoResults && 'Nenhuma transação encontrada.'}
        </TableCaption>
      </Table>

      <div className="flex items-center justify-center">
        <Link href={'/my-transactions'}>
          <Button variant={'outline'} size={'sm'}>
            <Eye /> Ver Todas as transações
          </Button>
        </Link>
      </div>
    </div>
  )
}
