'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useTransactions } from '@/context/transactions-context'
import { Transaction } from '@/types/transaction'
import { Trash } from 'lucide-react'

interface DeleteTransactionButtonProps {
  transaction: Transaction
}

export default function DeleteTransactionButton({ transaction }: DeleteTransactionButtonProps) {
  const { removeTransaction } = useTransactions()

  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button size={'icon-lg'} variant={'destructive'}>
              <Trash />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Excluir transação</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir transação</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a transação <strong className="truncate w-40">{transaction.title}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => removeTransaction(transaction.id)}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
