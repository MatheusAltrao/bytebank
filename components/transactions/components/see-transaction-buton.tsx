import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import Link from 'next/link'

interface SeeTransactionButtonProps {
  transactionId: string
}

export default function SeeTransactionButton({ transactionId }: SeeTransactionButtonProps) {
  return (
    <Link href={`/my-transactions/${transactionId}`}>
      <Button size={'icon-lg'} variant={'outline'}>
        <Eye />
      </Button>
    </Link>
  )
}
