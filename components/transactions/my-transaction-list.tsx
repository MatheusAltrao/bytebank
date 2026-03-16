'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatAmount } from '@/helpers/amount'
import { formatDate } from '@/helpers/date'
import { badgeVariant } from '@/helpers/transactions'
import type { TransactionsListResponse } from '@/types/transaction.types'
import { TYPE_LABELS } from '@/types/transaction.types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '../ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import DeleteTransactionButton from './components/delete-transaction-button'
import EditTransaction from './components/edit-transaction'
import Filter from './components/filter'
import SeeTransactionButton from './components/see-transaction-buton'
import TransactionsPagination from './components/transactions-pagination'

interface MyTransactionsListProps {
  transactions: TransactionsListResponse
}

export default function MyTransactionsList({ transactions }: MyTransactionsListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.get('q') ?? ''
  const typeFilter = searchParams.get('type') ?? 'all'
  const currentPage = Number(searchParams.get('page') ?? '1')

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams()
    const current: Record<string, string | null> = {
      q: search || null,
      type: typeFilter === 'all' ? null : typeFilter,
      page: currentPage > 1 ? String(currentPage) : null,
    }

    for (const [key, value] of Object.entries({ ...current, ...updates })) {
      if (value !== null && value !== '') {
        params.set(key, value)
      }
    }

    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
  }

  function handleSearchChange(value: string) {
    updateParams({ q: value || null, page: null })
  }

  function handleTypeFilterChange(value: string) {
    updateParams({ type: value === 'all' ? null : value, page: null })
  }

  function handlePageChange(page: number) {
    updateParams({ page: page <= 1 ? null : String(page) })
  }

  const data = transactions.data
  const totalPages = transactions.totalPages
  const total = transactions.total
  const safePage = transactions.currentPage

  const hasNoTransactions = total === 0 && !search && typeFilter === 'all'
  const hasNoResults = total === 0 && (!!search || typeFilter !== 'all')

  return (
    <div className="space-y-4">
      <Filter
        search={search}
        onSearchChange={handleSearchChange}
        typeFilter={typeFilter}
        onTypeFilterChange={handleTypeFilterChange}
      />

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
          {data.map((transaction) => (
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

      <TransactionsPagination currentPage={safePage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
