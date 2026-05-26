'use server'

import { delay } from '@/helpers/delay'
import {
  createTransactionInStore,
  deleteTransactionInStore,
  updateTransactionInStore,
  type CreateTransactionInput,
  type UpdateTransactionInput,
} from '@/lib/transactions-repository'
import type { TransactionProps } from '@/types/transaction.types'

export async function createTransactionAction(
  input: CreateTransactionInput,
): Promise<TransactionProps> {
  await delay()
  return createTransactionInStore(input)
}

export async function updateTransactionAction(
  input: UpdateTransactionInput,
): Promise<TransactionProps> {
  await delay()
  return updateTransactionInStore(input)
}

export async function deleteTransactionAction(id: string): Promise<TransactionProps> {
  await delay()
  return deleteTransactionInStore(id)
}
