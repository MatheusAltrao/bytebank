'use client'

import type { Transaction } from '@/types/transaction'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'bytebank-storage'

interface TransactionsContextValue {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id' | 'createdAt'>) => void
  removeTransaction: (id: string) => void
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null)

function loadTransactions(): Transaction[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return parsed?.state?.transactions ?? []
  } catch {
    return []
  }
}

function saveTransactions(transactions: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: { transactions } }))
}

let initialRender = true

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions)

  useEffect(() => {
    if (initialRender) {
      initialRender = false
      return
    }
    saveTransactions(transactions)
  }, [transactions])

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    setTransactions((prev) => [...prev, { ...transaction, id: crypto.randomUUID(), createdAt: new Date().toISOString() }])
  }, [])

  const updateTransaction = useCallback((id: string, transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...transaction, id, createdAt: t.createdAt } : t)))
  }, [])

  const removeTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, updateTransaction, removeTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider')
  }
  return context
}
