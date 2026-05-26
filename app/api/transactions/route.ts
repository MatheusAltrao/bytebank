import { transactionsMatchesSearch } from '@/helpers/transactions'
import {
  createTransactionInStore,
  deleteTransactionInStore,
  updateTransactionInStore,
} from '@/lib/transactions-repository'
import { TRANSACTIONS } from '@/consts/table'
import type { TransactionENUM } from '@/types/transaction.types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const search = searchParams.get('q') ?? ''
  const typeFilter = searchParams.get('type') as TransactionENUM | 'all' | null
  const rawPage = Number(searchParams.get('page') ?? '1')
  const rawPerPage = Number(searchParams.get('perPage') ?? '5')

  const page =
    Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1
  const perPage =
    Number.isFinite(rawPerPage) && rawPerPage > 0 ? Math.floor(rawPerPage) : 5

  const recent = searchParams.get('recent') === 'true'
  const id = searchParams.get('id')

  // GET por ID
  if (id) {
    const transaction = TRANSACTIONS.find((t) => t.id === id)
    if (!transaction) {
      return NextResponse.json({ error: 'Transação não encontrada' }, { status: 404 })
    }
    return NextResponse.json(transaction)
  }

  // Filtrar
  let filtered = [...TRANSACTIONS]

  if (typeFilter && typeFilter !== 'all') {
    filtered = filtered.filter((t) => t.type === typeFilter)
  }

  if (search) {
    filtered = filtered.filter((t) => transactionsMatchesSearch(t, search))
  }

  // Recentes (últimas 5 ordenadas por data)
  if (recent) {
    const sorted = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return NextResponse.json({
      data: sorted.slice(0, 5),
      total: filtered.length,
    })
  }

  // Paginação
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * perPage
  const paginated = filtered.slice(start, start + perPage)

  // Saldo
  const balance = TRANSACTIONS.reduce((acc, t) => {
    return t.type === 'deposit' ? acc + t.amount : acc - t.amount
  }, 0)

  return NextResponse.json({
    data: paginated,
    total,
    totalPages,
    currentPage: safePage,
    perPage,
    balance,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newTransaction = createTransactionInStore(body)
    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar transação'
    const status = message.includes('obrigatórios') || message.includes('inválido') ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const updated = updateTransactionInStore(body)
    return NextResponse.json(updated)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar transação'
    const status = message === 'Transação não encontrada' ? 404 : message.includes('obrigatório') ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 })
    }

    const removed = deleteTransactionInStore(id)
    return NextResponse.json(removed)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao excluir transação'
    const status = message === 'Transação não encontrada' ? 404 : 400
    return NextResponse.json({ error: message }, { status })
  }
}
