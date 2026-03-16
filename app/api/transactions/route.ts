import type { Transaction, TransactionENUM } from '@/types/transaction.types'
import { NextRequest, NextResponse } from 'next/server'

const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Salário',
    description: 'Recebimento do salário mensal',
    type: 'deposit',
    date: '2025-03-01T00:00:00.000Z',
    amount: 5000,
    createdAt: '2025-03-01T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Aluguel',
    description: 'Pagamento do aluguel do apartamento',
    type: 'withdrawal',
    date: '2025-03-05T00:00:00.000Z',
    amount: 1500,
    createdAt: '2025-03-05T08:00:00.000Z',
  },
  {
    id: '3',
    title: 'Freelance',
    description: 'Projeto de desenvolvimento web',
    type: 'deposit',
    date: '2025-03-10T00:00:00.000Z',
    amount: 2000,
    createdAt: '2025-03-10T14:00:00.000Z',
  },
  {
    id: '4',
    title: 'Supermercado',
    description: 'Compras do mês no supermercado',
    type: 'withdrawal',
    date: '2025-03-12T00:00:00.000Z',
    amount: 800,
    createdAt: '2025-03-12T16:00:00.000Z',
  },
  {
    id: '5',
    title: 'Investimento',
    description: 'Rendimento de investimentos',
    type: 'deposit',
    date: '2025-03-15T00:00:00.000Z',
    amount: 350,
    createdAt: '2025-03-15T09:00:00.000Z',
  },
  {
    id: '6',
    title: 'Energia Elétrica',
    description: 'Conta de luz do mês',
    type: 'withdrawal',
    date: '2025-03-18T00:00:00.000Z',
    amount: 250,
    createdAt: '2025-03-18T11:00:00.000Z',
  },
  {
    id: '7',
    title: 'Venda Online',
    description: 'Venda de produto usado',
    type: 'deposit',
    date: '2025-03-20T00:00:00.000Z',
    amount: 150,
    createdAt: '2025-03-20T13:00:00.000Z',
  },
]

function matchesSearch(transaction: Transaction, search: string): boolean {
  const term = search.toLowerCase()
  if (transaction.title.toLowerCase().includes(term)) return true
  if (transaction.amount.toString().includes(term)) return true
  return false
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const search = searchParams.get('q') ?? ''
  const typeFilter = searchParams.get('type') as TransactionENUM | 'all' | null
  const page = Number(searchParams.get('page') ?? '1')
  const perPage = Number(searchParams.get('perPage') ?? '5')
  const recent = searchParams.get('recent') === 'true'
  const id = searchParams.get('id')

  // GET por ID
  if (id) {
    const transaction = transactions.find((t) => t.id === id)
    if (!transaction) {
      return NextResponse.json({ error: 'Transação não encontrada' }, { status: 404 })
    }
    return NextResponse.json(transaction)
  }

  // Filtrar
  let filtered = [...transactions]

  if (typeFilter && typeFilter !== 'all') {
    filtered = filtered.filter((t) => t.type === typeFilter)
  }

  if (search) {
    filtered = filtered.filter((t) => matchesSearch(t, search))
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
  const balance = transactions.reduce((acc, t) => {
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

  const newTransaction: Transaction = {
    id: crypto.randomUUID(),
    title,
    description: description ?? '',
    type,
    date,
    amount: Number(amount),
    createdAt: new Date().toISOString(),
  }

  transactions.push(newTransaction)

  return NextResponse.json(newTransaction, { status: 201 })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 })
  }

  const index = transactions.findIndex((t) => t.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Transação não encontrada' }, { status: 404 })
  }

  transactions[index] = {
    ...transactions[index],
    ...updates,
    id: transactions[index].id,
    createdAt: transactions[index].createdAt,
  }

  return NextResponse.json(transactions[index])
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 })
  }

  const index = transactions.findIndex((t) => t.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Transação não encontrada' }, { status: 404 })
  }

  const removed = transactions.splice(index, 1)[0]
  return NextResponse.json(removed)
}
