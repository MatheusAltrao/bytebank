import type { Transaction } from '@/types/transaction'

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Trabalho',
    type: 'deposito',
    date: new Date().toISOString(),
    value: 250,
  },
  {
    id: '2',
    title: 'Aluguel',
    type: 'retirada',
    date: new Date().toISOString(),
    value: 1200,
  },
]
