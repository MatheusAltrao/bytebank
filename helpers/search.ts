import { Transaction } from '@/types/transaction'
import { formatAmount } from './amount'
import { formatDate } from './date'

export function matchesSearch(transaction: Transaction, search: string): boolean {
  const term = search.toLowerCase()

  if (transaction.title.toLowerCase().includes(term)) return true

  const dateStr = formatDate(new Date(transaction.date))
  if (dateStr.includes(term)) return true

  const valueStr = formatAmount(transaction.value).toLowerCase()
  if (valueStr.includes(term)) return true

  const rawValue = transaction.value.toString()
  if (rawValue.includes(term)) return true

  return false
}
