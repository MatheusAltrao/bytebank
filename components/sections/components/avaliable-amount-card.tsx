'use client'
import { Button } from '@/components/ui/button'
import { useTransactions } from '@/context/transactions-context'
import { formatAmount } from '@/helpers/amount'
import { Eye, EyeClosed } from 'lucide-react'

export default function AvaliableAmountCard() {
  const { transactions, isShowingAmount, toggleAmountVisibility } = useTransactions()

  const amount = transactions.reduce((acc, t) => {
    return t.type === 'deposit' ? acc + t.amount : acc - t.amount
  }, 0)

  const dynamicEyeIcon = isShowingAmount ? <Eye /> : <EyeClosed />
  const dynamicAmount = isShowingAmount ? formatAmount(amount) : '*******'

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 ">
        <span className="text-xl font-bold">{dynamicAmount}</span>
        <Button variant={'outline'} className="h-8 w-8 rounded" onClick={toggleAmountVisibility}>
          {dynamicEyeIcon}
        </Button>
      </div>
      <span className="text-sm text-muted-foreground">Saldo disponível</span>
    </div>
  )
}
