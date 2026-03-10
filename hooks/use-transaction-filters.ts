'use client'

import { ITEMS_PER_PAGE } from '@/consts/table'
import { matchesSearch } from '@/helpers/search'
import { useTransactionsStore } from '@/store/transactions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export function useTransactionFilters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const transactions = useTransactionsStore((state) => state.transactions)

  const search = searchParams.get('q') ?? ''
  const typeFilter = searchParams.get('tipo') ?? 'todos'
  const currentPage = Number(searchParams.get('pagina') ?? '1')

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === '') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [searchParams, pathname, router],
  )

  const setSearch = useCallback(
    (value: string) => {
      updateParams({ q: value || null, pagina: null })
    },
    [updateParams],
  )

  const setTypeFilter = useCallback(
    (value: string) => {
      updateParams({ tipo: value === 'todos' ? null : value, pagina: null })
    },
    [updateParams],
  )

  const setCurrentPage = useCallback(
    (page: number) => {
      updateParams({ pagina: page <= 1 ? null : String(page) })
    },
    [updateParams],
  )

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchType = typeFilter === 'todos' || t.type === typeFilter
      const matchSearch = !search || matchesSearch(t, search)
      return matchType && matchSearch
    })
  }, [transactions, search, typeFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)

  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  const hasNoTransactions = transactions.length === 0
  const hasNoResults = !hasNoTransactions && filtered.length === 0

  return {
    search,
    typeFilter,
    currentPage: safePage,
    totalPages,
    filtered,
    paginated,
    hasNoTransactions,
    hasNoResults,
    setSearch,
    setTypeFilter,
    setCurrentPage,
  }
}
