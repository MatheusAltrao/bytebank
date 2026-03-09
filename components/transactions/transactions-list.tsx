'use client'

import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ITEMS_PER_PAGE } from '@/consts/table'
import { formatAmount } from '@/helpers/amount'
import { formatDate } from '@/helpers/date'
import { generatePageNumbers } from '@/helpers/pagination'
import { matchesSearch } from '@/helpers/search'
import { useTransactionsStore } from '@/store/transactions'
import type { TransactionType } from '@/types/transaction'
import { ChevronLeft, ChevronRight, Search, Trash } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import EditTransaction from './components/edit-transaction'

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
  const transactions = useTransactionsStore((state) => state.transactions)
  const removeTransaction = useTransactionsStore((state) => state.removeTransaction)

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('todos')
  const [currentPage, setCurrentPage] = useState(1)

  const hasNoTransactions = transactions.length === 0
  const hasNoResults =
    !hasNoTransactions &&
    transactions.filter((t) => {
      const matchType = typeFilter === 'todos' || t.type === typeFilter
      const matchSearch = !search || matchesSearch(t, search)
      return matchType && matchSearch
    }).length === 0

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchType = typeFilter === 'todos' || t.type === typeFilter
      const matchSearch = !search || matchesSearch(t, search)
      return matchType && matchSearch
    })
  }, [transactions, search, typeFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))

  const safePage = Math.min(currentPage, totalPages)
  if (safePage !== currentPage) {
    setCurrentPage(safePage)
  }

  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  const pageNumbers = generatePageNumbers(safePage, totalPages)

  function handleSearchChange(value: string) {
    setSearch(value)
    setCurrentPage(1)
  }

  function handleTypeChange(value: string) {
    setTypeFilter(value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, data ou valor..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={handleTypeChange}>
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
              <TableCell className="font-medium">{transaction.title}</TableCell>
              <TableCell>
                <Badge variant={badgeVariant(transaction.type)}>{TYPE_LABELS[transaction.type]}</Badge>
              </TableCell>
              <TableCell>{formatDate(new Date(transaction.date))}</TableCell>
              <TableCell className="font-medium">{formatAmount(transaction.value)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <EditTransaction transaction={transaction} />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={'icon-lg'}
                        variant={'destructive'}
                        onClick={() => removeTransaction(transaction.id)}
                      >
                        <Trash />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Excluir transação</TooltipContent>
                  </Tooltip>
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
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 pl-1.5"
                disabled={safePage <= 1}
                onClick={() => setCurrentPage(safePage - 1)}
              >
                <ChevronLeft className="size-4" />
                <span className="hidden sm:inline">Anterior</span>
              </Button>
            </PaginationItem>

            {pageNumbers.map((page, idx) =>
              page === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <Button
                    variant={safePage === page ? 'outline' : 'ghost'}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 pr-1.5"
                disabled={safePage >= totalPages}
                onClick={() => setCurrentPage(safePage + 1)}
              >
                <span className="hidden sm:inline">Próximo</span>
                <ChevronRight className="size-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
