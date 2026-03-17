import { TRANSACTIONS } from '@/consts/table'
import { delay } from '@/helpers/delay'
import { transactionsMatchesSearch } from '@/helpers/transactions'
import type {
  RecentTransactionsResponse,
  TransactionENUM,
  TransactionProps,
  TransactionsListResponse,
} from '@/types/transaction.types'

const BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT || 'http://localhost:3000'
const ENDPOINT = `${BASE_URL}/api/transactions`

interface GetTransactionsParams {
  q?: string
  type?: TransactionENUM | 'all'
  page?: number
  perPage?: number
}

interface CreateTransactionParams {
  title: string
  description: string
  type: TransactionENUM
  date: string
  amount: number
}

interface UpdateTransactionParams {
  id: string
  title?: string
  description?: string
  type?: TransactionENUM
  date?: string
  amount?: number
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

// --- Funções HTTP (Client Components) ---

export async function createTransaction(params: CreateTransactionParams): Promise<TransactionProps> {
  await delay()
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar transação')
  }

  return response.json()
}

export async function updateTransaction(params: UpdateTransactionParams): Promise<TransactionProps> {
  await delay()
  const response = await fetch(ENDPOINT, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Transação não encontrada')
    }
    throw new Error('Erro ao atualizar transação')
  }

  return response.json()
}

export async function deleteTransaction(id: string): Promise<TransactionProps> {
  await delay()
  const response = await fetch(`${ENDPOINT}?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Transação não encontrada')
    }
    throw new Error('Erro ao excluir transação')
  }

  return response.json()
}
