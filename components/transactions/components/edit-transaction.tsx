'use client'

import { useIsMobile } from '@/hooks/use-mobile'
import type { Transaction } from '@/types/transaction'
import EditTransactionDesktop from './edit-transaction-desktop'
import EditTransactionMobile from './edit-transaction-mobile'

interface EditTransactionProps {
  transaction: Transaction
}

export default function EditTransaction({ transaction }: EditTransactionProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <EditTransactionMobile transaction={transaction} />
  }

  return <EditTransactionDesktop transaction={transaction} />
}
