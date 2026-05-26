import { TRANSACTIONS } from '@/consts/table'
import { transactionsMatchesSearch } from '@/helpers/transactions'
import type {
  RecentTransactionsResponse,
  TransactionENUM,
  TransactionProps,
  TransactionsListResponse,
} from '@/types/transaction.types'

interface GetTransactionsParams {
  q?: string
  type?: TransactionENUM | 'all'
  page?: number
  perPage?: number
}

// --- Acesso direto aos dados (Server Components) ---

export function getTransactions(params?: GetTransactionsParams): TransactionsListResponse {
  const search = params?.q ?? ''
  const typeFilter = params?.type ?? null
  const page = params?.page ?? 1
  const perPage = params?.perPage ?? 5

  let filtered = [...TRANSACTIONS]

  if (typeFilter && typeFilter !== 'all') {
    filtered = filtered.filter((t) => t.type === typeFilter)
  }

  if (search) {
    filtered = filtered.filter((t) => transactionsMatchesSearch(t, search))
  }

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * perPage
  const paginated = filtered.slice(start, start + perPage)

  const balance = TRANSACTIONS.reduce((acc, t) => {
    return t.type === 'deposit' ? acc + t.amount : acc - t.amount
  }, 0)

  return {
    data: paginated,
    total,
    totalPages,
    currentPage: safePage,
    perPage,
    balance,
  }
}

export function getRecentTransactions(): RecentTransactionsResponse {
  const sorted = [...TRANSACTIONS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return {
    data: sorted.slice(0, 5),
    total: TRANSACTIONS.length,
  }
}

export function getTransactionById(id: string): TransactionProps | null {
  return TRANSACTIONS.find((t) => t.id === id) ?? null
}

export function getBalance(): number {
  return TRANSACTIONS.reduce((acc, t) => {
    return t.type === 'deposit' ? acc + t.amount : acc - t.amount
  }, 0)
}
