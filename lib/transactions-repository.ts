import { TRANSACTIONS } from '@/consts/table'
import type { TransactionENUM, TransactionProps } from '@/types/transaction.types'

export interface CreateTransactionInput {
  title: string
  description?: string
  type: TransactionENUM
  date: string
  amount: number
}

export interface UpdateTransactionInput {
  id: string
  title?: string
  description?: string
  type?: TransactionENUM
  date?: string
  amount?: number
}

const ALLOWED_TYPES: TransactionENUM[] = ['deposit', 'withdrawal']

function assertValidType(type: TransactionENUM) {
  if (!ALLOWED_TYPES.includes(type)) {
    throw new Error('Tipo inválido. Valores permitidos: deposit, withdrawal')
  }
}

function assertValidAmount(amount: number) {
  if (!Number.isFinite(amount)) {
    throw new Error('Amount deve ser um número finito')
  }
}

function assertValidDate(date: string) {
  const isValidDate = typeof date === 'string' && !Number.isNaN(Date.parse(date))
  if (!isValidDate) {
    throw new Error('Date deve ser uma data válida em formato ISO')
  }
}

export function createTransactionInStore(input: CreateTransactionInput): TransactionProps {
  const { title, description, type, date, amount } = input

  if (!title || !type || !date || amount == null) {
    throw new Error('Campos obrigatórios: title, type, date, amount')
  }

  assertValidType(type)
  assertValidAmount(amount)
  assertValidDate(date)

  const newTransaction: TransactionProps = {
    id: crypto.randomUUID(),
    title,
    description: description ?? '',
    type,
    date,
    amount,
    createdAt: new Date().toISOString(),
  }

  TRANSACTIONS.unshift(newTransaction)
  return newTransaction
}

export function updateTransactionInStore(input: UpdateTransactionInput): TransactionProps {
  const { id, ...updates } = input

  if (!id) {
    throw new Error('ID é obrigatório')
  }

  if (updates.type) {
    assertValidType(updates.type)
  }

  if (updates.amount != null) {
    assertValidAmount(updates.amount)
  }

  if (updates.date) {
    assertValidDate(updates.date)
  }

  const index = TRANSACTIONS.findIndex((t) => t.id === id)

  if (index === -1) {
    throw new Error('Transação não encontrada')
  }

  TRANSACTIONS[index] = {
    ...TRANSACTIONS[index],
    ...updates,
    id: TRANSACTIONS[index].id,
    createdAt: TRANSACTIONS[index].createdAt,
  }

  return TRANSACTIONS[index]
}

export function deleteTransactionInStore(id: string): TransactionProps {
  if (!id) {
    throw new Error('ID é obrigatório')
  }

  const index = TRANSACTIONS.findIndex((t) => t.id === id)

  if (index === -1) {
    throw new Error('Transação não encontrada')
  }

  return TRANSACTIONS.splice(index, 1)[0]
}
