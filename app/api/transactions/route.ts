import { TRANSACTIONS } from '@/consts/table'
import { transactionsMatchesSearch } from '@/helpers/transactions'
import type { TransactionENUM, TransactionProps } from '@/types/transaction.types'
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
  const body = await request.json()

  const { title, description, type, date, amount } = body

  if (!title || !type || !date || amount == null) {
    return NextResponse.json({ error: 'Campos obrigatórios: title, type, date, amount' }, { status: 400 })
  }

  const allowedTypes: TransactionENUM[] = ['deposit', 'withdrawal']
  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ error: 'Tipo inválido. Valores permitidos: deposit, withdrawal' }, { status: 400 })
  }

  const parsedAmount = Number(amount)
  if (!Number.isFinite(parsedAmount)) {
    return NextResponse.json({ error: 'Amount deve ser um número finito' }, { status: 400 })
  }

  const isValidDate = typeof date === 'string' && !Number.isNaN(Date.parse(date))
  if (!isValidDate) {
    return NextResponse.json({ error: 'Date deve ser uma data válida em formato ISO' }, { status: 400 })
  }

  const newTransaction: TransactionProps = {
    id: crypto.randomUUID(),
    title,
    description: description ?? '',
    type,
    date,
    amount: parsedAmount,
    createdAt: new Date().toISOString(),
  }

  TRANSACTIONS.unshift(newTransaction)

  return NextResponse.json(newTransaction, { status: 201 })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 })
  }

  const index = TRANSACTIONS.findIndex((t) => t.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Transação não encontrada' }, { status: 404 })
  }

  TRANSACTIONS[index] = {
    ...TRANSACTIONS[index],
    ...updates,
    id: TRANSACTIONS[index].id,
    createdAt: TRANSACTIONS[index].createdAt,
  }

  return NextResponse.json(TRANSACTIONS[index])
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 })
  }

  const index = TRANSACTIONS.findIndex((t) => t.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Transação não encontrada' }, { status: 404 })
  }

  const removed = TRANSACTIONS.splice(index, 1)[0]
  return NextResponse.json(removed)
}
