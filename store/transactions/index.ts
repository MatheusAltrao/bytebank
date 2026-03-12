import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { TransactionsStore } from './types'

export const useTransactionsStore = create<TransactionsStore>()(
  persist(
    (set) => ({
      transactions: [],

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, { ...transaction, id: crypto.randomUUID() }],
        })),

      updateTransaction: (id, transaction) =>
        set((state) => ({
          transactions: state.transactions.map((t) => (t.id === id ? { ...transaction, id } : t)),
        })),

      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: 'transactions-storage',
    },
  ),
)
