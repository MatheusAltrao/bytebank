'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTransactions } from '@/context/transactions-context'
import { formatAmount } from '@/helpers/amount'
import { formatDate } from '@/helpers/date'
import { badgeVariant } from '@/helpers/transactions'
import { useTransactionFilters } from '@/hooks/use-transaction-filters'
import { TYPE_LABELS } from '@/types/transaction'
import { Trash } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import EditTransaction from './components/edit-transaction'
import Filter from './components/filter'
import TransactionsPagination from './components/transactions-pagination'

export default function TransactionsList() {
  const { removeTransaction } = useTransactions()

  const {
    search,
    typeFilter,
    currentPage,
    totalPages,
    paginated,
    hasNoTransactions,
    hasNoResults,
    setSearch,
    setTypeFilter,
    setCurrentPage,
  } = useTransactionFilters()

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <Filter search={search} onSearchChange={setSearch} typeFilter={typeFilter} onTypeFilterChange={setTypeFilter} />

      {/* Tabela */}
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
          {paginated.map((transaction) => (
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
                  <EditTransaction transaction={transaction} />
                  <AlertDialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                          <Button size={'icon-lg'} variant={'destructive'}>
                            <Trash />
                          </Button>
                        </AlertDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Excluir transação</TooltipContent>
                    </Tooltip>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir transação</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir a transação{' '}
                          <strong className="truncate w-40">{transaction.title}</strong>?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={() => removeTransaction(transaction.id)}>
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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

      {/* Paginação */}
      <TransactionsPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}
