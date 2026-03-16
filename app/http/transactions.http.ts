import { delay } from '@/helpers/delay'
import type {
  RecentTransactionsResponse,
  TransactionENUM,
  TransactionProps,
  TransactionsListResponse,
} from '@/types/transaction.types'

const BASE_URL = 'http://localhost:3000/api/transactions'

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

export async function getTransactions(params?: GetTransactionsParams): Promise<TransactionsListResponse> {
  await delay()
  const searchParams = new URLSearchParams()

  if (params?.q) searchParams.set('q', params.q)
  if (params?.type && params.type !== 'all') searchParams.set('type', params.type)
  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.perPage) searchParams.set('perPage', String(params.perPage))

  const query = searchParams.toString()
  const url = query ? `${BASE_URL}?${query}` : BASE_URL

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Erro ao buscar transações')
  }

  return response.json()
}

export async function getRecentTransactions(): Promise<RecentTransactionsResponse> {
  const response = await fetch(`${BASE_URL}?recent=true`)

  if (!response.ok) {
    throw new Error('Erro ao buscar transações recentes')
  }
  await delay()

  return response.json()
}

export async function getTransactionById(id: string): Promise<TransactionProps> {
  await delay()
  const response = await fetch(`${BASE_URL}?id=${encodeURIComponent(id)}`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Transação não encontrada')
    }
    throw new Error('Erro ao buscar transação')
  }

  return response.json()
}

export async function getBalance(): Promise<number> {
  await delay()
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error('Erro ao buscar saldo')
  }

  const data: TransactionsListResponse = await response.json()
  return data.balance
}

export async function createTransaction(params: CreateTransactionParams): Promise<TransactionProps> {
  await delay()
  const response = await fetch(BASE_URL, {
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
  const response = await fetch(BASE_URL, {
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
  const response = await fetch(`${BASE_URL}?id=${encodeURIComponent(id)}`, {
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
