'use client'

import { useIsMounted } from '@/hooks/use-is-mounted'
import type { Transaction } from '@/types/transaction.types'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const STORAGE_KEY = 'bytebank-storage'

interface TransactionsContextValue {
  transactions: Transaction[]
  isShowingAmount: boolean
  toggleAmountVisibility: () => void
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
  const isMounted = useIsMounted()
  const [isShowingAmount, setIsShowingAmount] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions)

   const toggleAmountVisibility = () => {
    setIsShowingAmount(!isShowingAmount)
  }

  useEffect(() => {
    if (initialRender) {
      initialRender = false
      return
    }
    saveTransactions(transactions)
  }, [transactions])

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    setTransactions((prev) => [...prev, { ...transaction, id: crypto.randomUUID(), createdAt: new Date().toISOString() }])
    toast.success('Transação adicionada com sucesso!')
  }, [])

  const updateTransaction = useCallback((id: string, transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...transaction, id, createdAt: t.createdAt } : t)))
    toast.success('Transação atualizada com sucesso!')
  }, [])

  const removeTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
    toast.success('Transação removida com sucesso!')
  }, [])

  if (!isMounted) return null

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, updateTransaction, removeTransaction, isShowingAmount, toggleAmountVisibility }}
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
