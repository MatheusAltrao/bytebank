'use client'

import { Button } from '@/components/ui/button'
import { formatAmount } from '@/helpers/amount'
import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'

interface AvaliableAmountCardProps {
  balance: number
}

export default function AvaliableAmountCard({ balance }: AvaliableAmountCardProps) {
  const [isShowingAmount, setIsShowingAmount] = useState(false)
  const dynamicEyeIcon = isShowingAmount ? <Eye /> : <EyeClosed />
  const dynamicAmount = isShowingAmount ? formatAmount(balance) : '*******'

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 ">
        <span className="text-xl font-bold">{dynamicAmount}</span>
        <Button variant={'outline'} className="h-8 w-8 rounded" onClick={() => setIsShowingAmount(!isShowingAmount)}>
          {dynamicEyeIcon}
        </Button>
      </div>
      <span className="text-sm text-muted-foreground">Saldo disponível</span>
    </div>
  )
}
