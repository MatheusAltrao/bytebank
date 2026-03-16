'use client'

import { useIsMobile } from '@/hooks/use-mobile'
import AddNewTransactionDesktop from './add-new-transaction-desktop'
import AddNewTransactionMobile from './add-new-transaction-mobile'

export default function AddNewTransactionArea() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <AddNewTransactionMobile />
  }

  return <AddNewTransactionDesktop />
}
