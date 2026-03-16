import { delay } from '@/helpers/delay'
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

export async function getTransactions(params?: GetTransactionsParams): Promise<TransactionsListResponse | null> {
  try {
    await delay()
    const searchParams = new URLSearchParams()

    if (params?.q) searchParams.set('q', params.q)
    if (params?.type && params.type !== 'all') searchParams.set('type', params.type)
    if (params?.page) searchParams.set('page', String(params.page))
    if (params?.perPage) searchParams.set('perPage', String(params.perPage))

    const query = searchParams.toString()
    const url = query ? `${ENDPOINT}?${query}` : ENDPOINT

    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.log('Error fetching transactions:', error)
    return null
  }
}

export async function getRecentTransactions(): Promise<RecentTransactionsResponse | null> {
  try {
    await delay()
    const response = await fetch(`${ENDPOINT}?recent=true`)

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.log('Error fetching recent transactions:', error)
    return null
  }
}

export async function getTransactionById(id: string): Promise<TransactionProps | null> {
  try {
    await delay()
    const response = await fetch(`${ENDPOINT}?id=${encodeURIComponent(id)}`)

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.log('Error fetching transaction by id:', error)
    return null
  }
}

export async function getBalance(): Promise<number> {
  try {
    await delay()
    const response = await fetch(ENDPOINT)

    if (!response.ok) {
      return 0
    }

    const data: TransactionsListResponse = await response.json()
    return data.balance
  } catch (error) {
    console.log('Error fetching balance:', error)
    return 0
  }
}

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
