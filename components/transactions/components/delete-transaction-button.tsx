'use client'
import { deleteTransaction } from '@/app/http/transactions.http'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Loading from '@/components/ui/loading'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import toast from 'react-hot-toast'

interface DeleteTransactionButtonProps {
  transactionId: string
}

export default function DeleteTransactionButton({ transactionId }: DeleteTransactionButtonProps) {
  const [open, setIsOpen] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteTransaction(transactionId)
        setIsOpen(false)
        toast.success('Transação removida com sucesso!')
        router.refresh()
      } catch (error) {
        console.log('Error deleting transaction:', error)
        setIsOpen(false)
        toast.error('Ocorreu um erro ao remover a transação. Tente novamente.')
      }
    })
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return
    setIsOpen(nextOpen)
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
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
          <AlertDialogDescription>Tem certeza que deseja excluir esta transação?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={() => setIsOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending && <Loading />} Excluir
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
