'use client'

import { useIsMobile } from '@/helpers/use-mobile'
import AddNewTransactionDesktop from './add-new-transaction-desktop'
import AddNewTransactionMobile from './add-new-transaction-mobile'

export default function AddNewTransaction() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <AddNewTransactionMobile />
  }

  return <AddNewTransactionDesktop />
}
