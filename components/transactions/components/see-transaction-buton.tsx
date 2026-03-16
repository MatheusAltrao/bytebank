import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Eye } from 'lucide-react'
import Link from 'next/link'

interface SeeTransactionButtonProps {
  transactionId: string
}

export default function SeeTransactionButton({ transactionId }: SeeTransactionButtonProps) {
  return (
    <Link href={`/my-transactions/${transactionId}`}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={'icon-lg'} variant={'outline'}>
            <Eye />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Visualizar transação</TooltipContent>
      </Tooltip>
    </Link>
  )
}
