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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatAmount } from '@/helpers/amount'
import { formatDate } from '@/helpers/date'
import { useTransactionFilters } from '@/helpers/use-transaction-filters'
import { useTransactionsStore } from '@/store/transactions'
import type { TransactionType } from '@/types/transaction'
import { Trash } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import EditTransaction from './components/edit-transaction'
import Filter from './components/filter'
import TransactionsPagination from './components/transactions-pagination'

const TYPE_LABELS: Record<TransactionType, string> = {
  deposito: 'Depósito',
  retirada: 'Retirada',
}

const badgeVariant = (type: TransactionType) => {
  switch (type) {
    case 'deposito':
      return 'default'
    case 'retirada':
      return 'destructive'
    default:
      return 'secondary'
  }
}

export default function TransactionsList() {
  const removeTransaction = useTransactionsStore((state) => state.removeTransaction)

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Filter search={search} onSearchChange={setSearch} />
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="deposito">Depósito</SelectItem>
            <SelectItem value="retirada">Retirada</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
                    <p className="font-medium text-left  truncate w-40">{formatAmount(transaction.value)}</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="wrap-break-word">{formatAmount(transaction.value)}</p>
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
